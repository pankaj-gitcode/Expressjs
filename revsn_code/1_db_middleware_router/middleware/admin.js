const { Admin } = require("../db/db");

const adminMiddleware = async (req, res, next)=>{
    try{
        const username = req.headers.username;
        const password = req.headers.password;

        //checking if Admin in DB
        const adminExist = await Admin.findOne({
            username,
            password
        })
        adminExist?next():res.status(403).json({msg: `${username} is not ADMIN`});
    }
    catch(err){
        res.status(501).json({msg: err.message})
    }
}

//export middleware
module.exports = adminMiddleware;