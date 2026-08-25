import type { QrErrorLevel } from "@/features/qr/types"

export const ERROR_CORRECTION_LOGO_FACTORS: Record<QrErrorLevel, number> = {
  M: 0.15,
  Q: 0.25,
  H: 0.3,
}

const REFERENCE_ERROR_LEVEL: QrErrorLevel = "H"

export function compensatedLogoSize(
  logoSize: number,
  errorLevel: QrErrorLevel
) {
  const reference = ERROR_CORRECTION_LOGO_FACTORS[REFERENCE_ERROR_LEVEL]
  const current = ERROR_CORRECTION_LOGO_FACTORS[errorLevel]
  return logoSize * (reference / current)
}
