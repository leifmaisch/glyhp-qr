"use client"

import { useEffect, useRef } from "react"

import { applyDither } from "@/features/qr/core/dither"
import { resolveLogoSrc } from "@/features/qr/core/logo-color"
import {
  createQrInstance,
  getQrCanvas,
  mountQrInstance,
  waitForQrRender,
} from "@/features/qr/core/qr-instance"
import { PREVIEW_QR_SIZE } from "@/features/qr/presets"
import type { QrPreviewState } from "@/features/qr/types"

type UseQrPreviewOptions = {
  state: QrPreviewState
  size?: number
}

export function useQrPreview({
  state,
  size = PREVIEW_QR_SIZE,
}: UseQrPreviewOptions) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    const render = async () => {
      const logoImage = await resolveLogoSrc(state)
      if (cancelled) return

      const instance = createQrInstance(state, size, logoImage)
      mountQrInstance(instance, container)

      try {
        await waitForQrRender(instance, state)
      } catch {
        // continue with qr even if logo load fails
      }

      if (cancelled) return

      const canvas = getQrCanvas(container)
      if (!canvas) return

      if (state.ditherMode !== "none") {
        applyDither(canvas, state.ditherMode, state.ditherIntensity)
      }
    }

    void render()

    return () => {
      cancelled = true
    }
  }, [state, size])

  return containerRef
}
