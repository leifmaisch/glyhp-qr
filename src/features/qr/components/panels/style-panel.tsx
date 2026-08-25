import { ColorControl } from "@/features/qr/components/controls/color-control"
import { SliderControl } from "@/features/qr/components/controls/slider-control"
import type {
  QrCornerStyle,
  QrDotStyle,
  QrStyleState,
} from "@/features/qr/types"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type StylePanelProps = {
  state: QrStyleState
  onChange: (patch: Partial<QrStyleState>) => void
}

const dotStyles: { value: QrDotStyle; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "extra-rounded", label: "Extra rounded" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy rounded" },
]

const cornerStyles: { value: QrCornerStyle; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
  { value: "extra-rounded", label: "Extra rounded" },
]

export function StylePanel({ state, onChange }: StylePanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <ColorControl
        label="Foreground"
        value={state.foreground}
        fallback="#f97316"
        onChange={(foreground) => onChange({ foreground })}
      />
      <ColorControl
        label="Background"
        value={state.background}
        fallback="#f8fafc"
        onChange={(background) => onChange({ background })}
      />

      <Field>
        <FieldLabel className="text-label font-medium text-muted-foreground">
          Dot style
        </FieldLabel>
        <Select
          value={state.dotStyle}
          onValueChange={(value) =>
            onChange({ dotStyle: value as QrDotStyle })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dotStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel className="text-label font-medium text-muted-foreground">
          Corner square
        </FieldLabel>
        <Select
          value={state.cornerSquareStyle}
          onValueChange={(value) =>
            onChange({ cornerSquareStyle: value as QrCornerStyle })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cornerStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel className="text-label font-medium text-muted-foreground">
          Corner dot
        </FieldLabel>
        <Select
          value={state.cornerDotStyle}
          onValueChange={(value) =>
            onChange({ cornerDotStyle: value as QrCornerStyle })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cornerStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <SliderControl
        label="Quiet zone"
        value={state.margin}
        min={0}
        max={40}
        onChange={(margin) => onChange({ margin })}
      />
    </div>
  )
}
