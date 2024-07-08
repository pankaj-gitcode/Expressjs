const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, ()=>console.log(`PORT Listening on: ${PORT}`));

app.use(express.json());

app.post('/health-checkup', (req, res)=>{
    try{
        const kidneys = req.body.kidneys //in array form
    const kidneysLength = kidneys.length;

    res.send(200).json({
        kidneysLength
    })
    // res.send(`${kidneysLength} kidneys`)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
})