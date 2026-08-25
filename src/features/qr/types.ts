export type QrContentType = "url" | "text" | "email" | "phone" | "wifi"

export type QrDotStyle =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded"

export type QrCornerStyle = "square" | "dot" | "extra-rounded"

export type QrErrorLevel = "L" | "M" | "Q" | "H"

export type QrDitherMode = "none" | "ordered" | "floyd-steinberg"

export type QrGradientType = "none" | "linear" | "radial"

export type QrExportFormat = "png" | "svg" | "jpeg" | "webp"

export type QrContentState = {
  contentType: QrContentType
  url: string
  text: string
  email: string
  emailSubject: string
  phone: string
  wifiSsid: string
  wifiPassword: string
  wifiEncryption: "WPA" | "WEP" | "nopass"
  wifiHidden: boolean
}

export type QrStyleState = {
  foreground: string
  background: string
  gradientType: QrGradientType
  gradientStart: string
  gradientEnd: string
  gradientRotation: number
  dotStyle: QrDotStyle
  cornerSquareStyle: QrCornerStyle
  cornerDotStyle: QrCornerStyle
  margin: number
  errorLevel: QrErrorLevel
}

export type QrLogoState = {
  logoEnabled: boolean
  logoSrc: string | null
  logoSize: number
  logoMargin: number
  logoHideDots: boolean
  logoColorOverwrite: boolean
  logoOverwriteColor: string
}

export type QrExportState = {
  ditherMode: QrDitherMode
  ditherIntensity: number
  exportFormat: QrExportFormat
  exportScale: number
}

export type QrGeneratorState = QrContentState &
  QrStyleState &
  QrLogoState &
  QrExportState

export type QrRenderState = QrContentState & QrStyleState & QrLogoState

export type QrPreviewState = QrRenderState & {
  ditherMode: QrDitherMode
  ditherIntensity: number
}

export type QrColorValue =
  | string
  | {
      type: "linear" | "radial"
      rotation?: number
      colorStops: { offset: number; color: string }[]
    }
