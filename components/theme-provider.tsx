/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */


'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
