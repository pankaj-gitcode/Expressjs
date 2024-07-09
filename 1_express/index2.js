const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());

app.post('/health-checkup', (req, res)=>{
    try{
        const kidneys = req.body.kidneys //in array form
        const kidneysLength = kidneys.length;

    res.status(200).json({
        kidneysLength
    })
    
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
})

// ----------- using Global-Catch-Error-Handelling -----------
app.use((err, req, res, next)=>{
    res.status(500).json({
        'msg': 'Invalid Input'
    })
})

app.listen(PORT, ()=>console.log(`PORT Listening on: ${PORT}`));