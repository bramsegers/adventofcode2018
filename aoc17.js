const array=require('./array')


let input
    =require('fs')
    .readFileSync('input/aoc17.txt','utf8')
    .split('\r\n')


let data=array([2000,2000],0)
let minx=2000, maxx=0
let miny=2000, maxy=0


for(let i of input){
    let [a,b,c]=i.match(/\d+/g).map(Number)
    for(let d=b;d<=c;d++){
        if(i[0]=='x'){
            data[a][d]='#'
            if(a<minx) minx=a
            if(a>maxx) maxx=a
            if(d<miny) miny=d
            if(d>maxy) maxy=d
        }else{
            data[d][a]='#'
            if(d<minx) minx=d
            if(d>maxx) maxx=d
            if(a<miny) miny=a
            if(a>maxy) maxy=a
        }
    }
}


let open=(x,y)=>data[x][y]==0 || data[x][y]=='|'


let fill=(x,y)=>{
	if(y>maxy) return
	else if(!open(x,y)) return
    let leftX,rightX
	if(!open(x,y+1)){
		leftX=x
		while(open(leftX,y) && !open(leftX,y+1)){
			data[leftX][y]='|'
			leftX--
        }
        rightX=x+1
		while(open(rightX,y) && !open(rightX,y+1)){
			data[rightX][y]='|'
			rightX++
        }
        if(open(leftX,y+1) || open(rightX,y+1)){
			fill(leftX,y)
			fill(rightX,y)
		}else if(data[leftX][y]=='#' && data[rightX][y]=='#')
		    for(let x2=leftX+1;x2<rightX;x2++)
				data[x2][y]='~'
	}else if(data[x][y]==0){
		data[x][y]='|'
		fill(x,y+1)
		if(data[x][y+1]=='~') fill(x, y)
	}
}


fill(500,0)
let water=0,touched=0
for(let x=minx-1;x<=maxx+1;x++)
    for(let y=miny;y<=maxy;y++)
        if(data[x][y]=='|') touched++
        else if(data[x][y]=='~') water++


console.log(water+touched)
console.log(water)