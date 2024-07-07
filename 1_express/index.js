const express = require('express');
const app = express();
const PORT = 2000;

app.use(express.json());

app.listen(PORT, (req, res)=>console.log(`PORT Listening on: ${PORT}`));

//local DB
const users = [{
    name: 'John',
    kidneys:[{
        healthy: false,
    },{
        healthy: true,
    }] 
}]

app.get('/', (req, res)=>{
    try{
        const kidneys = users.map(e=>e.kidneys);
        let healthyKidney = 0;
        let unhealthyKidney = 0;

        const totalKidneyLength = users.reduce((accum, currVal)=>{
            return accum + currVal.kidneys.length
        }, 0);

        users.forEach(e=>e.kidneys.forEach(e=>{
            e.healthy? healthyKidney +=1 : unhealthyKidney +=1;
        }))

        res.status(200).json({
            kidneys,
            totalKidneyLength,
            healthyKidney,
            unhealthyKidney
        })
    }
    catch(err){
        res.status(500).json({err: err.message})
    }

})

app.post('/', (req,res)=>{
    try{

        const newKidney = req.body.newKidney;
        users.map(e=>e.kidneys.push({
            healthy: newKidney
        }));

        res.status(200).json({
            newKidney,
            message: [users.map(e=>e.kidneys)]
        })
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    
})

// replace unHealthy kidney with healthy
app.put('/', (req, res)=>{
    try{

        
    
        const kidneysHealth = [];
        users.map(e=>e.kidneys.map(e=>{
            
                if(e.healthy === false){
                    return e.healthy = true
                }
            
        }))
        console.log(kidneyHealth, kidneysHealth)
        res.status(200).json({msg: 'done'})
    }
    
    catch(err){
        res.status(500).json({msg: err.message})
    }

})

// delete all the unhealthy kidneys if any
app.delete('/', (req, res)=>{
    try{
        // users.map(e=>e.kidneys.map(e=>{
            
            //     if(e.healthy===false ){
                //         delete e;
                //     }
                // }))
                
        let newKidney = [];
        users.forEach(e=>e.kidneys.find(e=>e.healthy===true?newKidney.push(e):null))
        users.forEach(e=>e.kidneys = newKidney);

        console.log(newKidney, JSON.stringify(users))

        res.status(200).json({msg: 'done!!'})
    }
    catch(err){
        res.status(500).json({
            err: err.message
        })
    }
})