import { squircle } from "@/lib/squircle"
import { surfaceDepth, surfaceDepthFrame } from "@/lib/surface-depth"
import { cn } from "@/lib/utils"

type QrPreviewProps = {
  containerRef: React.RefObject<HTMLDivElement | null>
  className?: string
}

export function QrPreview({ containerRef, className }: QrPreviewProps) {
  return (
    <div className={cn("flex min-h-0 min-w-0 flex-col", className)}>
      <div
        style={squircle}
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-hidden rounded-squircle-xl border border-border/60 bg-muted/50 p-1",
          surfaceDepthFrame
        )}
      >
        <div className="flex shrink-0 border-b border-border/60 px-3 py-2">
          <p className="text-title">Preview</p>
        </div>
        <div
          style={squircle}
          className={cn(
            "relative m-1 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-squircle-inner border border-border bg-card p-3 sm:p-4",
            surfaceDepth("md")
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_0%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_65%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(color-mix(in_srgb,var(--primary)_8%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--primary)_8%,transparent)_1px,transparent_1px)] [background-size:24px_24px]"
          />
          <div
            ref={containerRef}
            className="relative z-10 flex size-full min-h-0 items-center justify-center [&_canvas]:max-h-full [&_canvas]:max-w-full [&_canvas]:rounded-squircle-md"
          />
        </div>
      </div>
    </div>
  )
}
