const array=require('./array')


let input
    =require('fs')
    .readFileSync('input/aoc10.txt','utf8')
    .split('\r\n')
    .map(e=>{
        let n=e.match(/[+-]?\d+/g).map(Number)
        let [posx,posy,velx,vely]=n
        return {posx,posy,velx,vely}
    })


let tick=(m)=>{
    let minx=1e100
    let miny=1e100
    let maxx=-1e100
    let maxy=-1e100
    for(let s of input){
        s.posx+=m*s.velx
        s.posy+=m*s.vely
        minx=Math.min(minx,s.posx)
        miny=Math.min(miny,s.posy)
        maxx=Math.max(maxx,s.posx)
        maxy=Math.max(maxy,s.posy)                            
    }
    return {minx,miny,maxx,maxy}
}


for(let prevarea=1e100,ticks=0;;ticks++){
    let t=tick(1)
    let w=t.maxx-t.minx
    let h=t.maxy-t.miny
    let area=w*h
    if(area>prevarea){
        t=tick(-1)
        w=t.maxx-t.minx+1
        h=t.maxy-t.miny+1
        let mat=array([h,w],' ')
        for(let s of input){
            let x=s.posx-t.minx
            let y=s.posy-t.miny
            mat[y][x]='★'
        }
        for(let j=0;j<h;j++)
            console.log(mat[j].join(''))
        console.log(ticks)
        break
    }
    prevarea=area      
}