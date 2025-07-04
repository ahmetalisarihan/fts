'use client'

import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from './ThemeProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function ThemeToggle(): JSX.Element {
  const { theme, setTheme, actualTheme } = useTheme()

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system'): void => {
    setTheme(newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-9 h-9 p-0"
          aria-label="Theme seçenekleri"
        >
          {actualTheme === 'dark' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className="cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4" />
          Açık Tema
          {theme === 'light' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className="cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4" />
          Koyu Tema
          {theme === 'dark' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('system')}
          className="cursor-pointer"
        >
          <Monitor className="mr-2 h-4 w-4" />
          Sistem
          {theme === 'system' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Basit toggle butonu (sadece light/dark arası geçiş)
export function SimpleThemeToggle(): JSX.Element {
  const { toggleTheme, actualTheme } = useTheme()

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
