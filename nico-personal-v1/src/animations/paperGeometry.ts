export type Point = [number,number]

/** Clip a sheet by nx*x + ny*y = c. Both sides share the exact crease. */
export function cutSheet(width:number,height:number,nx:number,ny:number,c:number,less:boolean):Point[]{
  const vertices:Point[]=[[0,0],[width,0],[width,height],[0,height]],out:Point[]=[]
  const distance=([x,y]:Point)=>(nx*x+ny*y-c)*(less?1:-1)
  vertices.forEach((a,i)=>{
    const b=vertices[(i+1)%4],da=distance(a),db=distance(b)
    if(da<=0)out.push(a)
    if((da<0)!==(db<0)){const t=da/(da-db);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}
  })
  return out
}
export const points=(p:Point[])=>p.map(v=>v.join(',')).join(' ')

/** Orthographic projection of paper rotated around its crease, not a flying fragment. */
export function foldMatrix(nx:number,ny:number,c:number,angle:number){
  const length=Math.hypot(nx,ny);nx/=length;ny/=length;c/=length
  const k=Math.cos(angle)-1
  return `matrix(${1+k*nx*nx} ${k*nx*ny} ${k*nx*ny} ${1+k*ny*ny} ${-k*c*nx} ${-k*c*ny})`
}
