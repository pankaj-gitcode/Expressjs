const express = require('express');
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const JWTPass = 'abc123';

app.listen(PORT, (req, res)=>console.log(`PORT Listening on: ${PORT}`));

//Inmemory local DB
const All_Users = [
    {
      username: 'raj@mail.com',
      password: 'raj123',
      name: 'raj'  
    }, 
    {
        username: 'jack@mail.com',
        password: 'jack123',
        name: 'jack'        
    }, 
    {
        username: 'mac@mail.com',
        password: 'mac123',
        name: 'mac'    
    }
]

// user's input status and in-memory element verification
const credentialStatus = (uName, uPass)=>{
    console.log(uName, '+', uPass);
    All_Users.map(e=>e.username === uName && e.password === uPass? true: false)}

//POST Method: create JWT Token 
app.use(express.json());
app.post('/signIn', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    //user's entered credential verification
    if( credentialStatus(username, password))res.status(404).json({msg: `Entered cred. ${[username, password]} INVALID!!!`});

   //create JWT Token
   const token = jwt.sign({username}, JWTPass);
   res.status(200).json({token})
   
})

//GET Method: JWT verification
app.get('/users', (req, res)=>{
    const token = req.headers.authorization;

    try{
        //decode the Token: verification
        const decoder = jwt.verify(token, JWTPass);
        const username = decoder.username;

        res.status(200).json({
            username,
            msg: `Successfully LoggedIn!`

        })
    }
    catch(err){
        res.status(404).json({msg: err.message})
    }

})