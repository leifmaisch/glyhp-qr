"use client"

import { useEffect, useState } from "react"

import { resolveLogoSrc } from "@/features/qr/core/logo-color"
import type { QrLogoState } from "@/features/qr/types"

export function useLogoPreview(state: QrLogoState) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(state.logoSrc)

  useEffect(() => {
    if (!state.logoSrc) {
      setPreviewSrc(null)
      return
    }

    if (!state.logoColorOverwrite) {
      setPreviewSrc(state.logoSrc)
      return
    }

    let cancelled = false

    void resolveLogoSrc(state)
      .then((src) => {
        if (!cancelled) setPreviewSrc(src ?? state.logoSrc)
      })
      .catch(() => {
        if (!cancelled) setPreviewSrc(state.logoSrc)
      })

    return () => {
      cancelled = true
    }
  }, [
    state.logoSrc,
    state.logoEnabled,
    state.logoColorOverwrite,
    state.logoOverwriteColor,
  ])

  return previewSrc
}
