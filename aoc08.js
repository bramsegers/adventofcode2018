let input
    =require('fs')
    .readFileSync('input/aoc08.txt','utf8')
    .split(' ')
    .map(Number)


let index=0
let part1=0
let part2=0


let parse=()=>{
    let subtrees=input[index++]
    let metadata=input[index++]
    let sum=0
    if(subtrees==0)
        for(let m=0;m<metadata;m++){
            let i=input[index++]
            part1+=i
            sum+=i
        }
    else{
        let values=[]
        for(let s=0;s<subtrees;s++)
            values.push(parse())
        for(let m=0;m<metadata;m++){
            let i=input[index++]
            part1+=i
            if(i>=1 && i<=values.length)
                sum+=values[i-1]
        }
    }
    return part2=sum
}


parse()


console.log(part1)
console.log(part2)