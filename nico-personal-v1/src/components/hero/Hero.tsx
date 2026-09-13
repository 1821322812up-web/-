import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nicoAssets, type EyeDirection } from '../../data/assets'
import { useHeroPreload } from '../../hooks/useHeroPreload'
import { useMouseDirection } from '../../hooks/useMouseDirection'
import { eyeRegistration } from '../../data/eye-registration'
import { DiagonalPaper, type PaperHandle } from './DiagonalPaper'
import './hero.css'
gsap.registerPlugin(ScrollTrigger)
const clamp=(v:number)=>Math.max(0,Math.min(1,v))
const scan:EyeDirection[]=['left','up-left','up','up-right','right','down-right','down','down-left','center']
const brainLabels:Record<string,string>={kol:'海外 KOL 实战经验','de-en':'德语 / 英语双语能力',ai:'AI 工作流提效'}

function followBrainLabel(event:PointerEvent<HTMLButtonElement>){
  if(event.pointerType==='touch')return
  const float=event.currentTarget.parentElement!,object=float.parentElement!
  const r=float.getBoundingClientRect(),label=float.querySelector<HTMLElement>('.brain-label')
  if(!label)return
  const face=object.closest('.head-paper')!.getBoundingClientRect()
  const half=label.offsetWidth/2,lh=label.offsetHeight
  const x=Math.max(half+12,Math.min(innerWidth-half-12,event.clientX+10))
  const y=Math.max(lh+12,Math.min(event.clientY-14,face.top+face.height*.30))
  // Convert the desired screen-space cursor position into the rotated collage layer.
  const css=getComputedStyle(object)
  const matrix=new DOMMatrixReadOnly(css.transform==='none'?undefined:css.transform)
  const angle=Math.atan2(matrix.b,matrix.a)+(parseFloat(css.rotate)||0)*Math.PI/180
  const dx=x-r.left-r.width/2,dy=y-r.top-r.height/2
  float.style.setProperty('--label-x',`${float.offsetWidth/2+dx*Math.cos(angle)+dy*Math.sin(angle)}px`)
  float.style.setProperty('--label-y',`${float.offsetHeight/2-dx*Math.sin(angle)+dy*Math.cos(angle)}px`)
}

