import { useEffect, useRef, useState } from 'react'
import './FinalQuote.css'

export function FinalQuote() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setIsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.34 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="quote"
      className={`final-quote${isVisible ? ' final-quote--visible' : ''}`}
      aria-labelledby="final-quote-heading"
    >
      <div className="final-quote__inner">
        <div className="final-quote__paper-mark" aria-hidden="true">
          <span className="final-quote__paper-face final-quote__paper-face--left" />
          <span className="final-quote__paper-face final-quote__paper-face--right" />
          <span className="final-quote__mark">“</span>
        </div>

        <h2 id="final-quote-heading" className="final-quote__heading">
          <span className="final-quote__line-mask">
            <span className="final-quote__line final-quote__line--one">
              <span>STAY</span> <em>CURIOUS.</em>
            </span>
          </span>
          <span className="final-quote__line-mask">
            <span className="final-quote__line final-quote__line--two">
              <em>KEEP</em> <span>MOVING.</span>
            </span>
          </span>
        </h2>

        <div className="final-quote__meta">
          <p className="final-quote__translation">
            保持好奇，<br />
            继续向前。
          </p>

          <p className="final-quote__signature">
            <span>NICO CAO</span>
            <span>2026</span>
          </p>
        </div>
      </div>
    </section>
  )
}
