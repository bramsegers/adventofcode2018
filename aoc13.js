const array=require('./array')


let input
    =require('fs')
    .readFileSync('input/aoc13.txt','utf8')
    .split('\r\n')


let dir=(c)=>{
    if(maze[c.j][c.i]=='-')  return [-1, 1,-1, 3][c.d]
    if(maze[c.j][c.i]=='|')  return [ 0,-1, 2,-1][c.d]
    if(maze[c.j][c.i]=='/')  return [ 1, 0, 3, 2][c.d]
    if(maze[c.j][c.i]=='\\') return [ 3, 2, 1, 0][c.d]
    c.di=(c.di+1)%3
    if(c.di==0) return [1,2,3,0][c.d]
    if(c.di==1) return [3,0,1,2][c.d]
    if(c.di==2) return [0,1,2,3][c.d]
}


let move=(c)=>{
    c.d=dir(c)
    if(c.d==0) c.j--
    if(c.d==1) c.i++
    if(c.d==2) c.j++
    if(c.d==3) c.i--
}


let S=input.length
let maze=array([S,S])
let carts=[]
for(let j=0;j<S;j++){
    for(let i=0;i<S;i++){
        maze[j][i]=input[j][i]
        if(maze[j][i]=='^') {maze[j][i]='|';carts.push({i,j,d:0,di:0})}
        if(maze[j][i]=='>') {maze[j][i]='-';carts.push({i,j,d:1,di:0})}
        if(maze[j][i]=='v') {maze[j][i]='|';carts.push({i,j,d:2,di:0})}
        if(maze[j][i]=='<') {maze[j][i]='-';carts.push({i,j,d:3,di:0})}
    }
}
for(let tick=0;carts.length>1;tick++){
    carts.sort((a,b)=>(a.j==b.j)?(a.i-b.i):(a.j-b.j))
    let occ=array([S,S])
    for(let c of carts)
        occ[c.j][c.i]=c
    let remove=[]
    for(let c of carts){
        occ[c.j][c.i]=null
        move(c)
        if(!occ[c.j][c.i])
            occ[c.j][c.i]=c
        else{
            remove.push(c)
            remove.push(occ[c.j][c.i])
            console.log('Crash at: (%d,%d)',c.i,c.j)
        }
    }
    carts=carts.filter(e=>!remove.includes(e))
}
console.log('Remaining cart at: (%d,%d)',carts[0].i,carts[0].j)