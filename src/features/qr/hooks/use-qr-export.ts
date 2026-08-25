"use client"

import { useCallback, useState } from "react"

import {
  downloadBlob,
  exportQrCode,
  getExportFilename,
} from "@/features/qr/core/export"
import type { QrGeneratorState } from "@/features/qr/types"

export function useQrExport(state: QrGeneratorState) {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportQr = useCallback(async () => {
    setIsExporting(true)
    setError(null)

    try {
      const blob = await exportQrCode(state)
      downloadBlob(blob, getExportFilename(state.exportFormat))
    } catch {
      setError("Export failed. Try again with different settings.")
    } finally {
      setIsExporting(false)
    }
  }, [state])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const setExportError = useCallback((message: string) => {
    setError(message)
  }, [])

  return { isExporting, error, exportQr, clearError, setError: setExportError }
}
