import type { RefObject } from 'react'

interface HeroTypographyProps {
  titleRef: RefObject<HTMLDivElement | null>
}

export function HeroTypography({ titleRef }: HeroTypographyProps) {
  return (
    <div ref={titleRef} className="hero-title" aria-label="Hi, I'm Nico.">
      <span className="hero-title__line hero-title__line--one">HI,</span>
      <span className="hero-title__line hero-title__line--two">I&apos;M NICO.</span>
    </div>
  )
}
