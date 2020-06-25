const array=require('./array')


let input
    =require('fs')
    .readFileSync('input/aoc03.txt','utf8')
    .split('\r\n')
    .map(e=>e.match(/\d+/g))
    .map(e=>{
        let [id,x,y,w,h]=e.map(Number)
        return {id,x,y,w,h}
    })


let a=array([1000,1000],0)
for(let c of input)
    for(let j=c.y;j<c.y+c.h;j++)
        for(let i=c.x;i<c.x+c.w;i++)
            a[j][i]++


let part1=()=>{
    let c=0
    for(let j=0;j<1000;j++)
        for(let i=0;i<1000;i++)
            if(a[j][i]>1) c++
    return c
}


let part2=()=>{
    let overlap=(c)=>{
        for(let j=c.y;j<c.y+c.h;j++)
            for(let i=c.x;i<c.x+c.w;i++)
                if(a[j][i]>1) return true
    }
    return input.filter(e=>!overlap(e)).map(e=>e.id)
}


console.log(part1())
console.log(part2())