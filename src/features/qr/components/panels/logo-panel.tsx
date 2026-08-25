"use client"

import { ColorControl } from "@/features/qr/components/controls/color-control"
import { FileUploadField } from "@/features/qr/components/controls/file-upload-field"
import { SliderControl } from "@/features/qr/components/controls/slider-control"
import { useLogoPreview } from "@/features/qr/hooks/use-logo-preview"
import type { QrLogoState } from "@/features/qr/types"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

type LogoPanelProps = {
  state: QrLogoState
  onChange: (patch: Partial<QrLogoState>) => void
  onUpload: (file: File) => void
  onClear: () => void
}

export function LogoPanel({
  state,
  onChange,
  onUpload,
  onClear,
}: LogoPanelProps) {
  const hasLogo = Boolean(state.logoSrc)
  const previewSrc = useLogoPreview(state)

  return (
    <div className="flex flex-col gap-4">
      <FileUploadField
        label="Logo image"
        description="PNG or SVG with transparency works best."
        previewSrc={previewSrc}
        onFile={onUpload}
      />

      {hasLogo ? (
        <>
          <Button type="button" variant="outline" size="sm" onClick={onClear}>
            Remove logo
          </Button>
          <Field className="flex-row items-center justify-between">
            <FieldLabel className="text-label font-medium text-muted-foreground">
              Color overwrite
            </FieldLabel>
            <Switch
              checked={state.logoColorOverwrite}
              onCheckedChange={(logoColorOverwrite) =>
                onChange({ logoColorOverwrite })
              }
            />
          </Field>
          {state.logoColorOverwrite ? (
            <ColorControl
              label="Logo color"
              value={state.logoOverwriteColor}
              fallback="#f97316"
              onChange={(logoOverwriteColor) => onChange({ logoOverwriteColor })}
            />
          ) : null}
          <SliderControl
            label="Logo size"
            value={Math.round(state.logoSize * 100)}
            min={10}
            max={50}
            suffix="%"
            onChange={(value) => onChange({ logoSize: value / 100 })}
          />
          <SliderControl
            label="Logo margin"
            value={state.logoMargin}
            min={0}
            max={20}
            onChange={(logoMargin) => onChange({ logoMargin })}
          />
          <Field className="flex-row items-center justify-between">
            <FieldLabel className="text-label font-medium text-muted-foreground">
              Hide dots behind logo
            </FieldLabel>
            <Switch
              checked={state.logoHideDots}
              onCheckedChange={(logoHideDots) => onChange({ logoHideDots })}
            />
          </Field>
        </>
      ) : null}
    </div>
  )
}
