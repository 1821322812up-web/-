import type { RefObject } from 'react'
import { nicoAssets } from '../../data/assets'

interface BrainRevealProps {
  groupRef: RefObject<HTMLDivElement | null>
}

export function BrainReveal({ groupRef }: BrainRevealProps) {
  return (
    <div ref={groupRef} className="brain-objects" aria-label="Nico's creative focus">
      {nicoAssets.hero.brainObjects.map((object) => (
        <img
          key={object.id}
          className={`brain-object ${object.className}`}
          src={object.src}
          alt={object.alt}
          draggable={false}
        />
      ))}
    </div>
  )
}
