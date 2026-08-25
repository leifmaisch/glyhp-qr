import { defaultQrState } from "@/features/qr/defaults"
import type { QrGeneratorState } from "@/features/qr/types"

export const heroQrPreset: QrGeneratorState = {
  ...defaultQrState,
  url: "https://glyph.qr",
  dotStyle: "rounded",
  cornerSquareStyle: "extra-rounded",
  cornerDotStyle: "dot",
  margin: 8,
  logoEnabled: true,
  logoSrc: "/logo-mark.svg",
  logoSize: 0.3,
  logoMargin: 6,
  logoHideDots: true,
}

export const HERO_QR_SIZE = 220
export const PREVIEW_QR_SIZE = 320
export const EXPORT_BASE_SIZE = 512
