import {useEffect,useRef,useId,type RefObject} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

const paperNoise=(n:number)=>{const v=Math.sin(n*127.1+91.7)*43758.5453;return v-Math.floor(v)}
const grain=(x:number,scale:number)=>{
  const n=Math.floor(x/scale),t=x/scale-n,s=t*t*(3-2*t)
  return (paperNoise(n)*(1-s)+paperNoise(n+1)*s-.5)*2
}

/** One blue sheet over the pink world. The travelling edge is never a section border. */
export function ScenePaper({trigger,blueWorld,reverse=false,vertical=false,from='var(--nico-blue)',to='var(--nico-pink)'}:{trigger:RefObject<HTMLDivElement|null>;blueWorld:RefObject<HTMLDivElement|null>;reverse?:boolean;vertical?:boolean;from?:string;to?:string}){
  const id=useId().replace(/:/g,'')
  const root=useRef<SVGSVGElement>(null),blue=useRef<SVGPathElement>(null),back=useRef<SVGPathElement>(null)
  const edge=useRef<SVGPathElement>(null),fibers=useRef<SVGPathElement>(null)
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    const motion={p:0}
    const draw=()=>{
      const w=innerWidth,h=innerHeight,p=motion.p,t=-.25+2.5*p
      root.current?.setAttribute('viewBox',`0 0 ${w} ${h}`)
      root.current?.setAttribute('data-progress',p.toFixed(3))
      if((reverse||vertical) && root.current)root.current.style.visibility=p<=0?'hidden':'visible'
      const band=10+116*Math.sin(Math.PI*p)**1.4
      const line=Array.from({length:Math.ceil((w+400)/6)+1},(_,i)=>{
        const x=-200+i*6
        // Multi-scale non-repeating fibres, not a repeating sawtooth border.
        const noise=grain(x,85)*10+grain(x,23)*4+grain(x,7)*1.7
        return [x,h*(vertical?-.18+1.36*p:t-(reverse?1-x/w:x/w))+noise]
      })
      const path=`M ${line.map(v=>v.join(' ')).join(' L ')}`
      blue.current?.setAttribute('d',`${path} L ${w+200} ${h*4} L -200 ${h*4} Z`)
      const reverseLine=line.map(([x,y])=>[x+(reverse?-1:1)*band*.24,y+band*(.54+.42*Math.sin(Math.PI*Math.max(0,Math.min(1,x/w))))]).reverse()
      back.current?.setAttribute('d',`${path} L ${reverseLine.map(v=>v.join(' ')).join(' L ')} Z`)
      edge.current?.setAttribute('d',path)
      fibers.current?.setAttribute('d',line.filter((_,i)=>i%3===0).map(([x,y],i)=>`M ${x} ${y+2} q ${-2-paperNoise(i)*5} ${-2-paperNoise(i+31)*5} ${-3-paperNoise(i)*7} ${-3-paperNoise(i+9)*6}`).join(' '))
      root.current?.style.setProperty('--tear-back-opacity',String(Math.min(1,p*15,(1-p)*15)))
      // Contents belong to their paper world: photos cannot float over the peeled pink side.
      const world=blueWorld.current,experience=trigger.current
      if(world){
        const r=world.getBoundingClientRect()
        world.style.clipPath=p<=0?'none':p>=1?'inset(100%)':`polygon(${line.map(([x,y])=>`${x}px ${y+band-r.top}px`).join(',')},${w+200}px ${r.height}px,-200px ${r.height}px)`
      }
      if(experience){
        const r=experience.getBoundingClientRect()
        experience.style.clipPath=p>=1?'none':`polygon(${line.map(([x,y])=>`${x}px ${y-r.top}px`).join(',')},${w+200}px -2000px,-200px -2000px)`
      }
    }
    const ctx=gsap.context(()=>{
      gsap.to(motion,{p:1,ease:'none',onUpdate:draw,scrollTrigger:{trigger:trigger.current,start:'top bottom',end:'top top',scrub:.45,onRefresh:draw}})
    })
    draw();window.addEventListener('resize',draw)
    return()=>{ctx.revert();window.removeEventListener('resize',draw)}
  },[trigger,blueWorld,reverse,vertical])
  return <svg ref={root} className={`scene-paper${reverse?' scene-paper--reverse':''}${vertical?' scene-paper--vertical':''}`} preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-back`} x1="0" y1="0" x2=".5" y2="1"><stop stopColor="var(--nico-white)"/><stop offset=".72" stopColor="var(--nico-white)"/><stop offset="1" stopColor="#c9d1d2"/></linearGradient>
      <filter id={`${id}-shadow`} filterUnits="userSpaceOnUse" x="-40" y="-40" width="110%" height="110%"><feDropShadow dx={reverse?-12:12} dy="18" stdDeviation="13" floodColor="#2b2b2b" floodOpacity=".2"/></filter>
      <filter id={`${id}-fiber`}><feTurbulence type="fractalNoise" baseFrequency=".16" numOctaves="2" seed="9"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter>
    </defs>
    <rect width="100%" height="100%" fill={to}/>
    <path ref={blue} fill={from}/>
    <g style={{opacity:'var(--tear-back-opacity)'}}>
      <path ref={back} fill={`url(#${id}-back)`} filter={`url(#${id}-shadow)`}/>
      <path ref={edge} fill="none" stroke="var(--nico-white)" strokeWidth="5" filter={`url(#${id}-fiber)`}/>
      <path ref={fibers} fill="none" stroke="var(--nico-white)" strokeWidth=".85" strokeLinecap="round"/>
    </g>
  </svg>
}
