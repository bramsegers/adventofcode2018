const array=require('./array')


let input
    =require('fs')
    .readFileSync('input/aoc18.txt','utf8')
    .split('\r\n')
    .map(e=>e.split(''))


let W=input[0].length
let H=input.length
let seen=[]


for(let t=1;t<=1e9;t++){
    let area=array([H,W])
    let freq={'.':0,'|':0,'#':0}
    for(let j=0;j<H;j++){
        for(let i=0;i<W;i++){
            let adj={'.':0,'|':0,'#':0}
            for(let b=j-1;b<=j+1;b++){
                for(let a=i-1;a<=i+1;a++){
                    if(b<0 || a<0) continue
                    if(b==H || a==W) continue
                    if(b==j && a==i) continue
                    adj[input[b][a]]++
                }
            }
            if(input[j][i]=='.') area[j][i]=(adj['|']>=3)?'|':'.'
            if(input[j][i]=='|') area[j][i]=(adj['#']>=3)?'#':'|'
            if(input[j][i]=='#') area[j][i]=(adj['#'] && adj['|'])?'#':'.'
            freq[area[j][i]]++
        }
    }
    if(seen[area]){
        let delta=t-seen[area]
        t+=delta*parseInt((1e9-t)/delta)
        seen=[]
    }
    seen[area]=t
    input=area
    if(t==10 || t==1e9) console.log(t,freq['|']*freq['#'])
}