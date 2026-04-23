import { useState, useEffect } from "react";


export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
};

export function useLocalStorage(key, initialValue) {
      const [value, setValue] = useState(() => {
        try {
          const item = localStorage.getItem(key)
          return item ? JSON.parse(item) : initialValue
        } catch { return initialValue }
      })

      const set = (val) => {
        setValue(val)
        localStorage.setItem(key, JSON.stringify(val))
      }

      return [value, set]
    };