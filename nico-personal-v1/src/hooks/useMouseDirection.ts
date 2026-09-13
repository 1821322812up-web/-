import { useEffect, useState, type RefObject } from 'react'
import type { EyeDirection } from '../data/assets'
const sectors: EyeDirection[] = ['right','down-right','down','down-left','left','up-left','up','up-right']
export const noseROI = { x: .515, y: .658, rx: .046, ry: .025 }
export const crossEyeROI = { x: .512, y: .549, rx: .027, ry: .012 }
export function useMouseDirection({enabled,targetRef}: {enabled:boolean;targetRef:RefObject<HTMLDivElement|null>}) {
  const [direction,setDirection] = useState<EyeDirection>('center')
  useEffect(()=>{
    if (!enabled) { setDirection('center'); return }
    let current:EyeDirection='center', pending:EyeDirection='center', timer=0, lastChange=0
    let lastPoint:{x:number;y:number}|null=null
    const commit=(next:EyeDirection)=>{current=next;lastChange=performance.now();setDirection(next)}
    const move=(e:PointerEvent)=>{
      if(e.pointerType==='touch'||!targetRef.current)return
      // No startup cursor sampling: only fresh pointer movement after the opening
      // timeline is allowed to change gaze. Ignore duplicate stationary events.
      if(lastPoint&&Math.hypot(e.clientX-lastPoint.x,e.clientY-lastPoint.y)<1)return
      lastPoint={x:e.clientX,y:e.clientY}
      const r=targetRef.current.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height
      const nose=((x-noseROI.x)/noseROI.rx)**2+((y-noseROI.y)/noseROI.ry)**2<1
      const cross=((x-crossEyeROI.x)/crossEyeROI.rx)**2+((y-crossEyeROI.y)/crossEyeROI.ry)**2<1
      const dx=x-.51,dy=(y-.535)*r.height/r.width,distance=Math.hypot(dx,dy)
      let next:EyeDirection='center'
      if(cross)next='cross'
      else if(!nose&&distance>(current==='center'?.14:.105)){
        const angle=(Math.atan2(dy,dx)*180/Math.PI+360)%360
        next=sectors[Math.round(angle/45)%8]
        const index=sectors.indexOf(current),delta=index<0?180:Math.abs(((angle-index*45+540)%360)-180)
        if(index>=0&&delta<28)next=current
      }
      if(next===current){clearTimeout(timer);pending=current;return}
      if(next==='cross'||current==='cross'){clearTimeout(timer);pending=next;commit(next);return}
      if(next===pending)return
      clearTimeout(timer);pending=next
      timer=window.setTimeout(()=>commit(next),Math.max(65,120-(performance.now()-lastChange)))
    }
    const leave=()=>{clearTimeout(timer);pending='center';commit('center')}
    window.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('pointerleave',leave)
    return()=>{clearTimeout(timer);window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',leave)}
  },[enabled,targetRef])
  return direction
}
