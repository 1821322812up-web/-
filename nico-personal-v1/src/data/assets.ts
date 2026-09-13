export type EyeDirection =
  | 'center'
  | 'cross'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'

const root = '/assets/nico'

export const nicoAssets = {
  hero: {
    base: `${root}/nico-base.png`,
    headOpen: `${root}/nico-head-open.png`,
    panic: `${root}/nico-panic.png`,
    eyes: {
      center: `${root}/nico-base.png`,
      cross: `${root}/nico-cross-eye.png`,
      up: `${root}/nico-look-up.png`,
      down: `${root}/nico-look-down.png`,
      left: `${root}/nico-look-left.png`,
      right: `${root}/nico-look-right.png`,
      'up-left': `${root}/nico-look-up-left.png`,
      'up-right': `${root}/nico-look-up-right.png`,
      'down-left': `${root}/nico-look-down-left.png`,
      'down-right': `${root}/nico-look-down-right.png`,
    } satisfies Record<EyeDirection, string>,
    brainObjects: [
      { id: 'kol', src: `${root}/kol.png`, alt: 'KOL', className: 'brain-object--kol' },
      { id: 'de-en', src: `${root}/de-en.png`, alt: 'DE and EN', className: 'brain-object--de-en' },
      { id: 'ai', src: `${root}/ai.png`, alt: 'AI', className: 'brain-object--ai' },
      { id: 'brain', src: `${root}/brain.png`, alt: '大脑', className: 'brain-object--brain' },
      { id: 'cloud', src: `${root}/cloud.png`, alt: '云朵', className: 'brain-object--cloud' },
      { id: 'heart', src: `${root}/heart.png`, alt: '爱心', className: 'brain-object--heart' },
    ],
  },
  about: {
    portrait: `${root}/nico-about.png`,
    brain: `${root}/brain.png`,
    cloud: `${root}/cloud.png`,
    heart: `${root}/heart.png`,
    photos: [`${root}/life-01.jpg`, `${root}/life-02.jpg`, `${root}/life-03.jpg`, `${root}/life-04.jpg`],
  },
  companies: {
    jackery: `${root}/jackery.png`,
    netease: `${root}/netease.png`,
  },
  personal: {
    dalian: `${root}/dalian.png`,
    basketball: `${root}/basketball.png`,
    gaming: `${root}/gaming.png`,
    dumbbell: `${root}/dumbbell.png`,
  },
} as const

export const criticalAssetUrls = [
  nicoAssets.hero.base,
  nicoAssets.hero.headOpen,
]

export const eyeAssetUrls = [nicoAssets.hero.panic, ...new Set(Object.values(nicoAssets.hero.eyes))]
