export interface FloatingCompanyProps {
  company: string
  imageSrc: string
  side: 'left' | 'right'
  active: boolean
  onOpen: (source: HTMLButtonElement) => void
  onActivate: (company: string) => void
  onDeactivate: () => void
}
export function FloatingCompany({ company, imageSrc, side, active, onOpen, onActivate, onDeactivate }: FloatingCompanyProps) {
  return (
    <button className={`floating-company floating-company--${side}`} type="button"
      aria-label={`${company} 经历`} aria-haspopup="dialog" data-active={active}
      onPointerEnter={(event) => { if (event.pointerType !== 'touch') { event.currentTarget.style.setProperty('--hint-x','0px'); event.currentTarget.style.setProperty('--hint-y','0px'); onActivate(company) } }}
      onPointerMove={(event) => {
        if (event.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const bounds = event.currentTarget.getBoundingClientRect()
        const clamp = (value: number) => Math.max(-1, Math.min(1, value))
        event.currentTarget.style.setProperty('--hint-x', `${clamp((event.clientX - bounds.left) / bounds.width * 2 - 1) * 8}px`)
        event.currentTarget.style.setProperty('--hint-y', `${clamp((event.clientY - bounds.top) / bounds.height * 2 - 1) * 5}px`)
      }}
      onPointerLeave={(event) => { if (document.activeElement !== event.currentTarget) onDeactivate() }}
      onFocus={() => onActivate(company)} onBlur={(event) => { if (!event.currentTarget.matches(':hover')) onDeactivate() }}
      onClick={(event) => onOpen(event.currentTarget)} onKeyDown={(event) => { if (event.key === 'Escape') onDeactivate() }}>
      <span className="floating-company__orbit"><img className="floating-company__image" src={imageSrc} alt="" width="1254" height="1254" draggable="false" /></span>
      <span className="floating-company__hint" aria-hidden="true">{side === 'left' ? '点我看看' : '这里有我的故事'}</span>
      <svg className={`floating-company__energy floating-company__energy--${side}`} viewBox="0 0 240 240" aria-hidden="true">{side === 'left' ? <><path d="M47 82l-12 25 19-4-12 31M187 75l13 23-18 1 13 29M73 170l-8 16 13-2-8 20"/><path d="M72 51l-6-12M180 160l11 10"/></> : <><ellipse cx="120" cy="124" rx="94" ry="64"/><ellipse cx="120" cy="124" rx="106" ry="77"/></>}</svg>
    </button>
  )
}
