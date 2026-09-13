import type { RefObject } from 'react'

interface PaperFoldProps {
  foldRef: RefObject<HTMLDivElement | null>
}

export function PaperFold({ foldRef }: PaperFoldProps) {
  return (
    <div ref={foldRef} className="paper-fold" aria-hidden="true">
      <div className="paper-fold__shadow" />
      <div className="paper-fold__back">
        <span>KEEP LOOKING</span>
      </div>
    </div>
  )
}
