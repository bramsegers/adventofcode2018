const array=require('./array')


let input={players:458, marble:72019}


let solve=(P,M)=>{
    let root={value:0}
    root.left=root
    root.right=root
    let n=root
    let score=array(P+1,0)
    for(let p=1,v=1;v<=M;v++){
        if(v%23==0){
            n=n.left.left.left.left.left.left
            n.left.right=n.right
            //n.right.left=n.left
            score[p]+=v+n.value
        }else{
            n=n.right.right
            let t={value:v}
            let u=n.right
            n.right=t
            u.left=t
            t.left=n
            t.right=u
        }
        if(++p>P) p=1
    }
    console.log(Math.max(...score))
}


solve(input.players,input.marble)
solve(input.players,input.marble*100)