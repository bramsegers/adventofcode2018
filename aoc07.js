const array=require('./array')


let abc='ABCDEFGHIJKLMNOPQRSTUVWXYZ'


let input
    =require('fs')
    .readFileSync('input/aoc07.txt','utf8')
    .split('\r\n')
    .map(e=>{return {
        a: abc.indexOf(e.split(' ')[1]),
        b: abc.indexOf(e.split(' ')[7])
    }})




let part1=()=>{
    let N=abc.length
    let state=array([N,N],0)
    for(let s of input)
        state[s.b][s.a]=1
    let done=''
    let mask=array(N,0)
    for(let k=0;k<N;k++){
        let i=0
        while(mask[i] || state[i].includes(1)) i++
        mask[i]=1
        for(let j=0;j<N;j++)
            state[j][i]=0
        done+=abc[i]
        
    }
    console.log(done)
}



let part2=()=>{
    let N=abc.length
    let W=5
    let workers=[]
    let instructions=[]
    for(let i=0;i<N;i++)
        instructions[i]={
            name:abc[i],
            done:0,
            needed:61+i,
            parents:[],
            finished:false,
            taken:false
        }    
    for(let s of input)
        instructions[s.b]
        .parents
        .push(instructions[s.a])    
    let total
    let result=''
    for(total=0;result.length<N;total++){
        for(let i of instructions){
            if(i.finished) continue
            if(i.taken) continue
            if(!i.parents.every(e=>e.finished)) continue
            for(let w=0;w<W;w++){
                if(!workers[w]){
                    workers[w]=i
                    workers[w].taken=true
                    break
                }
            }            
        }
        for(let w=0;w<W;w++){
            let wrk=workers[w]
            if(!wrk) continue
            if(++wrk.done==wrk.needed){
                wrk.finished=true
                wrk.taken=false
            }
            if(wrk.finished){
                result+=wrk.name
                workers[w]=null
            }            
        }
    }
    console.log(result,total)
}



part1()
part2()