import type { Metadata } from "next"

import { QrGenerator } from "@/features/qr"
import { siteDescription, siteName } from "@/lib/site"

export const metadata: Metadata = {
  title: "Studio",
  description: `${siteDescription} Open the studio to customize and export your QR codes.`,
  alternates: {
    canonical: "/studio",
  },
  openGraph: {
    title: `Studio | ${siteName}`,
    description: siteDescription,
    url: "/studio",
  },
  twitter: {
    title: `Studio | ${siteName}`,
    description: siteDescription,
  },
}

export default function StudioPage() {
  return <QrGenerator />
}
