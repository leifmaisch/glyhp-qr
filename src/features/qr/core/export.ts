import { applyDither } from "@/features/qr/core/dither"
import { resolveLogoSrc } from "@/features/qr/core/logo-color"
import {
  createQrInstance,
  mountQrInstance,
  waitForQrRender,
} from "@/features/qr/core/qr-instance"
import { EXPORT_BASE_SIZE } from "@/features/qr/presets"
import type { QrExportFormat, QrGeneratorState } from "@/features/qr/types"

function toBlob(raw: Blob | Buffer, type: string): Blob {
  if (raw instanceof Blob) return raw
  return new Blob([Uint8Array.from(raw)], { type })
}

function getMimeType(format: QrExportFormat) {
  switch (format) {
    case "png":
      return "image/png"
    case "jpeg":
      return "image/jpeg"
    case "webp":
      return "image/webp"
    default:
      return "image/png"
  }
}

async function renderToCanvas(state: QrGeneratorState, size: number) {
  const container = document.createElement("div")
  container.style.position = "fixed"
  container.style.left = "-9999px"
  container.style.top = "-9999px"
  document.body.appendChild(container)

  try {
    const logoImage = await resolveLogoSrc(state)
    const instance = createQrInstance(state, size, logoImage)
    mountQrInstance(instance, container)
    await waitForQrRender(instance, state)

    const raw = await instance.getRawData("png")
    if (!raw) throw new Error("Canvas export failed")

    const blob = toBlob(raw, "image/png")
    const bitmap = await createImageBitmap(blob)
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas context unavailable")
    ctx.drawImage(bitmap, 0, 0, size, size)
    bitmap.close()
    return canvas
  } finally {
    container.remove()
  }
}

export async function exportQrCode(state: QrGeneratorState): Promise<Blob> {
  const size = EXPORT_BASE_SIZE * state.exportScale

  if (state.exportFormat === "svg") {
    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.left = "-9999px"
    container.style.top = "-9999px"
    document.body.appendChild(container)

    try {
      const logoImage = await resolveLogoSrc(state)
      const instance = createQrInstance(state, size, logoImage)
      mountQrInstance(instance, container)
      await waitForQrRender(instance, state)
      const raw = await instance.getRawData("svg")
      if (!raw) throw new Error("SVG export failed")
      return toBlob(raw, "image/svg+xml")
    } finally {
      container.remove()
    }
  }

  const canvas = await renderToCanvas(state, size)
  applyDither(canvas, state.ditherMode, state.ditherIntensity)

  const mimeType = getMimeType(state.exportFormat)
  const quality = state.exportFormat === "jpeg" ? 0.92 : undefined

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result)
        else reject(new Error("Export failed"))
      },
      mimeType,
      quality
    )
  })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function getExportFilename(format: QrExportFormat) {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")
  return `glyph-qr-${timestamp}.${format}`
}
