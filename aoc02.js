let input
    =require('fs')
    .readFileSync('input/aoc02.txt','utf8')
    .split('\r\n')


let part1=()=>{
    let f2=0,f3=0
    for(let i of input){
        let freq=[]
        for(let j of i)
            freq[j]=(freq[j]|0)+1
        let f=Object.values(freq)
        f2+=f.includes(2)
        f3+=f.includes(3)
    }
    return f2*f3
}


let part2=()=>{
    for(let i=0;i<input.length;i++){
        for(let j=i+1;j<input.length;j++){
            let a=input[i]
            let b=input[j]
            let diff=0
            let common=''
            for(let k=0;k<a.length;k++)
                if(a[k]!=b[k]) diff++
                else common+=a[k]
            if(diff==1) return common
        }
    }
}


console.log(part1())
console.log(part2())