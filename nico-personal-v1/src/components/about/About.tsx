import { useEffect, useRef, type PointerEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nicoAssets } from '../../data/assets'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  { file: 'life-01.jpg', width: 1279, height: 1706, alt: 'Nico 生活照一', drift: -22 },
  { file: 'life-02.jpg', width: 1279, height: 1706, alt: 'Nico 生活照二', drift: 24 },
  { file: 'life-03.jpg', width: 1279, height: 1706, alt: 'Nico 生活照三', drift: -18 },
  { file: 'life-04.jpg', width: 1200, height: 900, alt: 'Nico 生活照四', drift: 16 },
]

const personalObjects = [
  { id: 'dalian', src: nicoAssets.personal.dalian, alt: '大连，灯塔与海', drift: 4 },
  { id: 'dumbbell', src: nicoAssets.personal.dumbbell, alt: '健身哑铃', drift: -2 },
  { id: 'basketball', src: nicoAssets.personal.basketball, alt: '篮球', drift: 2 },
  { id: 'gaming', src: nicoAssets.personal.gaming, alt: '游戏手柄', drift: -2 },
]

/** Intro and photographs share the page canvas; neither owns a background. */
export function About() {
  const root = useRef<HTMLDivElement>(null)
  const introPlayed = useRef(false)

  const moveHeart = (event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget
    const bounds = target.getBoundingClientRect()
    const radius = window.innerWidth <= 700 ? 40 : 60
    const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value))
    const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1)
    const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1)
    const halfHeart = parseFloat(getComputedStyle(target).fontSize) * .49 + 6
    const screenX = clamp(bounds.left - radius + x * (bounds.width + radius * 2), halfHeart, innerWidth - halfHeart)
    const screenY = clamp(bounds.top - radius + y * (bounds.height + radius * 2), halfHeart, innerHeight - halfHeart)
    target.style.setProperty('--heart-x', `${screenX - bounds.left}px`)
    target.style.setProperty('--heart-y', `${screenY - bounds.top}px`)
  }

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        if (!introPlayed.current) {
          gsap.fromTo('.nico-intro__line', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: .7, stagger: .08, ease: 'power2.out', force3D: false,
            scrollTrigger: { trigger: '.nico-intro__statement', start: 'top 80%', once: true },
            onStart: () => {
              introPlayed.current = true
              if (root.current) root.current.dataset.introEntrances = '1'
            },
          })
        } else gsap.set('.nico-intro__line', { opacity: 1, y: 0 })
        gsap.timeline({scrollTrigger:{trigger:'.nico-intro',start:'top 85%',end:'bottom top',scrub:.4}})
          .fromTo('.nico-identity',{opacity:0,x:-70,y:-20,rotation:-2},{opacity:1,x:0,y:0,rotation:0,duration:.3,ease:'back.out(1.05)'})
          .to('.nico-identity',{opacity:1,duration:.35})
          .to('.nico-identity',{opacity:0,duration:.35})
        gsap.utils.toArray<HTMLElement>('.nico-life__photo').forEach((photo, index) => {
          gsap.fromTo(photo, { y: -photos[index].drift }, {
            y: photos[index].drift,force3D:false,
            ease: 'none',
            scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
          })
        })
        gsap.utils.toArray<HTMLElement>('.nico-life__object').forEach((object, index) => {
          gsap.fromTo(object, { y: -personalObjects[index].drift }, {
            y: personalObjects[index].drift, force3D: false, ease: 'none',
            scrollTrigger: { trigger: '.nico-life', start: 'top bottom', end: 'bottom top', scrub: .7 },
          })
        })
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  return (
    <div className="nico-about-flow" ref={root}>
      <section className="nico-intro" id="intro" aria-labelledby="nico-intro-title">
        <p className="nico-identity" aria-label="Nico，我叫曹博洋">我叫曹博洋</p>
        <h2 className="nico-intro__statement" id="nico-intro-title">
          <span className="nico-intro__line">我在创作者、</span>
          <span className="nico-intro__line">文化与语言之间工作。</span>
          <span className="nico-intro__line nico-intro__line--second">也在探索，</span>
          <span className="nico-intro__line">如何让 <mark className="nico-intro__ai" tabIndex={0}
            onPointerEnter={moveHeart} onPointerMove={moveHeart}
            onFocus={event => {
              event.currentTarget.style.setProperty('--heart-x', '50%')
              event.currentTarget.style.setProperty('--heart-y', 'calc(50% - 18px)')
            }}>AI<img className="nico-intro__heart" src="/assets/nico/heart.png" alt="" aria-hidden="true"
              draggable={false} decoding="async" /></mark><wbr /> 真正服务于营销。</span>
        </h2>
      </section>
      <section className="nico-life" id="about" aria-label="Nico 的个人拼贴">
        {photos.map((photo, index) => (
          <figure className={`nico-life__photo nico-life__photo--${index + 1}`} key={photo.file}>
            <img src={`/assets/nico/${photo.file}`} width={photo.width} height={photo.height}
              alt={photo.alt} loading="eager" decoding="async" draggable={false} />
          </figure>
        ))}
        {personalObjects.map(object => (
          <div className={`nico-life__object nico-life__object--${object.id}`} key={object.id}>
            <div className="nico-life__object-hover">
              {object.id === 'basketball' || object.id === 'dumbbell' ? (
                <svg viewBox="0 0 1254 1254" role="img" aria-label={object.alt}>
                  <defs>
                    <filter id={`clean-edge-${object.id}`} x="0" y="0" width="1254" height="1254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feMorphology in="SourceAlpha" operator="erode" radius={object.id === 'basketball' ? 27 : 20} result="inset" />
                      <feGaussianBlur in="inset" stdDeviation=".7" result="soft" />
                      <feComposite in="SourceGraphic" in2="soft" operator="in" />
                    </filter>
                  </defs>
                  <image href={object.src} width="1254" height="1254" filter={`url(#clean-edge-${object.id})`} />
                </svg>
              ) : <img src={object.src} alt={object.alt} width={1254} height={1254}
                loading="eager" decoding="async" draggable={false} />}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
