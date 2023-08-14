'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { minutesInSeconds } from "../utils/time"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider refetchInterval={minutesInSeconds(4)}>
      {children}
    </SessionProvider>
  )
}
