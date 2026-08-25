import { useCallback, useReducer } from "react"

import { defaultQrState } from "@/features/qr/defaults"
import type { QrGeneratorState } from "@/features/qr/types"

type QrAction =
  | { type: "patch"; payload: Partial<QrGeneratorState> }
  | { type: "set-logo"; payload: string }
  | { type: "clear-logo" }

function qrReducer(
  state: QrGeneratorState,
  action: QrAction
): QrGeneratorState {
  switch (action.type) {
    case "patch":
      return { ...state, ...action.payload }
    case "set-logo":
      return {
        ...state,
        logoSrc: action.payload,
        logoEnabled: true,
      }
    case "clear-logo":
      return {
        ...state,
        logoSrc: null,
        logoEnabled: false,
      }
    default:
      return state
  }
}

export function useQrState(initialState: QrGeneratorState = defaultQrState) {
  const [state, dispatch] = useReducer(qrReducer, initialState)

  const patch = useCallback((payload: Partial<QrGeneratorState>) => {
    dispatch({ type: "patch", payload })
  }, [])

  const setLogo = useCallback((payload: string) => {
    dispatch({ type: "set-logo", payload })
  }, [])

  const clearLogo = useCallback(() => {
    dispatch({ type: "clear-logo" })
  }, [])

  return { state, patch, setLogo, clearLogo }
}
