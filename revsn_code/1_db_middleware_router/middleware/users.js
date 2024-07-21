const { Users } = require("../db/db");

const userMiddleware = (req, res, next)=>{
    try{
        const username = req.headers.username;
        const password = req.headers.password;
        //check if User exisit
        Users.findOne({username})
        .then(userExisit=>userExisit?next():res.status(404).json({msg: `USER-Middleware: ${username} is not in DB!`}))
        .catch(err=>console.log(err.message))
    }
    catch(err){res.status(503).json({msg: `USER-Middleware: ${msg.message}`})};
}

//export the module
module.exports = userMiddleware;