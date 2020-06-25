let input                                                                   // read input
    =require('fs')
    .readFileSync('input/aoc24.txt','utf8')
    .split('\r\n')
    

let parsed=(()=>{                                                           // parsing  :(    
    let id,type,parse=[]
    for(let i of input){
        if(i.startsWith('Immune')) {id=0; type='immune'; continue}
        if(i.startsWith('Infect')) {id=0; type='infect'; continue}
        if(i=='') continue
        let a=i.indexOf('(')
        let b=i.indexOf(')')
        let s=(a<0?i:i.substring(0,a)+i.substring(b+2)).split(' ')
        let name=type+(++id)
        let units=s[0]|0
        let hit=s[4]|0
        let attack=s[12]|0
        let attacktype=s[13]
        let init=s[17]|0
        let weakness=[]
        let immunity=[]    
        if(a>0){
            let str=i.substring(a+1,b)
            for(let s of str.split('; ')){
                if(s.startsWith('immune to ')) 
                    immunity=s.substring(10).split(', ')
                if(s.startsWith('weak to ')) 
                    weakness=s.substring(8).split(', ')
            }
        }
        parse.push({name,type,units,hit,attack,attacktype,init,weakness,immunity})
    }
    return parse
})()


let eff_pow=(a)=>                                                           // effective power of army a
    a.units*(a.attack+a.boost)


let damage=(a,b)=>                                                          // damage that army a would do to army b
     b.immunity.includes(a.attacktype) ? 0
    :b.weakness.includes(a.attacktype) ? 2*eff_pow(a)
    :eff_pow(a)


let battle=(boost=0)=>{
    
    let armies=[]                                                           // initialize armies
    for(let p of parsed){
        let a=JSON.parse(JSON.stringify(p))
        a.boost=(a.type=='immune')?boost:0
        armies.push(a)
    }

    while(true){

        for(let a of armies){                                               // reset state
            a.picked=false
            a.target=null
        }

        armies.sort((a,b)=>{                                                // set target selection order
            let effa=eff_pow(a)
            let effb=eff_pow(b)
            return effa==effb
                ?b.init-a.init
                :effb-effa
        })       

        for(let a of armies){                                               // target selection phase
            let target=armies
                .filter(e=>e.type!=a.type)
                .filter(e=>!e.picked)
                .filter(e=>damage(a,e))
                .sort((b,c)=>{
                    let damb=damage(a,b)
                    let damc=damage(a,c)
                    if(damb!=damc) return damc-damb
                    let effb=eff_pow(b)
                    let effc=eff_pow(c)
                    if(effb!=effc) return effc-effb
                    return c.init-b.init
                })[0]
            if(target){
                a.target=target
                target.picked=true
                //console.log(a.name,'targets',target.name)
            }
        }

        armies.sort((a,b)=>b.init-a.init)                                   // set attacking order
        
        let kills=0                                                         // attacking phase
        for(let a of armies){
            let target=a.target
            if(!target || !a.units) continue
            let kill=(damage(a,target)/target.hit)|0
            if(kill>target.units) kill=target.units
            target.units-=kill
            kills+=kill
            //console.log(a.name,'attacks',target.name,'killing',kill)
        }

        if(!kills) return {winner:'nobody',units:0}                         // return draw?

        armies=armies.filter(a=>a.units)                                    // discard killed armies

        if(!armies.some(e=>e.type=='infect')) break                         // check for winner
        if(!armies.some(e=>e.type=='immune')) break
    
    }
        
    let winner,units=0                                                      // return winner
    for(let a of armies){
        winner=a.type
        units+=a.units
    }
    return {winner,units}
}


console.log(battle())                                                       // part 1


for(let boost=0;;boost++){                                                  // part 2
    let b=battle(boost)
    if(b.winner=='immune'){
        b.boost=boost
        console.log(b)
        break
    }
}