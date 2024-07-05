const express = require('express');

const app = express();

const sum = (a,b)=>{
    let sum = a + b;
    return sum
}

app.get('/', (req, res)=>{
   res.send(`HELLO Express....`) 
})

app.get('/sum', (req, res)=>{
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);

    res.send(`You've entered ${num1} & ${num2}\nTotal sum is ${sum(num1,num2)}`);
})

app.listen(3000);