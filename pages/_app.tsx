import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import Navbar from "@/components/Navbar"

/**
 * import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
 */

const darkTheme = createTheme({
  type: 'dark'
});

export default function App({ Component, pageProps }: AppProps<{initialSession: Session}>) {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextUIProvider theme={darkTheme}>
        <Navbar />
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionContextProvider>
  )
}
