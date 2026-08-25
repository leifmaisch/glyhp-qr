import { normalizeHex } from "@/features/qr/core/resolve-colors"
import type { QrLogoState } from "@/features/qr/types"

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex, "#000000")
  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  }
}

export async function applyColorToImage(src: string, color: string) {
  const { r, g, b } = hexToRgb(color)

  return new Promise<string>((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Canvas context unavailable"))
        return
      }

      ctx.drawImage(image, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue
        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
      }

      ctx.putImageData(imageData, 0, 0)
      resolve(canvas.toDataURL("image/png"))
    }

    image.onerror = () => reject(new Error("Failed to load logo image"))
    image.src = src
  })
}

export async function resolveLogoSrc(state: QrLogoState) {
  if (!state.logoEnabled || !state.logoSrc) return undefined
  if (!state.logoColorOverwrite) return state.logoSrc
  return applyColorToImage(state.logoSrc, state.logoOverwriteColor)
}
