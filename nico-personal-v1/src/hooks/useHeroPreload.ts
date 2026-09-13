import { useEffect, useState } from 'react'
import { nicoAssets } from '../data/assets'
export const heroPreloadUrls = [...new Set([nicoAssets.hero.base,nicoAssets.hero.headOpen,nicoAssets.hero.panic,...Object.values(nicoAssets.hero.eyes),...nicoAssets.hero.brainObjects.map(a=>a.src)])]
export function useHeroPreload(){
  const [state,setState]=useState({ready:false,progress:0,failed:[] as string[]})
  useEffect(()=>{
    let disposed=false,count=0,shown=0,frame=0
    const failed:string[]=[],start=performance.now()
    // Retain decoded images throughout loading so first gaze changes never decode on demand.
    const retained=heroPreloadUrls.map(url=>{const img=new Image();img.src=url;return img})
    void Promise.all(retained.map(async img=>{
      try{await img.decode()}catch{failed.push(img.src)}
      count++
    }))
    const tick=(now:number)=>{
      if(disposed)return
      const elapsed=now-start,decoded=count/retained.length*100
      const cadence=elapsed<650?elapsed/650*28:elapsed<1050?28+(elapsed-650)/400*7:35+Math.min(1,(elapsed-1050)/1150)*65
      shown=Math.max(shown,Math.min(decoded,Math.floor(cadence),failed.length?99:100))
      const ready=shown===100&&count===retained.length&&failed.length===0
      setState({ready,progress:Math.floor(shown),failed:[...failed]})
      if(!ready&&failed.length===0)frame=requestAnimationFrame(tick)
    }
    frame=requestAnimationFrame(tick)
    return()=>{disposed=true;cancelAnimationFrame(frame)}
  },[])
  return state
}
