"use client"

import {
  ExportIcon,
  ImageSquareIcon,
  PaletteIcon,
  QrCodeIcon,
} from "@phosphor-icons/react"

import { iconWeight } from "@/components/shared"
import { FeatureCard, Features } from "@/components/ui/features"

export function HomeFeatures() {
  return (
    <Features id="features" title="What's included">
      <FeatureCard
        icon={<PaletteIcon weight={iconWeight} className="size-12" />}
        title="Colors and gradients"
        description="Solid fills, linear and radial gradients, and full control over foreground and background."
      />
      <FeatureCard
        icon={<ImageSquareIcon weight={iconWeight} className="size-12" />}
        title="Embedded logos"
        description="Upload a logo, tune size and margin, and hide dots behind the mark for a clean center."
      />
      <FeatureCard
        icon={<QrCodeIcon weight={iconWeight} className="size-12" />}
        title="Patterns and dither"
        description="Dot styles, corner shapes, ordered and Floyd-Steinberg dither for a crafted look."
        large
      />
      <FeatureCard
        icon={<ExportIcon weight={iconWeight} className="size-12" />}
        title="Export options"
        description="PNG, SVG, JPEG, or WebP at 1x to 4x resolution with adjustable error correction."
      />
    </Features>
  )
}
