const express = require('express');
const zod = require('zod');
const PORT = 2000;
const app = express();

app.listen(PORT, (req, res)=>console.log(`PORT Listening on  ${PORT}`));

// zod function: creates schema
const dataValidate = (obj)=>{
    const schema = zod.object({
        username: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(8),
        country: zod.literal('IN').or(zod.literal('US'))
    })

    const response = schema.safeParse(obj);
    console.log(`[DEBUG] ERROR=> ${response.error}/n MSG=>${response.message}/n RES=>${JSON.stringify(response)}`);
    return response.success;
}

//POST : Input from the user
app.use(express.json());
app.post('/signin', (req, res)=>{
    const obj = req.body;

    dataValidate(obj)? res.status(200).json({msg: `VALID: ${JSON.stringify(obj)}`}): res.status(404).json({msg: `Invalid: ${JSON.stringify(obj)}`})
})