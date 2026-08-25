"use client"

import { useCallback, useMemo } from "react"

import { useQrExport } from "@/features/qr/hooks/use-qr-export"
import { useQrPreview } from "@/features/qr/hooks/use-qr-preview"
import { useQrState } from "@/features/qr/hooks/use-qr-state"
import { defaultQrState } from "@/features/qr/defaults"
import { toPreviewState } from "@/features/qr/state/selectors"
import type { QrGeneratorState } from "@/features/qr/types"
import { readFileAsDataUrl } from "@/lib/read-file-as-data-url"

export type QrGeneratorContext = ReturnType<typeof useQrGenerator>

export function useQrGenerator(initialState: QrGeneratorState = defaultQrState) {
  const { state, patch, setLogo, clearLogo } = useQrState(initialState)
  const previewState = useMemo(() => toPreviewState(state), [state])
  const previewRef = useQrPreview({ state: previewState })
  const { isExporting, error, exportQr, clearError, setError } = useQrExport(state)

  const uploadLogo = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file.")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Logo must be smaller than 5 MB.")
        return
      }

      try {
        const dataUrl = await readFileAsDataUrl(file)
        setLogo(dataUrl)
        clearError()
      } catch {
        setError("Failed to load logo image.")
      }
    },
    [setLogo, clearError, setError]
  )

  const handlePatch = useCallback(
    (payload: Partial<QrGeneratorState>) => {
      patch(payload)
      clearError()
    },
    [patch, clearError]
  )

  return {
    state,
    previewRef,
    isExporting,
    error,
    patch: handlePatch,
    uploadLogo,
    clearLogo,
    exportQr,
  }
}
