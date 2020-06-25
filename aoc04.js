const array=require('./array')


let input
    =require('fs')
    .readFileSync('input/aoc04.txt','utf8')
    .split('\r\n')
    .sort()

    
let shifts=[]
let prevminute
let currentguard
for(let i of input){
    let minute=i.substring(15,17)|0
    if(i.includes('Guard'))
        currentguard=i.split(' ')[3]
    if(i.includes('wakes up')){
        if(!shifts[currentguard]) 
            shifts[currentguard]=array(60,0)
        for(let m=prevminute;m<minute;m++) 
            shifts[currentguard][m]++
    } 
    prevminute=minute
}


let m=Object
    .entries(shifts)
    .map(([key,val])=>{return {
        guard: key.substring(1),
        sum:   val.reduce((a,b)=>a+b),
        maxs:  Math.max(...val),
        maxm:  val.indexOf(Math.max(...val))
    }})


let part1=m.reduce((a,b)=>a.sum>b.sum?a:b)
let part2=m.reduce((a,b)=>a.maxs>b.maxs?a:b)


console.log(part1.guard*part1.maxm)
console.log(part2.guard*part2.maxm)