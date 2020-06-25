let input
    =require('fs')
    .readFileSync('input/aoc16.txt','utf8')
    .split('\r\n')


let ops=[
    { name:'addr', op:(a,b)=>register[a]+register[b]        },
    { name:'addi', op:(a,b)=>register[a]+b                  },
    { name:'mulr', op:(a,b)=>register[a]*register[b]        },
    { name:'muli', op:(a,b)=>register[a]*b                  },
    { name:'banr', op:(a,b)=>register[a]&register[b]        },
    { name:'bani', op:(a,b)=>register[a]&b                  },
    { name:'borr', op:(a,b)=>register[a]|register[b]        },
    { name:'bori', op:(a,b)=>register[a]|b                  },
    { name:'setr', op:(a,b)=>register[a]                    },
    { name:'seti', op:(a,b)=>a                              },
    { name:'gtir', op:(a,b)=>a>register[b]?1:0              },
    { name:'gtri', op:(a,b)=>register[a]>b?1:0              },
    { name:'gtrr', op:(a,b)=>register[a]>register[b]?1:0    },
    { name:'eqir', op:(a,b)=>a==register[b]?1:0             },
    { name:'eqri', op:(a,b)=>register[a]==b?1:0             },
    { name:'eqrr', op:(a,b)=>register[a]==register[b]?1:0   }
]


ops.forEach(o=>{
    o.valid=new Array(ops.length).fill(true)
    o.done=false
})


let line
let register
let part1=0
let part2=0


for(line=0;input[line]!='';line+=4){
    let before=input[line].match(/\d+/g).map(Number)
    let after=input[line+2].match(/\d+/g).map(Number)
    let [k,a,b,c]=input[line+1].match(/\d+/g).map(Number)
    let valid=0
    for(let o of ops){
        register=[...before]
        register[c]=o.op(a,b)
        if(''+register==after) valid++
        else o.valid[k]=false
    }
    part1+=(valid>=3)
}


for(let todo=ops;todo.length;){
    for(let k=0;k<ops.length;k++){
        let ops_k=ops.filter(e=>e.valid[k])
        if(ops_k.length>1) continue
        for(let i=0;i<ops.length;i++)
            ops_k[0].valid[i]=(i==k)
        ops_k[0].done=true
        todo=todo.filter(e=>!e.done)
    }
}


ops.sort((a,b)=>{
    let ia=a.valid.indexOf(true)
    let ib=b.valid.indexOf(true)
    return ia-ib
})


register=[0,0,0,0]
for(line+=2;line<input.length;line++){
    let [k,a,b,c]=input[line].match(/\d+/g).map(Number)
    register[c]=ops[k].op(a,b)
}
part2=register[0]


console.log(part1)
console.log(part2)