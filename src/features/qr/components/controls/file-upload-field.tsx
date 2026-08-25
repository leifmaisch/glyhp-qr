"use client"

import { UploadIcon } from "@phosphor-icons/react"
import { useRef } from "react"

import { iconWeight } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { squircle } from "@/lib/squircle"
import { surfaceDepth } from "@/lib/surface-depth"
import { cn } from "@/lib/utils"

type FileUploadFieldProps = {
  label: string
  description?: string
  accept?: string
  previewSrc?: string | null
  onFile: (file: File) => void
  className?: string
}

export function FileUploadField({
  label,
  description,
  accept = "image/png,image/jpeg,image/webp,image/svg+xml,image/gif",
  previewSrc,
  onFile,
  className,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Field className={className}>
      <FieldLabel className="text-label font-medium text-muted-foreground">
        {label}
      </FieldLabel>
      {description ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onFile(file)
          event.target.value = ""
        }}
      />

      {previewSrc ? (
        <div
          style={squircle}
          className={cn(
            "flex w-full flex-col gap-3 rounded-squircle-md border border-border bg-muted/30 p-3",
            surfaceDepth("md")
          )}
        >
          <div
            style={squircle}
            className="flex min-h-24 w-full items-center justify-center overflow-hidden rounded-squircle-sm border border-border bg-background p-4"
          >
            <img
              src={previewSrc}
              alt="Logo preview"
              className="max-h-24 w-full object-contain"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => inputRef.current?.click()}
          >
            <UploadIcon weight={iconWeight} />
            Replace image
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => inputRef.current?.click()}
        >
          <UploadIcon weight={iconWeight} />
          Choose image
        </Button>
      )}
    </Field>
  )
}
