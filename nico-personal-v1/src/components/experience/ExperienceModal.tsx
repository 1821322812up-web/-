import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import type { ExperienceEntry } from '../../data/experience'

function MarkedText({ text, markers = [] }: { text: string; markers?: string[] }) {
  const sections: { text: string; marked: boolean }[] = []
  let cursor = 0
  while (cursor < text.length) {
    const next = markers.map((marker) => ({ marker, index: text.indexOf(marker, cursor) }))
      .filter((item) => item.marker.length > 0 && item.index >= 0).sort((a, b) => a.index - b.index)[0]
    if (!next) { sections.push({ text: text.slice(cursor), marked: false }); break }
    if (next.index > cursor) sections.push({ text: text.slice(cursor, next.index), marked: false })
    sections.push({ text: next.marker, marked: true })
    cursor = next.index + next.marker.length
  }
  return <>{sections.map((section, index) => section.marked ? <mark className="experience-modal__marker" key={index}>{section.text}</mark> : section.text)}</>
}

function safeWorkLink(value: string) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : undefined } catch { return undefined }
}

export function ExperienceModal({ entry, source, onClose }: { entry: ExperienceEntry; source: HTMLButtonElement; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const closeAction = useRef<() => void>(() => {})
  useLayoutEffect(() => {
    const el = dialog.current!
    const previousOverflow = document.body.style.overflow
    const sourceRect = source.getBoundingClientRect()
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const origin = reduced ? { x: 0, y: 0, scale: 1, opacity: 0 } : { x: sourceRect.left + sourceRect.width / 2 - innerWidth / 2, y: sourceRect.top + sourceRect.height / 2 - innerHeight / 2, scale: .25, opacity: 0 }
    el.showModal()
    document.body.style.overflow = 'hidden'
    gsap.fromTo(el, origin, { x: 0, y: 0, scale: 1, opacity: 1, duration: reduced ? .01 : .45, ease: 'power3.out' })
    let closing = false
    closeAction.current = () => {
      if (closing) return
      closing = true
      gsap.to(el, { ...origin, duration: reduced ? .01 : .3, ease: 'power2.in', onComplete: () => { el.close(); onClose() } })
    }
    return () => {
      gsap.killTweensOf(el)
      if (el.open) el.close()
      document.body.style.overflow = previousOverflow
      source.focus({ preventScroll: true })
    }
  }, [source, onClose])
  return createPortal(
    <dialog ref={dialog} className="experience-modal" aria-labelledby="experience-modal-title" tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        event.preventDefault()
        const el = event.currentTarget
        // Include the scrollable dialog so keyboard users can read below the fold.
        const stops: HTMLElement[] = [el, ...Array.from(el.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]'))
          .filter((node) => node.tabIndex >= 0 && !node.matches(':disabled') && node.getClientRects().length > 0)]
        const index = stops.indexOf(document.activeElement as HTMLElement)
        const next = index < 0 ? 0 : (index + (event.shiftKey ? -1 : 1) + stops.length) % stops.length
        stops[next].focus({ preventScroll: true })
      }}
      onCancel={(event) => { event.preventDefault(); closeAction.current() }}
      onClick={(event) => { if (event.target !== event.currentTarget) return; const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeAction.current() }}>
      <button type="button" className="experience-modal__close" aria-label="关闭经历" onClick={() => closeAction.current()} autoFocus>×</button>
      <header className="experience-modal__header">
        <p className="experience-modal__eyebrow">EXPERIENCE / NICO</p>
        <h2 id="experience-modal-title">{entry.displayName || entry.company}</h2>
        <p className="experience-modal__role">{entry.role}</p>
        <p className="experience-modal__date">{entry.date}</p>
      </header>
      <ul className="experience-modal__highlights">{entry.highlights?.map((item, index) => <li key={item.title}><span aria-hidden="true" className="experience-modal__number">0{index + 1}</span><div><h3>{item.title}</h3><p><MarkedText text={item.text} markers={item.markers} /></p></div></li>)}</ul>
      {entry.selectedWork && <section className="experience-modal__cases" aria-labelledby="video-cases-title"><h3 id="video-cases-title">优秀作品案例</h3>
        {entry.selectedWork.length === 0 ? <p>待补充</p> : (['KOL','KOC'] as const).map(category=><div className="work-group" data-category={category} key={category}>
          <h4 className="work-group__heading">SELECTED {category} WORK <span>{category==='KOL'?'商业结果与合作表现':'创意场景与真实体验'}</span></h4>
          <div className="work-group__list">{entry.selectedWork!.filter(work=>work.category===category).map((work,index)=><article className="work-case" key={work.link}>
            {work.thumbnail && <a className={`work-case__cover work-case__cover--${work.coverLayout || 'landscape'}`} href={safeWorkLink(work.link)} target="_blank" rel="noopener noreferrer" aria-label={`观看 ${work.title}（新窗口）`}><img className="work-case__thumbnail" src={work.thumbnail} alt={work.thumbnailAlt || work.title} loading="lazy" width={work.coverLayout==='portrait'?460:1280} height={work.coverLayout==='portrait'?726:720}/><span className="work-case__play" aria-hidden="true">↗</span></a>}
            <div className="work-case__eyebrow"><span>{category} / 0{index+1}</span><span>{work.tag}</span></div>
            <h5>{work.title}</h5><p className="work-case__scene">{work.scene} · {work.platform}</p>
            <p className="work-case__summary">{work.result}</p>
            {work.tags && <ul className="work-case__tags">{work.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>}
            {work.stats && <ul className="work-case__stats">{work.stats.map(stat=><li key={stat}><mark className="experience-modal__marker">{stat}</mark></li>)}</ul>}
            {work.cost && <p className="work-case__cost">合作成本 {work.cost}</p>}
            {safeWorkLink(work.link) && <a href={safeWorkLink(work.link)} target="_blank" rel="noopener noreferrer" aria-label={`查看 ${work.title}（新窗口）`}>VIEW WORK ↗</a>}
          </article>)}</div>
        </div>)}
      </section>}
    </dialog>, document.body,
  )
}
