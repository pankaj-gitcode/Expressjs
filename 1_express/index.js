const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, (req,res)=>console.log(`PORT Listening on: ${PORT}`));

//local DB
const users = [{
    name: 'John',
    kidneys:[{
        healthy: true,
    },{
        healthy: false,
    }] 
}]

app.get('/', (req, res)=>{
    const totalKidneysLenth = users.map(e=>e.kidneys.length).toString();
    console.log(totalKidneysLenth)
    // const totalKidneysLenth = totalKidneys.length;

    let healthyKidney = 0;
    let unhealthyKidney = 0;

   
    users.map(e=>e.kidneys.map(e=>{
        e.healthy? healthyKidney += 1 : unhealthyKidney += 1;
    }))




    res.json({
        totalKidneysLenth,
        healthyKidney,
        unhealthyKidney
    })
})