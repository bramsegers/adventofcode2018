let input=825401


let solve=(part)=>{
    let list=[3,7]
    let p1=0,p2=1
    while(true){
        let recipe=list[p1]+list[p2]
        if(recipe>9) list.push((recipe/10)|0)
        list.push(recipe%10)
        p1=(p1+list[p1]+1)%list.length
        p2=(p2+list[p2]+1)%list.length
        if(part==1 && valid1(list)) break
        if(part==2 && valid2(list,1)) break
        if(part==2 && valid2(list,2)) break
    }
}


let valid1=(list)=>{
    if(list.length<input+10) 
        return false
    let m=0
    for(let i=input;i<input+10;i++)
        m=(10*m)+list[i]
    console.log(m)
    return true
}


let valid2=(list,a)=>{
    let i=list.length-a, len=i
    for(let inp=input;inp>0;inp=(inp/10)|0,i--)
        if(i<0 || (inp%10)!=list[i])
            return false
    len-=Math.log10(input)|0
    console.log(len)
    return true
}


solve(1)
solve(2)