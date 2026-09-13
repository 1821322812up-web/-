import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nicoContact } from '../../data/contact'
import './Ending.css'

gsap.registerPlugin(ScrollTrigger)

export function Ending() {
  const root = useRef<HTMLElement>(null)
  const [copyStatus, setCopyStatus] = useState('')
  const statusTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 30%', once: true } })
          .from('.nico-ending__motto > span', { y: 40, opacity: 0, duration: .75, stagger:.1, ease: 'power2.out' }, 0)
          .from('.nico-ending__contacts', { opacity: 0, y: 10, duration: .5, ease: 'power2.out' }, .9)
      }, root)
      return () => context.revert()
    })
    return () => {
      media.revert()
      clearTimeout(statusTimer.current)
    }
  }, [])

  const copyNumber = async (label: string, value: string) => {
    clearTimeout(statusTimer.current)
    try {
      await navigator.clipboard.writeText(value)
      setCopyStatus(`${label}已复制`)
    } catch {
      setCopyStatus(`请手动复制${label}：${value}`)
    }
    statusTimer.current = setTimeout(() => setCopyStatus(''), 3200)
  }

  return (
    <footer className="nico-ending" id="ending" ref={root} aria-labelledby="nico-ending-motto">
      <div className="nico-ending__content">
        <h2 className="nico-ending__motto" id="nico-ending-motto">
          <span>一步步朝着</span>
          <span><em>梦想</em>前进</span>
        </h2>
        <dl className="nico-ending__contacts">
          <div className="nico-ending__contact nico-ending__contact--email">
            <dt>EMAIL</dt>
            <dd><a href={`mailto:${nicoContact.email}`}>{nicoContact.email}</a></dd>
          </div>
          <div className="nico-ending__contact">
            <dt>PHONE</dt>
            <dd><button type="button" onClick={() => void copyNumber('手机号', nicoContact.phone)} aria-label={`复制手机号 ${nicoContact.phone}`}>{nicoContact.phone}</button></dd>
          </div>
          <div className="nico-ending__contact">
            <dt>WECHAT</dt>
            <dd><button type="button" onClick={() => void copyNumber('微信号', nicoContact.wechat)} aria-label={`复制微信号 ${nicoContact.wechat}`}>{nicoContact.wechat}</button></dd>
          </div>
        </dl>
        <p className="nico-ending__copy-status" role="status" aria-live="polite">{copyStatus}</p>
      </div>
    </footer>
  )
}
