const array=require('./array')


let input=3999


let grid=array([301,301],0)
for(let y=1;y<=300;y++){
    for(let x=1;x<=300;x++){
        let rack=x+10
        let pow=rack*y
        pow+=input
        pow*=rack
        pow=((pow/100)|0)%10
        pow-=5
        grid[y][x]=pow
    }
}
    

let part1=()=>{
    let maxp={pow:0}
    for(let y=1;y<=298;y++){
        for(let x=1;x<=298;x++){
            let pow=0
            for(let j=0;j<3;j++)
                for(let i=0;i<3;i++)
                    pow+=grid[y+j][x+i]
            if(pow>maxp.pow)
                maxp={x,y,pow}
        }
    }
    console.log(maxp)
}



let part2=()=>{
    for(let y=1;y<=300;y++)
        for(let x=1;x<=300;x++)
            grid[y][x]+=grid[y-1][x]+grid[y][x-1]-grid[y-1][x-1]
    let maxp={pow:0}
    for(let y=1;y<=300;y++)
        for(let x=1;x<=300;x++)
            for(let x2=x,y2=y;x2<=300 && y2<=300;x2++,y2++){
                let pow=grid[y2][x2]-grid[y2][x-1]-grid[y-1][x2]+grid[y-1][x-1]
                if(pow>maxp.pow)
                    maxp={x,y,size:x2-x+1,pow}
            }
    console.log(maxp)
}


part1()
part2()