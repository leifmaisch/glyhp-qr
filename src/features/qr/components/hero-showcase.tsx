"use client"

import { useMemo } from "react"

import { HERO_QR_SIZE, heroQrPreset } from "@/features/qr/presets"
import { useQrPreview } from "@/features/qr/hooks/use-qr-preview"
import { toPreviewState } from "@/features/qr/state/selectors"

export function HeroQrShowcase() {
  const previewState = useMemo(() => toPreviewState(heroQrPreset), [])
  const containerRef = useQrPreview({
    state: previewState,
    size: HERO_QR_SIZE,
  })

  return (
    <div className="flex h-full min-h-[220px] items-center justify-center p-8">
      <div
        ref={containerRef}
        className="rounded-squircle-lg shadow-[0_24px_80px_-20px_color-mix(in_srgb,var(--primary)_45%,transparent)] [&_canvas]:rounded-squircle-md"
      />
    </div>
  )
}
