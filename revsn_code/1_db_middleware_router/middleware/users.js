const { Users } = require("../db/db");

const userMiddleware = async (req, res, next)=>{
    try{
        const username = req.headers.username;
        const password = req.headers.password;

        //check if user is in DB
        Users.findOne({username, password})
        .then(userExist=>userExist?next():res.status(404).json({msg: `${username} is not in DB`}))
        .catch(err=>console.log(err.message))
    }
    catch(err){
        res.status(503).json({msg: err.message})
    }
}

//export middleware
module.exports=userMiddleware;