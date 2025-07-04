import { useTheme } from '@/components/ThemeProvider'
import { useEffect, useState } from 'react'

export function useThemeSafe() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  try {
    const theme = useTheme()
    return { 
      ...theme, 
      mounted 
    }
  } catch (error) {
    // Fallback when not inside ThemeProvider
    return {
      theme: 'light' as const,
      setTheme: () => {},
      actualTheme: 'light' as const,
      toggleTheme: () => {},
      mounted
    }
  }
}
