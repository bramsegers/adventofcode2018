let nDimArray=(dims,init)=>{
    if(!dims.length) return init
    let dim=dims[0]
    let rest=dims.slice(1)
    let arr=new Array(dim)
    for(let i=0;i<dim;i++)
        arr[i]=nDimArray(rest,init)
    return arr
}

let array=(dims,init)=>{
    if(typeof dims==='number') 
        return new Array(dims).fill(init)
    if(dims.constructor===Array) 
        return nDimArray(dims,init)
}

module.exports=array