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

        let healthyKidney = 0;
        let unhealthyKidney = 0;

        const totalKidneyLength = users.reduce((accum, currVal)=>{
            return accum + currVal.kidneys.length
        }, 0);

        users.forEach(e=>e.kidneys.forEach(e=>{
            e.healthy? healthyKidney +=1 : unhealthyKidney +=1;
        }))

        res.status(500).json({
            totalKidneyLength,
            healthyKidney,
            unhealthyKidney
        })
    }
    catch(err){
        res.status(500).json({err: err.message})
    }


})