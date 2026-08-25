import type { QrColorValue, QrStyleState } from "@/features/qr/types"

export function normalizeHex(value: string, fallback: string) {
  const trimmed = value.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return fallback
}

function resolveGradient(
  state: QrStyleState,
  start: string,
  end: string
): QrColorValue {
  if (state.gradientType === "none") return start

  return {
    type: state.gradientType,
    rotation: state.gradientRotation,
    colorStops: [
      { offset: 0, color: start },
      { offset: 1, color: end },
    ],
  }
}

export function resolveForegroundColor(state: QrStyleState): QrColorValue {
  const foreground = normalizeHex(state.foreground, "#f97316")
  if (state.gradientType === "none") return foreground

  const gradientStart = normalizeHex(state.gradientStart, foreground)
  const gradientEnd = normalizeHex(state.gradientEnd, foreground)
  return resolveGradient(state, gradientStart, gradientEnd)
}

export function resolveBackgroundColor(state: QrStyleState) {
  return normalizeHex(state.background, "#f8fafc")
}
