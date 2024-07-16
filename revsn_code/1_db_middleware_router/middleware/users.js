import { User } from "../db/db";

const userMiddleware = (req, res, next)=>{
    try{

        const username = req.headers.username;
        const password = req.headers.password;

        //user existance
        User.findOne({
            username, password
        })
        .then((userExists)=>userExists? next(): res.status(403).json({msg: `${username} doesn't exist!!`}));
    }
    catch(err){res.status(501).json({msg: err.message})}
    }

    //export
    module.exports = userMiddleware;