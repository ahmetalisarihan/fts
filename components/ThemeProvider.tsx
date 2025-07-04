'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { storage } from '@/utils/common'
import { STORAGE_KEYS } from '@/constants'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system' 
}: ThemeProviderProps): JSX.Element {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Get system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Calculate actual theme
  const actualTheme: 'light' | 'dark' = theme === 'system' ? getSystemTheme() : theme

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme)
    storage.set(STORAGE_KEYS.THEME, newTheme)
  }

  // Toggle between light and dark
  const toggleTheme = (): void => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light')
  }

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = storage.get<Theme>(STORAGE_KEYS.THEME)
    if (savedTheme) {
      setThemeState(savedTheme)
    }
    setMounted(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(actualTheme)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        actualTheme === 'dark' ? '#0f172a' : '#ffffff'
      )
    }
  }, [actualTheme, mounted])

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (): void => {
      // Force re-render when system theme changes
      setThemeState('system')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div suppressHydrationWarning>
        {children}
      </div>
    )
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    actualTheme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
