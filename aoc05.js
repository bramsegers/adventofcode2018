let input
    =require('fs')
    .readFileSync('input/aoc05.txt','utf8')


let a='abcdefghijklmnopqrstuvwxyz'
let A='ABCDEFGHIJKLMNOPQRSTUVWXYZ'


let part1=(s)=>{
    while(true){
        let len=s.length
        for(let i=0;i<26;i++){
            s=s.replace(a[i]+A[i],'')
            s=s.replace(A[i]+a[i],'')
        }
        if(s.length==len) return len
    }        
}


let part2=(s)=>{
    let minlen=1<<30
    for(let i=0;i<26;i++){
        let t=s.split(a[i]).join('')
               .split(A[i]).join('')
        let len=part1(t)
        if(len<minlen) minlen=len
    }
    return minlen  
}


console.log(part1(input))
console.log(part2(input))