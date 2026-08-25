import type { QrDitherMode } from "@/features/qr/types"

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function luminance(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

export function applyDither(
  canvas: HTMLCanvasElement,
  mode: QrDitherMode,
  intensity: number
) {
  if (mode === "none") return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const { width, height } = canvas
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const strength = clamp(intensity, 0, 1)

  if (mode === "ordered") {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4
        const lum = luminance(data[index], data[index + 1], data[index + 2])
        const threshold = (BAYER_4X4[y % 4][x % 4] / 16) * 255
        const adjusted = lum + (threshold - 128) * strength
        const value = adjusted > 128 ? 255 : 0
        data[index] = value
        data[index + 1] = value
        data[index + 2] = value
      }
    }
  }

  if (mode === "floyd-steinberg") {
    const gray = new Float32Array(width * height)

    for (let i = 0; i < width * height; i++) {
      const offset = i * 4
      gray[i] = luminance(data[offset], data[offset + 1], data[offset + 2])
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x
        const oldPixel = gray[index]
        const newPixel = oldPixel > 128 ? 255 : 0
        const error = (oldPixel - newPixel) * strength
        gray[index] = newPixel

        if (x + 1 < width) gray[index + 1] += (error * 7) / 16
        if (y + 1 < height) {
          if (x > 0) gray[index + width - 1] += (error * 3) / 16
          gray[index + width] += (error * 5) / 16
          if (x + 1 < width) gray[index + width + 1] += error / 16
        }
      }
    }

    for (let i = 0; i < width * height; i++) {
      const value = gray[i]
      const offset = i * 4
      data[offset] = value
      data[offset + 1] = value
      data[offset + 2] = value
    }
  }

  ctx.putImageData(imageData, 0, 0)
}
