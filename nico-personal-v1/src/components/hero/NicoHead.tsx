import type { EyeDirection } from '../../data/assets'
import { nicoAssets } from '../../data/assets'

interface NicoHeadProps {
  direction: EyeDirection
  panic: boolean
  ready: boolean
}

export function NicoHead({ direction, panic, ready }: NicoHeadProps) {
  const src = !ready
    ? nicoAssets.hero.base
    : panic
      ? nicoAssets.hero.panic
      : nicoAssets.hero.eyes[direction]

  return (
    <div className={`nico-head ${ready ? 'nico-head--ready' : ''}`} data-eye-direction={direction}>
      <img
        className="nico-head__active"
        src={src}
        alt="Nico"
        draggable={false}
        aria-live="off"
        fetchPriority="high"
      />
      <div className="nico-head__sky-mask" aria-hidden="true" />
      <img
        className="nico-head__torn-rim"
        src={nicoAssets.hero.headOpen}
        alt=""
        draggable={false}
        aria-hidden="true"
      />
    </div>
  )
}
