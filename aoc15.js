const array=require('./array')


let input
    =require('fs')
    .readFileSync('input/aoc15.txt','utf8')
    .split('\r\n')
    .map(e=>e.split(''))


let H=input.length
let W=input[0].length


let population,maze


function* adjac(p){
    yield {y:p.y-1,x:p.x  }
    yield {y:p.y  ,x:p.x-1}
    yield {y:p.y  ,x:p.x+1}
    yield {y:p.y+1,x:p.x  }
}


let bfs=(from)=>{
    let q=[{y:from.y, x:from.x, d:0}]
    let seen=array([H,W],Infinity)
    seen[from.y][from.x]=0
    while(q.length){
        let n=q.shift()
        for(let {y,x} of adjac(n)){
            let p={y,x,d:n.d+1}
            let v=seen[y][x]==Infinity && maze[y][x]=='.'
            if(v) {seen[y][x]=n.d+1;q.push(p)}
        }
    }
    return seen  
}


let move=(p)=>{
    let targets=population.filter(e=>e.type!=p.type).filter(e=>!e.died)
    if(!targets.length) return {msg:'no enemy',action:'end combat'}
    let set=[]
    let in_range=false
    for(let t of targets){
        for(let {y,x} of adjac(t)){
            if(y==p.y && x==p.x) in_range=true
            if(maze[y][x]=='.') set[[y,x]]={y,x}
        }
    }
    let consider=Object.values(set)
    if(!in_range && !consider.length) return {msg:'no range',action:'end turn'}
    if(in_range) return {msg:'unit already in range of target',action:'attack'}
    let dist=bfs(p)
    for(let c of consider){
        c.dist=dist[c.y][c.x]
    }
    let chosen
        =consider
        .sort((a,b)=>{
            let dd=a.dist-b.dist
            let dy=a.y-b.y
            let dx=a.x-b.x
            return dd?dd:dy?dy:dx
        })[0]
    if(chosen.dist==Infinity) return {msg:'no reachable squares in range',action:'end turn'}
    dist=bfs(chosen)
    let movex,movey,minsteps=Infinity
    for(let {y,x} of adjac(p)){
        if(dist[y][x]<minsteps){
            minsteps=dist[y][x]
            movex=x
            movey=y
        }
    }
    //console.log('unit',p)
    //console.log('consider',consider)
    //console.log('chosen',chosen)
    //console.log('minsteps',minsteps)
    //console.log('move',movey,movex)
    if(minsteps==Infinity) return {msg:'should not happen',action:'end combat'}
    maze[p.y][p.x]='.'
    maze[movey][movex]=p.type
    p.y=movey
    p.x=movex
    return {msg:'unit moved',action:'attack'}
}


let attack=(p)=>{
    let targets=[]
    for(let {y,x} of adjac(p)){
        let target
            =population
            .filter(e=>e.type!=p.type)
            .filter(e=>!e.died)
            .filter(e=>e.y==y)
            .filter(e=>e.x==x)[0]
        if(target) targets.push(target)
    }
    if(!targets.length) return {msg:'no targets in range',action:'end turn'}
    let target
        =targets
        .sort((a,b)=>{
            let dh=a.hit-b.hit
            let dy=a.y-b.y
            let dx=a.x-b.x
            return dh?dh:dy?dy:dx
        })[0]
    //console.log(target)
    target.hit-=p.attack
    if(target.hit<=0){
        target.died=true
        maze[target.y][target.x]='.'
        if(target.type=='E') return {msg:'elf died'}
    }
    return {}
}


let print=()=>{
    for(let y=0;y<H;y++){
        let out=maze[y].join('')
        let q=population
            .filter(e=>e.y==y)
            .filter(e=>!e.died)
            .sort((a,b)=>a.x-b.x)
            .map(e=>e.type+'('+e.hit+')')
        out+='  '+q.join(' ')
        console.log(out)
    }
    console.log()
}


let battle=(atk={E:3,G:3},part2=false)=>{

    maze=JSON.parse(JSON.stringify(input))
    population=[]
    for(let h=0;h<H;h++){
        for(let  w=0;w<W;w++){
            let type=maze[h][w]
            if('EG'.includes(type)){
                population.push({
                    type,
                    y:h,
                    x:w,
                    attack:atk[type],
                    hit:200
                })
            }
        }
    }

    for(let i=1;;i++){

        population.sort((a,b)=>{
            let dy=a.y-b.y
            let dx=a.x-b.x
            return dy?dy:dx   
        })

        for(let p of population){
            if(p.died) continue    
            let m=move(p)
            if(m.action=='end combat'){
                let outcome=(i-1)
                    *population
                    .filter(e=>!e.died)
                    .map(e=>e.hit)
                    .reduce((a,b)=>a+b)
                let winner=p.type
                let attack=p.attack
                return {winner,outcome,attack}
            }
            if(m.action=='attack'){
                let a=attack(p)
                if(part2 && a.msg=='elf died') return {winner:'G'}
            }   
        }
        //print()
    }
}


// part 1
console.log(battle())


// part 2
for(let e=3;;e++){
    let b=battle({E:e,G:3},true)
    if(b.winner!='E') continue
    console.log(b)
    break
}