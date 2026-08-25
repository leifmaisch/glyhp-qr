import type { QrContentState } from "@/features/qr/types"

export function buildQrPayload(state: QrContentState): string {
  switch (state.contentType) {
    case "url":
      return state.url.trim() || "https://glyph.qr"
    case "text":
      return state.text.trim() || "Hello, world!"
    case "email": {
      const address = state.email.trim()
      if (!address) return "mailto:hello@example.com"
      const subject = state.emailSubject.trim()
      if (!subject) return `mailto:${address}`
      return `mailto:${address}?subject=${encodeURIComponent(subject)}`
    }
    case "phone":
      return `tel:${state.phone.trim() || "+1234567890"}`
    case "wifi": {
      const ssid = state.wifiSsid.trim() || "MyNetwork"
      const encryption =
        state.wifiEncryption === "nopass" ? "nopass" : state.wifiEncryption
      const hidden = state.wifiHidden ? "true" : "false"
      const password =
        encryption === "nopass" ? "" : escapeWifiValue(state.wifiPassword)
      return `WIFI:T:${encryption};S:${escapeWifiValue(ssid)};P:${password};H:${hidden};;`
    }
    default:
      return state.url
  }
}

function escapeWifiValue(value: string) {
  return value.replace(/([\\;,:"])/g, "\\$1")
}
