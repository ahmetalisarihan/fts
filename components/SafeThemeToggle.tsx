'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useThemeSafe } from '@/hooks/useThemeSafe'

export function SafeThemeToggle(): JSX.Element {
  const { actualTheme, toggleTheme, mounted } = useThemeSafe()

  // Show placeholder during SSR/hydration
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-input bg-background flex items-center justify-center">
        <Sun className="h-4 w-4 text-muted-foreground" />
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0"
      aria-label={`${actualTheme === 'dark' ? 'Açık' : 'Koyu'} temaya geç`}
    >
      {actualTheme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
