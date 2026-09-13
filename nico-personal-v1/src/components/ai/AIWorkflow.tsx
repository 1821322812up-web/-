import {useEffect,useLayoutEffect,useRef,useState,type PointerEvent} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {aiAbilities} from '../../data/aiAbilities'
import './AIWorkflow.css'
export function AIWorkflow(){
 const root=useRef<HTMLElement>(null),robot=useRef<HTMLImageElement>(null),list=useRef<HTMLDivElement>(null)
 const follow=useRef<((x:number,y:number)=>void)|null>(null)
 const [active,setActive]=useState<number|null>(null),[shown,setShown]=useState<number|null>(null),[ready,setReady]=useState(false)
 const reaction=useRef<HTMLDivElement>(null),generation=useRef(0),previous=useRef<number|null>(null)
 useEffect(()=>{let mounted=true;Promise.all(aiAbilities.flatMap(a=>a.reaction?[a.reaction.face,a.reaction.gesture]:[]).map(src=>{const image=new Image();image.src=src;return image.decode()})).then(()=>{if(mounted)setReady(true)}).catch(()=>{});return()=>{mounted=false}},[])
 useLayoutEffect(()=>{
  gsap.registerPlugin(ScrollTrigger)
  const ctx=gsap.context(()=>{
   if(matchMedia('(prefers-reduced-motion: reduce)').matches)return
   gsap.from('.ai-interaction',{opacity:0,y:40,duration:.75,ease:'power2.out',scrollTrigger:{trigger:root.current,start:'top 55%',once:true}})
   gsap.from('.ai-statement__line',{opacity:0,y:40,duration:.75,stagger:.1,ease:'power2.out',scrollTrigger:{trigger:'.ai-statement',start:'top 75%',once:true}})
   const x=gsap.quickTo(robot.current,'x',{duration:.65,ease:'power3.out'}),y=gsap.quickTo(robot.current,'y',{duration:.65,ease:'power3.out'}),r=gsap.quickTo(robot.current,'rotation',{duration:.8,ease:'power3.out'})
   follow.current=(px,py)=>{x(px);y(py);r(px*.055)}
  },root);return()=>{follow.current=null;ctx.revert()}
 },[])
 const moveRobot=(e:PointerEvent<HTMLDivElement>)=>{if(e.pointerType==='touch')return;const b=e.currentTarget.getBoundingClientRect();follow.current?.(((e.clientX-b.left)/b.width-.5)*Math.min(220,b.width*.3),((e.clientY-b.top)/b.height-.5)*120)}
 useLayoutEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,titles=root.current?.querySelectorAll<HTMLElement>('.ai-row h3'),old=previous.current
  if(old!==null&&old!==active&&titles){gsap.killTweensOf(titles[old]);gsap.set(titles[old],{clearProps:'color'});if(!reduced)gsap.timeline().set(titles[old],{color:'var(--nico-pink)'},.2).to(titles[old],{color:'var(--nico-white)',duration:.22,ease:'power1.out'},.33).set(titles[old],{clearProps:'color'})}
  if(active!==null&&titles){gsap.killTweensOf(titles[active]);gsap.set(titles[active],{clearProps:'color'})}
  previous.current=active;const token=++generation.current
  gsap.to(reaction.current,{opacity:0,y:10,duration:reduced?0:active===null?.14:.065,overwrite:true,onComplete:()=>{if(generation.current===token)setShown(ready?active:null)}})
  return()=>{gsap.killTweensOf(reaction.current)}
 },[active,ready])
 useLayoutEffect(()=>{
  if(shown===null)return
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
  const align=()=>{const row=list.current?.querySelectorAll<HTMLElement>('.ai-row')[shown];if(row&&reaction.current&&list.current){reaction.current.style.top=`${row.getBoundingClientRect().top-list.current.getBoundingClientRect().top}px`;reaction.current.style.height=`${row.offsetHeight}px`}}
  align();window.addEventListener('resize',align)
  const ctx=gsap.context(()=>{
   gsap.fromTo(reaction.current,{opacity:0,y:14},{opacity:1,y:0,duration:reduced?0:.22})
   gsap.fromTo('.ai-reaction__face',{y:35,rotation:-2},{y:0,rotation:0,duration:reduced?0:.32,ease:'power2.out'})
   gsap.fromTo('.ai-reaction__hand--left',{x:-24,rotation:-5},{x:0,rotation:0,duration:reduced?0:.32})
   gsap.fromTo('.ai-reaction__hand--right',{x:24,rotation:5},{x:0,rotation:0,duration:reduced?0:.32})
  },reaction);return()=>{ctx.revert();window.removeEventListener('resize',align)}
 },[shown])
 useEffect(()=>{const e=root.current;return()=>{e?.querySelectorAll('.ai-row h3').forEach(t=>gsap.killTweensOf(t))}},[])
 const pair=shown===null?null:aiAbilities[shown].reaction
 return <section id="ai-workflow" className="ai-workflow" ref={root} aria-label="AI 营销工作流" data-assets-ready={ready}>
  <div className="ai-hero"><div className="ai-interaction" aria-label="AI 机器人互动区域" onPointerMove={moveRobot} onPointerLeave={()=>follow.current?.(0,0)}><span className="ai-monogram" aria-hidden="true">AI</span><img className="ai-robot" ref={robot} src="/assets/nico/ai.png" alt="Nico 的 AI 机器人" draggable={false}/></div></div>
  <h2 className="ai-statement"><span className="ai-statement__line">我如何让 <em>AI</em></span><span className="ai-statement__line">真正服务于营销。</span></h2>
  <div className="ai-list" ref={list} onPointerLeave={e=>{if(e.pointerType!=='touch')setActive(null)}}>
   <ol>{aiAbilities.map((ability,index)=><li key={ability.id}><div className="ai-row" tabIndex={0} data-active={active===index} onPointerEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)} onBlur={()=>setActive(null)}><span className="ai-row__paper" aria-hidden="true"/><span className="ai-row__index">{ability.id}</span><h3>{ability.title}</h3><p>{ability.description}</p></div></li>)}</ol>
   <div className="ai-reaction" ref={reaction} aria-hidden="true" data-row={shown}>{pair&&<><img className="ai-reaction__face" src={pair.face} alt=""/>{(['left','right'] as const).map(side=><svg key={side} className={`ai-reaction__hand ai-reaction__hand--${side}`} viewBox="0 0 836 941"><image href={pair.gesture} width="1672" height="941" x={side==='left'?0:-836}/></svg>)}</>}</div>
  </div>
 </section>
}
