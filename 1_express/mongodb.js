const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

mongoose.connect(`mongodb+srv://pankajadityadev:8H0jNCDpyeMpVsjg@project-v-2.fib3wyh.mongodb.net/newUser`);
app.listen(PORT, (res,req)=>console.log(`PORT Listening on ${PORT}`));

//crete schema
const UserSchema = new mongoose.Schema({
   email: String,
   password: String,
   name: String 
})
//create model
const User = mongoose.model('User', UserSchema);

app.use(express.json());
app.post('/signUp',async (req, res)=>{
    try{

        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
    
        //cehck if user already exist
        const UserExist = await User.findOne({email: email});
        if(UserExist) res.status(404).json({msg: `${email} already exist`});
    
        const UserDb = await User.create({
            email: email,
            password: password,
            name: name
        })
        res.status(200).json({msg: "DB successfully created!"});
    }
    catch(err){
        res.status(500).json({err: err.message})
    }
})