import { useEffect, useState } from 'react'

export function usePreloadImages(urls: readonly string[]) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const uniqueUrls = [...new Set(urls)]

    if (uniqueUrls.length === 0) {
      setReady(false)
      return () => {
        cancelled = true
      }
    }

    setReady(false)

    Promise.all(
      uniqueUrls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const image = new Image()
            image.decoding = 'async'
            image.onload = () => resolve()
            image.onerror = () => resolve()
            image.src = url
            if (image.complete) resolve()
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [urls])

  return ready
}
