let input
    =require('fs')
    .readFileSync('input/aoc01.txt','utf8')
    .split('\r\n')
    .map(Number)


let part1=()=>input.reduce((a,b)=>a+b)


let part2=()=>{
    for(let freq=0,seen=[];;){
        for(let i of input){
            freq+=i
            if(seen[freq]) return freq
            seen[freq]=1
        }
    }
}


console.log(part1())
console.log(part2())