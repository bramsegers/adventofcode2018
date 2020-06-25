let points
    =require('fs')
    .readFileSync('input/aoc25.txt','utf8')
    .split('\r\n')
    .map(e=>{
        let s=e.split(',')
        let [x,y,z,t]=s.map(Number)
        return {x,y,z,t}
    })    


let mandist=(p,q)=>
    Math.abs(p.x-q.x)+
    Math.abs(p.y-q.y)+
    Math.abs(p.z-q.z)+
    Math.abs(p.t-q.t)


let groups=0
while(points.length){
    let group=[points.pop()]
    while(points.length){
        let found=false
        for(let i=points.length-1;i>=0;i--){
            if(group.some(e=>mandist(e,points[i])<=3)){
                group.push(points[i])
                points.splice(i,1)
                found=true
            }
        }
        if(!found) break
    }
    groups++
}
console.log(groups)