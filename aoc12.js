let input
    =require('fs')
    .readFileSync('input/aoc12.txt','utf8')
    .split('\r\n')


let solve=(G)=>{
    let state=input[0].split(' ')[2]
    let rules=[]
    for(let i of input.slice(2)){
        let [a,b]=i.split(' => ')
        rules[a]=b
    }
    let plants, last
    for(let gen=1;gen<=G;gen++){
        let next=''
        let key='.....'
        state=key+state+key
        for(let j=0;j<state.length-5;j++)
            next+=rules[state.substring(j,j+5)]
        plants=0
        for(let i=0;i<next.length;i++)
            if(next[i]=='#') plants+=i-3*gen
        console.log({gen,plants,incr:plants-last})
        last=plants
        state=next
    }
    return plants
}


let part1=solve(20)


// solve(200)
// generation 112: population: 3033
// after that, population increases by 23 every generation
let part2=3033+(50000000000-112)*23


console.log(part1)
console.log(part2)