import { createContext, useContext } from 'react'

export const historyContext = createContext<{
  path: string
  goto: (path: string) => void
} | null>(null)

export function useHistory() {
  const ctx = useContext(historyContext)
  if (!ctx)
    throw new Error('usePath must be used in pathContext')
  return ctx
}
