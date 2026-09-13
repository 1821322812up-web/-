import { forwardRef,useImperativeHandle,useRef } from 'react'
import { nicoAssets } from '../../data/assets'
import { cutSheet,points,foldMatrix } from '../../animations/paperGeometry'
export interface PaperHandle { update:(progress:number)=>void }

export const DiagonalPaper=forwardRef<PaperHandle>(function DiagonalPaper(_,ref){
  const front=useRef<SVGPolygonElement>(null),back=useRef<SVGPolygonElement>(null)
  const folded=useRef<SVGGElement>(null),crease=useRef<SVGLineElement>(null),shade=useRef<SVGLinearGradientElement>(null)
  useImperativeHandle(ref,()=>({update(p){
    const c=1448*(.745-p*1.02),nx=-.55,ny=1
    front.current?.setAttribute('points',points(cutSheet(1086,1448,nx,ny,c,true)))
    back.current?.setAttribute('points',points(cutSheet(1086,1448,nx,ny,c,false)))
    folded.current?.setAttribute('transform',foldMatrix(nx,ny,c,(108+42*Math.sin(p*Math.PI/2))*Math.PI/180))
    crease.current?.setAttribute('y1',String(c));crease.current?.setAttribute('y2',String(c+.55*1086))
    shade.current?.setAttribute('y1',String(c));shade.current?.setAttribute('y2',String(c+200))
  }}),[])
  return <svg className="diagonal-paper" viewBox="0 0 1086 1448" aria-hidden="true">
    <defs>
      <clipPath id="paper-remaining"><polygon ref={front} points="0,0 1086,0 1086,1448 0,1448"/></clipPath>
      <clipPath id="paper-turned"><polygon ref={back}/></clipPath>
      <mask id="paper-silhouette" maskUnits="userSpaceOnUse" x="0" y="0" width="1086" height="1448" style={{maskType:'alpha'}}><image href={nicoAssets.hero.headOpen} width="1086" height="1448"/></mask>
      <linearGradient id="paper-reverse-shade" ref={shade} gradientUnits="userSpaceOnUse" x1="0" y1="1000" x2="-110" y2="1200"><stop stopColor="#adb3ae"/><stop offset=".06" stopColor="#dce0d8"/><stop offset=".2" stopColor="var(--nico-white)"/><stop offset="1" stopColor="var(--nico-white)"/></linearGradient>
      <linearGradient id="paper-rim-fade" x2="0" y2="1"><stop offset=".44" stopColor="white"/><stop offset=".5" stopColor="black"/></linearGradient>
      <mask id="paper-rim"><rect width="1086" height="1448" fill="url(#paper-rim-fade)"/></mask>
      <filter id="paper-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="-4" dy="10" stdDeviation="8" floodColor="#2b2b2b" floodOpacity=".22"/></filter>
    </defs>
    <g clipPath="url(#paper-remaining)" mask="url(#paper-silhouette)">
      <image href={nicoAssets.hero.panic} width="1086" height="1448"/>
      <image href={nicoAssets.hero.headOpen} width="1086" height="1448" mask="url(#paper-rim)"/>
    </g>
    <g ref={folded} filter="url(#paper-shadow)"><g clipPath="url(#paper-turned)" mask="url(#paper-silhouette)">
      <rect width="1086" height="1448" fill="url(#paper-reverse-shade)"/>
      <line ref={crease} x1="0" x2="1086" stroke="var(--nico-white)" strokeWidth="3"/>
    </g></g>
  </svg>
})
