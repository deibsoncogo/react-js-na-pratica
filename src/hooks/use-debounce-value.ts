import { useEffect, useState } from "react"

export default function useDebounceValue<T = unknown>(value: T, delay: number) {
  const [debounceValeu, setDebounceValeu] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValeu(value)
    }, delay)

    return () => { clearTimeout(handler) }
  }, [value, delay])

  return debounceValeu
}
