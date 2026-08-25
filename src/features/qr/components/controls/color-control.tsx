import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { normalizeHex } from "@/features/qr/core/resolve-colors"
import { cn } from "@/lib/utils"

type ColorControlProps = {
  label: string
  value: string
  fallback: string
  onChange: (value: string) => void
  className?: string
}

export function ColorControl({
  label,
  value,
  fallback,
  onChange,
  className,
}: ColorControlProps) {
  const normalized = normalizeHex(value, fallback)

  return (
    <Field className={className}>
      <FieldLabel className="text-label font-medium text-muted-foreground">
        {label}
      </FieldLabel>
      <div className="flex w-full items-center gap-2">
        <Label className="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-squircle-sm border border-input">
          <input
            type="color"
            value={normalized}
            onChange={(event) => onChange(event.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
          <span
            className="block size-full"
            style={{ backgroundColor: normalized }}
            aria-hidden
          />
        </Label>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => onChange(normalizeHex(value, fallback))}
          className={cn("font-mono text-xs uppercase")}
        />
      </div>
    </Field>
  )
}
