import { useState, useEffect, useCallback, useRef } from 'react'
import { debounce, storage } from '@/utils/common'
import { SEARCH_CONFIG } from '@/constants'

/**
 * Local storage hook
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get(key, initialValue)
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      storage.set(key, valueToStore)
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

/**
 * Debounced value hook
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Previous value hook
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  
  useEffect(() => {
    ref.current = value
  })
  
  return ref.current
}

/**
 * Toggle hook
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])
  
  return [value, toggle]
}

/**
 * Counter hook
 */
export function useCounter(
  initialValue: number = 0
): {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  set: (value: number) => void
} {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(x => x + 1), [])
  const decrement = useCallback(() => setCount(x => x - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  const set = useCallback((value: number) => setCount(value), [])

  return { count, increment, decrement, reset, set }
}

/**
 * Array manipulation hook
 */
export function useArray<T>(initialArray: T[] = []) {
  const [array, setArray] = useState<T[]>(initialArray)

  const push = useCallback((element: T) => {
    setArray(arr => [...arr, element])
  }, [])

  const filter = useCallback((callback: (item: T) => boolean) => {
    setArray(arr => arr.filter(callback))
  }, [])

  const update = useCallback((index: number, newElement: T) => {
    setArray(arr => [
      ...arr.slice(0, index),
      newElement,
      ...arr.slice(index + 1)
    ])
  }, [])

  const remove = useCallback((index: number) => {
    setArray(arr => [
      ...arr.slice(0, index),
      ...arr.slice(index + 1)
    ])
  }, [])

  const clear = useCallback(() => setArray([]), [])

  return { array, set: setArray, push, filter, update, remove, clear }
}

/**
 * Async operation hook
 */
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = useCallback(() => {
    setStatus('pending')
    setData(null)
    setError(null)

    return asyncFunction()
      .then((response: T) => {
        setData(response)
        setStatus('success')
        return response
      })
      .catch((error: E) => {
        setError(error)
        setStatus('error')
        throw error
      })
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, data, error }
}

/**
 * Click outside hook
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handler])

  return ref
}

/**
 * Window size hook
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

/**
 * Media query hook
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query)
      if (media.matches !== matches) {
        setMatches(media.matches)
      }
      
      const listener = () => setMatches(media.matches)
      media.addEventListener('change', listener)
      
      return () => media.removeEventListener('change', listener)
    }
  }, [matches, query])

  return matches
}

/**
 * Intersection observer hook
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%' }: IntersectionObserverInit = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin])

  return entry
}

/**
 * Search hook with debouncing
 */
export function useSearch<T>(
  searchFunction: (query: string) => Promise<T[]>,
  delay: number = SEARCH_CONFIG.DEBOUNCE_DELAY
) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, delay)

  useEffect(() => {
    if (debouncedQuery.length >= SEARCH_CONFIG.MIN_QUERY_LENGTH) {
      setIsLoading(true)
      setError(null)

      searchFunction(debouncedQuery)
        .then(setResults)
        .catch((err) => {
          setError(err.message || 'Search failed')
          setResults([])
        })
        .finally(() => setIsLoading(false))
    } else {
      setResults([])
      setIsLoading(false)
      setError(null)
    }
  }, [debouncedQuery, searchFunction])

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearResults: () => setResults([])
  }
}

/**
 * Copy to clipboard hook
 */
export function useCopyToClipboard(): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      setCopied(false)
    }
  }, [])

  return [copied, copy]
}

/**
 * Scroll position hook
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset
      })
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

/**
 * Document title hook
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    return () => {
      document.title = previousTitle
    }
  }, [title])
}
