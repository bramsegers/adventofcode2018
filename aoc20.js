let input
    =require('fs')
    .readFileSync('input/aoc20.txt','utf8')
    .split('')


class Map {
    constructor()   {this.rows={}}
    row(y)          {return this.rows[y] || (this.rows[y]={})}
    add(node)       {this.set(node.x,node.y,node)}
    get(x,y)        {return this.row(y)[x] || {x,y,dist:1e100}}
    set(x,y,node)   {this.row(y)[x]=node}
}


let node={x:0,y:0,dist:0}
let stack=[node]
let map=new Map()


let add=(dx,dy)=>{
    let n=map.get(node.x+dx,node.y+dy)
    n.dist=Math.min(n.dist,node.dist+1)
    map.add(n)
    node=n
}


for(let c of input){
    if(c=='N') add(0,-1)
    if(c=='S') add(0,1)
    if(c=='E') add(1,0)
    if(c=='W') add(-1,0)
    if(c=='(') stack.push(node)
    if(c==')') node=stack.pop()
    if(c=='|') node=stack[stack.length-1]
}


let dists=[]
for(let r in map.rows)
    for(let k in map.rows[r])
        dists.push(map.rows[r][k].dist)


let part1=Math.max(...dists)
let part2=dists.filter(d=>d>=1000).length
console.log({part1,part2})