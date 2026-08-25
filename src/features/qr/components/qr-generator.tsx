"use client"

import { SiteNavbar } from "@/components/site-navbar"
import { QrPreview } from "@/features/qr/components/qr-preview"
import { QrSidebar } from "@/features/qr/components/qr-sidebar"
import { useQrGenerator } from "@/features/qr/hooks/use-qr-generator"

export function QrGenerator() {
  const generator = useQrGenerator()

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNavbar activePath="/studio" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex h-[min(46rem,calc(100dvh-5rem))] min-h-0 flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-6">
          <QrSidebar {...generator} className="order-2 min-h-0 flex-1 lg:order-1 lg:h-full" />
          <QrPreview
            className="order-1 h-56 shrink-0 sm:h-60 lg:order-2 lg:h-full lg:min-h-0"
            containerRef={generator.previewRef}
          />
        </div>
      </main>
    </div>
  )
}
