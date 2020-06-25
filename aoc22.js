let depth=7740
let tx=12
let ty=763
let grid={}

/*
type
0 = rocky   (eqpm: 1,2)
1 = wet     (eqpm: 0,2)
2 = narrow  (eqpm: 0,1)

equipment
0 = neither (type: 1,2)
1 = torch   (type: 0,2)
2 = climb   (type: 0,1)
*/


for(let y=0;y<=ty+20;y++){
    for(let x=0;x<=tx+20;x++){
        let geo
            =(x==0  && y==0 ) ? 0
            :(x==tx && y==ty) ? 0
            :(y==0) ? x*16807
            :(x==0) ? y*48271
            :grid[[x-1,y]].ero * grid[[x,y-1]].ero
        let ero=(geo+depth)%20183
        let type=+ero%3
        grid[[x,y]]={x,y,geo,ero,type}
    }
}


let part1
    =Object
    .values(grid)
    .filter(e=>e.x<=tx)
    .filter(e=>e.y<=ty)
    .map(e=>e.type)
    .reduce((a,b)=>a+b)

console.log(part1)


let bfs=(p0,p1)=>{
    let seen=[]
    let q=[]
    seen[p0]=0
    q.push([...p0,0])
    while(q.length){
        let [x,y,eqpm,dist]=q.shift()
        let type=grid[[x,y]].type
        let eqpm2=[0,1,2].filter(e=>e!=type && e!=eqpm)[0]
        let s=seen[[x,y,eqpm2]]
        if(!s || dist+7<s){
            seen[[x,y,eqpm2]]=dist+7
            q.push([x,y,eqpm2,dist+7])
        }
        for(let d of [[-1,0],[0,-1],[0,1],[1,0]]){
            let x2=x+d[0]
            let y2=y+d[1]
            if(!grid[[x2,y2]]) continue
            let type2=grid[[x2,y2]].type
            if(eqpm==type2) continue
            let s=seen[[x2,y2,eqpm]]
            if(!s || dist+1<s){
                seen[[x2,y2,eqpm]]=dist+1
                q.push([x2,y2,eqpm,dist+1])
            }
        }
    }
    return seen[p1]  
}


let part2=bfs([0,0,1],[tx,ty,1])
console.log(part2)