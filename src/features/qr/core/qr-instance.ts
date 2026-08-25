import QRCodeStyling, { type Options } from "qr-code-styling"

import { buildQrPayload } from "@/features/qr/core/build-payload"
import { compensatedLogoSize } from "@/features/qr/core/logo-size"
import {
  resolveBackgroundColor,
  resolveForegroundColor,
} from "@/features/qr/core/resolve-colors"
import type { QrRenderState } from "@/features/qr/types"

export type QrInstance = QRCodeStyling

function hasLogo(state: QrRenderState) {
  return state.logoEnabled && Boolean(state.logoSrc)
}

function buildImageOptions(
  state: QrRenderState,
  logoImage?: string
): Options["imageOptions"] {
  const options: NonNullable<Options["imageOptions"]> = {
    hideBackgroundDots: state.logoHideDots,
    imageSize: compensatedLogoSize(state.logoSize, state.errorLevel),
    margin: state.logoMargin,
  }

  const src = logoImage ?? state.logoSrc
  if (src?.startsWith("http://") || src?.startsWith("https://")) {
    options.crossOrigin = "anonymous"
  }

  return options
}

export function buildQrOptions(
  state: QrRenderState,
  size: number,
  logoImage?: string
): Options {
  const foreground = resolveForegroundColor(state)
  const image =
    logoImage ?? (hasLogo(state) ? state.logoSrc ?? undefined : undefined)

  return {
    width: size,
    height: size,
    type: "canvas",
    data: buildQrPayload(state),
    margin: state.margin,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: state.errorLevel,
    },
    image,
    imageOptions: buildImageOptions(state, logoImage),
    dotsOptions: {
      color: foreground as Options["dotsOptions"] extends { color?: infer C }
        ? C
        : never,
      type: state.dotStyle,
    },
    cornersSquareOptions: {
      color: foreground as Options["cornersSquareOptions"] extends {
        color?: infer C
      }
        ? C
        : never,
      type: state.cornerSquareStyle,
    },
    cornersDotOptions: {
      color: foreground as Options["cornersDotOptions"] extends {
        color?: infer C
      }
        ? C
        : never,
      type: state.cornerDotStyle,
    },
    backgroundOptions: {
      color: resolveBackgroundColor(state),
    },
  }
}

export function createQrInstance(
  state: QrRenderState,
  size: number,
  logoImage?: string
) {
  return new QRCodeStyling(buildQrOptions(state, size, logoImage))
}

export async function waitForQrRender(
  instance: QrInstance,
  state: QrRenderState
) {
  if (!hasLogo(state)) return
  await instance.getRawData("png")
}

export function mountQrInstance(
  instance: QrInstance,
  container: HTMLElement
) {
  container.replaceChildren()
  instance.append(container)
}

export function getQrCanvas(container: HTMLElement) {
  return container.querySelector("canvas")
}
