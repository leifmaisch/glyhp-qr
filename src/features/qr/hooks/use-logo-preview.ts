"use client"

import { useEffect, useState } from "react"

import { resolveLogoSrc } from "@/features/qr/core/logo-color"
import type { QrLogoState } from "@/features/qr/types"

export function useLogoPreview(state: QrLogoState) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!state.logoSrc || !state.logoColorOverwrite) {
      return
    }

    let cancelled = false

    void resolveLogoSrc(state)
      .then((src) => {
        if (!cancelled) setProcessedSrc(src ?? state.logoSrc)
      })
      .catch(() => {
        if (!cancelled) setProcessedSrc(state.logoSrc)
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

  if (!state.logoSrc) {
    return null
  }

  if (!state.logoColorOverwrite) {
    return state.logoSrc
  }

  return processedSrc ?? state.logoSrc
}
