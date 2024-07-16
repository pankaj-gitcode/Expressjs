const User = require('../db/db');


const adminMiddleware = async (req, res, next)=>{
    try{

        const username = req.headers.username;
        const password = req.headers.password;

        //check user existance
        const userExist = await findOne({username, password});
        userExist? next(): res.status(403).json({msg: `Admin doesn't exist!`});
    }
    catch(err){
        res.status(501).json({msg: err.message})
    }

}

//export 
module.exports = adminMiddleware;