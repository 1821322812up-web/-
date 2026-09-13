import { useCallback, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import gsap from 'gsap'
import { experienceEntries } from '../../data/experience'
import { ExperienceModal } from './ExperienceModal'
import { FloatingCompany } from './FloatingCompany'
import './experience.css'

export function Experience() {
  const [activeCompany, setActiveCompany] = useState<string | null>(null)
  const [opened, setOpened] = useState<{ company: string; source: HTMLButtonElement } | null>(null)
  const closeModal = useCallback(() => { setOpened(null); setActiveCompany(null) }, [])
  const stage = useRef<HTMLDivElement>(null)
  useLayoutEffect(()=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const ctx=gsap.context(()=>{gsap.fromTo('.experience__portrait-entrance',{y:180},{y:0,ease:'none',scrollTrigger:{trigger:stage.current,start:'top bottom',end:'top 15%',scrub:.5}})},stage)
    return()=>ctx.revert()
  },[])
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    stage.current?.style.setProperty('--experience-pointer-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`)
    stage.current?.style.setProperty('--experience-pointer-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 8}px`)
  }
  return (
    <section id="experience" className="experience" aria-labelledby="experience-title" onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        stage.current?.style.setProperty('--experience-pointer-x', '0px')
        stage.current?.style.setProperty('--experience-pointer-y', '0px')
      }}>
      <div className="experience__stage" ref={stage} data-open={opened?.company}>
        <h2 className="experience__heading" id="experience-title">EXPERIENCE</h2>
        <div className="experience__portrait"><div className="experience__portrait-entrance"><img src="/assets/nico/nico-about.png" alt="挑眉的 Nico" width="1086" height="1448" draggable="false" /></div></div>
        <p className="experience__bubble">下一站在哪？</p>
        {experienceEntries.map((entry, index) => <FloatingCompany key={entry.company} company={entry.company}
          imageSrc={`/assets/nico/${index === 0 ? 'jackery' : 'netease'}.png`}
          side={index === 0 ? 'left' : 'right'} active={!opened && activeCompany === entry.company} onActivate={(company) => { if (!opened) setActiveCompany(company) }}
          onOpen={(source) => { setActiveCompany(null); setOpened({ company: entry.company, source }) }}
          onDeactivate={() => setActiveCompany((current) => current === entry.company ? null : current)} />)}
        {opened && <ExperienceModal entry={experienceEntries.find((entry) => entry.company === opened.company)!} source={opened.source} onClose={closeModal} />}
      </div>
    </section>
  )
}
