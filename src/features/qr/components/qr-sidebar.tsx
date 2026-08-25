"use client"

import { useState } from "react"

import { SectionSwitcher } from "@/features/qr/components/controls/section-switcher"
import { ContentPanel } from "@/features/qr/components/panels/content-panel"
import { ExportPanel } from "@/features/qr/components/panels/export-panel"
import { LogoPanel } from "@/features/qr/components/panels/logo-panel"
import { StylePanel } from "@/features/qr/components/panels/style-panel"
import type { QrGeneratorContext } from "@/features/qr/hooks/use-qr-generator"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { squircle } from "@/lib/squircle"
import { surfaceDepth } from "@/lib/surface-depth"
import { cn } from "@/lib/utils"

type QrSidebarProps = QrGeneratorContext & {
  className?: string
}

const studioSections = [
  { value: "content", label: "Content" },
  { value: "style", label: "Style" },
  { value: "logo", label: "Logo" },
  { value: "export", label: "Export" },
] as const

type StudioSection = (typeof studioSections)[number]["value"]

export function QrSidebar({
  className,
  state,
  patch,
  uploadLogo,
  clearLogo,
  exportQr,
  isExporting,
  error,
}: QrSidebarProps) {
  const [section, setSection] = useState<StudioSection>("content")

  return (
    <Card
      className={cn(
        "flex h-full min-h-0 w-full min-w-0 flex-col",
        className
      )}
    >
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle>Studio</CardTitle>
        <SectionSwitcher
          value={section}
          onChange={setSection}
          options={[...studioSections]}
          className="mt-4"
        />
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {section === "content" ? (
          <ContentPanel
            state={state}
            onChange={patch}
          />
        ) : null}
        {section === "style" ? (
          <StylePanel
            state={state}
            onChange={patch}
          />
        ) : null}
        {section === "logo" ? (
          <LogoPanel
            state={state}
            onChange={patch}
            onUpload={uploadLogo}
            onClear={clearLogo}
          />
        ) : null}
        {section === "export" ? (
          <ExportPanel
            state={state}
            errorLevel={state.errorLevel}
            isExporting={isExporting}
            onChange={patch}
            onExport={() => void exportQr()}
          />
        ) : null}
      </CardContent>

      {error ? (
        <div
          style={squircle}
          className={cn(
            "mx-4 mb-4 rounded-squircle-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-caption text-destructive",
            surfaceDepth("md")
          )}
        >
          {error}
        </div>
      ) : null}
    </Card>
  )
}
