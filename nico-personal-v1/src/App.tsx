import { About } from './components/about/About'
import { Experience } from './components/experience/Experience'
import { Hero } from './components/hero/Hero'
import { useRef } from 'react'
import { ScenePaper } from './components/ScenePaper'
import { AIWorkflow } from './components/ai/AIWorkflow'
import { Ending } from './components/ending/Ending'

export function App() {
  const transition = useRef<HTMLDivElement>(null)
  const blueWorld = useRef<HTMLDivElement>(null)
  const pinkWorld = useRef<HTMLDivElement>(null)
  const darkWorld = useRef<HTMLDivElement>(null)
  const beforeEnding = useRef<HTMLDivElement>(null)
  const endingWorld = useRef<HTMLDivElement>(null)
  return (
    <><ScenePaper trigger={transition} blueWorld={blueWorld}/>
    <ScenePaper trigger={darkWorld} blueWorld={pinkWorld} reverse from="var(--nico-pink)" to="var(--nico-black)"/>
    <ScenePaper trigger={endingWorld} blueWorld={beforeEnding} vertical from="var(--nico-black)" to="var(--nico-blue)"/>
    <main className="site-shell">
      <div ref={beforeEnding}>
      <div ref={pinkWorld}>
      <div ref={blueWorld} className="blue-world">
      <Hero />
      <About />
      </div>
      <div className="experience-runway" ref={transition}>
      <Experience />
      </div>
      </div>
      <div ref={darkWorld} className="dark-world">
      <AIWorkflow />
      </div>
      </div>
      <div ref={endingWorld}><Ending /></div>
    </main></>
  )
}
