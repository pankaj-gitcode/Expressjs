const express = require('express');
const app = express();

const PORT = 3000;

const sum = (num)=>{
    let sum = 0;
    for(let i=1; i<=num; i++){
        sum += i;
    }
    return sum;
}

app.get('/', (req,res)=>{
    res.send(`This is Root....`)
})

app.get('/sum', (req, res)=>{
    const num = req.query.num;
    res.send(`Sum of ${num} numbers : ${sum(num)}`);   
})

app.listen(PORT, (req,res)=>console.log(`PORT listening on: ${PORT}`))