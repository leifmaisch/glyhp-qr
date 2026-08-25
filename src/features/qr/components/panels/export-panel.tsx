import { SliderControl } from "@/features/qr/components/controls/slider-control"
import type { QrDitherMode, QrExportState, QrErrorLevel, QrExportFormat } from "@/features/qr/types"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ExportPanelProps = {
  state: QrExportState
  errorLevel: QrErrorLevel
  isExporting: boolean
  onChange: (patch: Partial<QrExportState & { errorLevel: QrErrorLevel }>) => void
  onExport: () => void
}

const exportFormats: { value: QrExportFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "svg", label: "SVG" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
]

const errorLevels: { value: QrErrorLevel; label: string }[] = [
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "Quartile (25%)" },
  { value: "H", label: "High (30%)" },
]

const ditherModes: { value: QrDitherMode; label: string }[] = [
  { value: "none", label: "None" },
  { value: "ordered", label: "Ordered" },
  { value: "floyd-steinberg", label: "Floyd-Steinberg" },
]

export function ExportPanel({
  state,
  errorLevel,
  isExporting,
  onChange,
  onExport,
}: ExportPanelProps) {
  const ditherAvailable = state.exportFormat !== "svg"

  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel className="text-label font-medium text-muted-foreground">
          Error correction
        </FieldLabel>
        <Select
          value={errorLevel}
          onValueChange={(value) =>
            onChange({ errorLevel: value as QrErrorLevel })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {errorLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel className="text-label font-medium text-muted-foreground">
          Format
        </FieldLabel>
        <Select
          value={state.exportFormat}
          onValueChange={(value) =>
            onChange({ exportFormat: value as QrExportFormat })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {exportFormats.map((format) => (
              <SelectItem key={format.value} value={format.value}>
                {format.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <SliderControl
        label="Export scale"
        value={state.exportScale}
        min={1}
        max={4}
        suffix="x"
        onChange={(exportScale) => onChange({ exportScale })}
      />

      <Field>
        <FieldLabel className="text-label font-medium text-muted-foreground">
          Dither effect
        </FieldLabel>
        {ditherAvailable ? (
          <Select
            value={state.ditherMode}
            onValueChange={(value) =>
              onChange({ ditherMode: value as QrDitherMode })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ditherModes.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <FieldDescription>
            Dither is available for PNG, JPEG, and WebP exports only.
          </FieldDescription>
        )}
      </Field>

      {ditherAvailable && state.ditherMode !== "none" ? (
        <SliderControl
          label="Dither intensity"
          value={Math.round(state.ditherIntensity * 100)}
          min={10}
          max={100}
          suffix="%"
          onChange={(value) =>
            onChange({ ditherIntensity: value / 100 })
          }
        />
      ) : null}

      <Button
        type="button"
        className="w-full"
        disabled={isExporting}
        onClick={onExport}
      >
        {isExporting ? "Exporting..." : "Download QR code"}
      </Button>
    </div>
  )
}
