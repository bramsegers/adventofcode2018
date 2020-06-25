let bots
    =require('fs')
    .readFileSync('input/aoc23.txt','utf8')
    .split('\r\n')
    .map(e=>e.match(/[+-]?\d+/g))
    .map(e=>{
        let [x,y,z,r]=e.map(Number)
        return {x,y,z,r}
    })


let max
let strongest
let minx=Infinity, maxx=-Infinity
let miny=Infinity, maxy=-Infinity
let minz=Infinity, maxz=-Infinity


for(let b of bots){
    minx=Math.min(b.x,minx)
    maxx=Math.max(b.x,maxx)
    miny=Math.min(b.y,miny)
    maxy=Math.max(b.y,maxy)
    minz=Math.min(b.z,minz)
    maxz=Math.max(b.z,maxz)
    if(!max || b.r>max){
        max=b.r
        strongest=b
    }
}


let mandist=(a,b)=>
    Math.abs(a.x-b.x)+
    Math.abs(a.y-b.y)+
    Math.abs(a.z-b.z)


let part1
    =bots
    .filter(v=>mandist(v,strongest)<=strongest.r)
    .length

console.log(part1)


let inRangeOfVolume=(vol,bot)=>{
    let cost=0
    if(bot.x>vol.xmax)      cost+=bot.x-vol.xmax
    else if(bot.x<vol.xmin) cost+=vol.xmin-bot.x
    if(bot.y>vol.ymax)      cost+=bot.y-vol.ymax
    else if(bot.y<vol.ymin) cost+=vol.ymin-bot.y
    if(bot.z>vol.zmax)      cost+=bot.z-vol.zmax
    else if(bot.z<vol.zmin) cost+=vol.zmin-bot.z
    return cost <= bot.r
}


let nearestPoint=(vol,bot)=>{
    let x=(bot.x>vol.xmax ? vol.xmax : bot.x<vol.xmin ? vol.xmin : bot.x)
    let y=(bot.y>vol.ymax ? vol.ymax : bot.y<vol.ymin ? vol.ymin : bot.y)
    let z=(bot.z>vol.zmax ? vol.zmax : bot.z<vol.zmin ? vol.zmin : bot.z)
    return {x,y,z}
}


let botsInRange=(vol)=>{
    let set=new Set()
    for(let b of bots)
        if(inRangeOfVolume(vol,b)) set.add(b)
    return set
}


let subdivide=(vol)=>{
    if(vol.xmin===vol.xmax && vol.ymin===vol.ymax && vol.zmin===vol.zmax)
        return {xmin: vol.xmin, xmax: vol.xmax, ymin: vol.ymin, ymax: vol.ymax, zmin: vol.zmin, zmax: vol.zmax}
    let xmid=Math.floor((vol.xmax-vol.xmin)/2+vol.xmin)
    let ymid=Math.floor((vol.ymax-vol.ymin)/2+vol.ymin)
    let zmid=Math.floor((vol.zmax-vol.zmin)/2+vol.zmin)
    return [
        { xmin:vol.xmin, xmax:xmid,     ymin:vol.ymin, ymax:ymid,     zmin:vol.zmin, zmax:zmid     },
        { xmin:xmid + 1, xmax:vol.xmax, ymin:vol.ymin, ymax:ymid,     zmin:vol.zmin, zmax:zmid     },
        { xmin:vol.xmin, xmax:xmid,     ymin:ymid + 1, ymax:vol.ymax, zmin:vol.zmin, zmax:zmid     },
        { xmin:xmid + 1, xmax:vol.xmax, ymin:ymid + 1, ymax:vol.ymax, zmin:vol.zmin, zmax:zmid     },
        { xmin:vol.xmin, xmax:xmid,     ymin:vol.ymin, ymax:ymid,     zmin:zmid + 1, zmax:vol.zmax },
        { xmin:xmid + 1, xmax:vol.xmax, ymin:vol.ymin, ymax:ymid,     zmin:zmid + 1, zmax:vol.zmax },
        { xmin:vol.xmin, xmax:xmid,     ymin:ymid + 1, ymax:vol.ymax, zmin:zmid + 1, zmax:vol.zmax },
        { xmin:xmid + 1, xmax:vol.xmax, ymin:ymid + 1, ymax:vol.ymax, zmin:zmid + 1, zmax:vol.zmax },
    ]
}


let origin={x:0,y:0,z:0}
let vol={
    xmin: Math.min(minx, miny, minz),
    xmax: Math.max(maxx, maxy, maxz),
    ymin: Math.min(minx, miny, minz),
    ymax: Math.max(maxx, maxy, maxz),
    zmin: Math.min(minx, miny, minz),
    zmax: Math.max(maxx, maxy, maxz),
}
vol.inRange=botsInRange(vol)
let vols=[vol]
let best
let pmin
let dmin=Infinity


let findBest=(v1,v2)=>
    v1.inRange.size>v2.inRange.size?v1:
    v2.inRange.size>v1.inRange.size?v2:
    nearestPoint(v1,origin)<nearestPoint(v2,origin)?v1:
    nearestPoint(v2,origin)<nearestPoint(v1,origin)?v2:
    v1


while(vols.length){
    let vol
    while(vols.length){
        vol=vols.pop()
        if(vol.xmax-vol.xmin>0) break
        if(vol.ymax-vol.ymin>0) break
        if(vol.zmax-vol.zmin>0) break
        best=best?findBest(best,vol):vol 
        pmin=nearestPoint(best,origin)
        dmin=mandist(pmin,origin)
        if(best===vol)
            vols=vols
                .filter(e=>e.inRange.size>=best.inRange.size)
                .filter(e=>mandist(nearestPoint(e,origin),origin)<=dmin)
    }
    let newVols=[]
    subdivide(vol).forEach(e=>{
        e.inRange=botsInRange(e)
        if(e.inRange.size===0) return
        if(best && e.inRange.size<best.inRange.size) return
        if(best && mandist(nearestPoint(e,origin),origin)>dmin) return
        newVols.push(e)
    })
    vols=[...vols,...newVols]
    vols.sort((a,b)=>a.inRange.size-b.inRange.size)
}

console.log(dmin)