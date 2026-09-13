import type { ExperienceEntry } from '../../data/experience'
export interface ExperienceRevealProps extends ExperienceEntry { active?: boolean }
export function ExperienceReveal({ company, role, market, description, metrics, active = false }: ExperienceRevealProps) {
  return (
    <aside id={`experience-${company.toLowerCase()}`} className="experience-reveal" data-active={active} aria-hidden={!active}>
      <p className="experience-reveal__company">{company}</p>
      {(role || market) && <p className="experience-reveal__meta">{[role, market].filter(Boolean).join(' · ')}</p>}
      {description && <p>{description}</p>}
      {!!metrics?.length && <ul>{metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>}
    </aside>
  )
}
