const array=require('./array')



let input
    =require('fs')
    .readFileSync('input/aoc06.txt','utf8')
    .split('\r\n')
    .map(e=>{
        let [x,y]=e.split(',').map(Number)
        return {x,y}
    })



let part1=()=>{
    let k=0
    let M=500
    let S=1500
    let dist=array([S,S],0)
    let ownr=array([S,S],0)
    for(let c of input){
        for(let j=0;j<S;j++){
            for(let i=0;i<S;i++){
                let d=Math.abs(M+c.y-j)
                     +Math.abs(M+c.x-i)
                if(!k || d<dist[j][i]){
                    dist[j][i]=d
                    ownr[j][i]=k
                }
            }
        }
        k++
    }
    let occ=array(k,0)
    for(let j=0;j<S;j++)
        for(let i=0;i<S;i++)
            occ[ownr[j][i]]++
    return occ
        .filter(e=>e<10000)
        .reduce((a,b)=>a>b?a:b)
}



let part2=()=>{
    let S=1500
    let dist=array([S,S],0)
    for(let c of input){
        for(let j=0;j<S;j++){
            for(let i=0;i<S;i++){
                let d=Math.abs(c.y-j)
                     +Math.abs(c.x-i)
                dist[j][i]+=d
            }
        }
    }
    return dist
        .flat()
        .filter(e=>e<10000)
        .length
}



console.log(part1())
console.log(part2())