export function Hero(){
  const root=useRef<HTMLElement>(null),head=useRef<HTMLDivElement>(null)
  const paper=useRef<PaperHandle>(null)
  const {ready,progress,failed}=useHeroPreload()
  const [entered,setEntered]=useState(false),[panic,setPanic]=useState(false),[canTrack,setCanTrack]=useState(false)
  const [openingGaze,setOpeningGaze]=useState<EyeDirection>('center')
  const tracked=useMouseDirection({enabled:entered&&canTrack&&!panic,targetRef:head})
  const direction=entered?tracked:openingGaze
  useEffect(()=>{document.body.classList.add('is-loading');return()=>document.body.classList.remove('is-loading')},[])
  useLayoutEffect(()=>{
    if(!ready)return
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx=gsap.context(()=>{
      const intro=gsap.timeline({onComplete:()=>{
        setOpeningGaze('center');setEntered(true);setCanTrack(true)
        root.current?.setAttribute('data-stage','awaiting-pointer')
        document.body.classList.remove('is-loading');ScrollTrigger.refresh()
      }})
      intro.to('.loader-number',{yPercent:-110,duration:.45,delay:.25,ease:'power3.in'})
        .to('.hero-loader',{autoAlpha:0,duration:.25},.65)
        .fromTo('.head-entrance',{y:()=>innerHeight+100,opacity:1},{y:0,opacity:1,duration:1.3,ease:'power3.out'},.85)
        .call(()=>root.current?.setAttribute('data-stage','forward'),[],1)
      scan.forEach((gaze,i)=>intro.call(()=>{setOpeningGaze(gaze);root.current?.setAttribute('data-stage',gaze==='center'?'forward-return':'scan-and-tear')},[],2.4+i*.13))
      intro.to('.cap-hinge',{rotateZ:12,rotateY:-24,yPercent:-5,xPercent:10,duration:.5,ease:'power2.out'},2.4)
        .to('.cap-hinge',{rotateZ:34,rotateY:22,x:()=>innerWidth*.85,y:()=>-innerHeight*.38,duration:.62,ease:'power2.in'},2.86)
        .to('.cap-hinge',{autoAlpha:0,duration:.15},3.36)
        .call(()=>root.current?.setAttribute('data-stage','title-and-world'),[],3.55)
        .fromTo('.hero-type',{y:45,opacity:0},{y:0,opacity:1,duration:.85,ease:'power3.out'},3.55)
        .fromTo('.brain-object',{y:110,scale:.68,opacity:0},{y:0,scale:1,opacity:1,duration:.85,stagger:.035,ease:'back.out(1.25)'},3.55)
        .to('.hero-cue',{opacity:1,duration:.4},4.4)
      if(reduced)intro.progress(1)
      const motion={p:0}
      gsap.to(motion,{p:1,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom bottom',scrub:reduced?true:.45},onUpdate:()=>{
        const p=motion.p,reveal=clamp(p/.48),fold=clamp((p-.62)/.34),departure=clamp((fold-.78)/.22)
        setPanic(fold>0);setCanTrack(p<.62)
        if(p>0)root.current?.setAttribute('data-stage',p<.48?'chin-reveal':p<.62?'full-face':p<.96?'paper-fold':'intro')
        root.current?.style.setProperty('--fold-shade',String(Math.sin(fold*Math.PI)*.22))
        const anchor=root.current?.querySelector('.head-anchor')?.getBoundingClientRect()
        const chinTravel=anchor?Math.max(0,anchor.top+anchor.height*.966-innerHeight*.92):innerHeight*.4
        gsap.set('.head-position',{y:-chinTravel*reveal,scale:1})
        gsap.set('.hero-type',{y:-innerHeight*.2*reveal,opacity:1-clamp(reveal*1.5)})
        gsap.set('.brain-pocket',{yPercent:-24*reveal,opacity:1-clamp(reveal*1.35),pointerEvents:p>.28?'none':'auto'})
        paper.current?.update(fold)
        gsap.set('.head-paper',{x:innerWidth*.3*departure**2,y:-innerHeight*.3*departure**2,scale:1,display:p>.97?'none':'block'})
        gsap.set('.hero-cue',{opacity:1-clamp(p*7)})
      }})
    },root)
    return()=>{ctx.revert();document.body.classList.remove('is-loading')}
  },[ready])
  return <section ref={root} id="hero" className="hero-section" data-ready={entered} data-direction={direction} data-panic={panic} aria-label="Hi, I'm Nico">
    <div className="hero-loader" role="status" aria-label={failed.length?'图片加载失败':`加载 ${progress}%`}>
      <div className="loader-window"><span className="loader-number" aria-hidden="true">{progress}</span></div>
      {failed.length>0&&<div className="loader-error">图片加载失败。<button onClick={()=>location.reload()}>重试加载</button></div>}
    </div>
    <div className="hero-stage">
      <h1 className="hero-type"><span>HI,</span>{' '}<span>I’M NICO.</span></h1>
      <div className="head-anchor"><div className="head-entrance"><div className="head-position"><div className="head-paper" ref={head}>
        <div className="brain-pocket" aria-label="Nico 的脑内拼贴">{nicoAssets.hero.brainObjects.map((a,i)=><div key={a.id} className={`brain-object ${i<3?'brain-primary':'brain-secondary'} ${a.className}`}>
          <div className="brain-float"><button className="brain-hover" type="button" aria-label={a.alt} aria-describedby={brainLabels[a.id]?`brain-label-${a.id}`:undefined} tabIndex={entered&&canTrack?0:-1}
            onPointerMove={brainLabels[a.id]?followBrainLabel:undefined}
            onFocus={event=>{event.currentTarget.parentElement?.style.setProperty('--label-x','50%');event.currentTarget.parentElement?.style.setProperty('--label-y','12%')}}
            ><img src={a.src} alt="" draggable="false"/></button>{brainLabels[a.id]&&<span className="brain-label" id={`brain-label-${a.id}`}>{brainLabels[a.id]}</span>}</div>
        </div>)}</div>
        <div className="live-face" style={{display:panic?'none':'block'}}>
          <img className="canonical-face" src={nicoAssets.hero.base} alt="Nico" draggable="false"/>
          {[0,1].map(side=><div key={side} className={`eye-windows eye-window--${side}`} aria-hidden="true">
            {(Object.keys(eyeRegistration) as Exclude<EyeDirection,'center'>[]).map(key=>{const [x,y]=eyeRegistration[key][side];return <img key={key} className={`eye-state eye-state--${key}`} src={nicoAssets.hero.eyes[key]} alt="" data-active={direction===key} style={{transform:`translate(${x/10.86}%,${y/14.48}%)`}} draggable="false"/>})}
          </div>)}
          <img className="fixed-rim" src={nicoAssets.hero.headOpen} alt="" aria-hidden="true"/>
        </div>
        <div className="cap-hinge"><img className="head-cap" src={nicoAssets.hero.base} alt="" aria-hidden="true"/></div>
        <div className="panic-paper" style={{visibility:panic?'visible':'hidden'}} aria-hidden="true">
          <DiagonalPaper ref={paper}/>
        </div>
      </div></div></div></div>
      <p className="hero-cue">SCROLL TO EXPLORE <span>↓</span></p>
    </div>
  </section>
}
