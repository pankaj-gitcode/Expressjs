const { Admin } = require("../db/db");


const adminMiddleware = async (req, res, next)=>{
    try{
        const username = req.headers.username;
        const password = req.headers.password;

        //check if admin exist
        const adminExist = await Admin.findOne({username});
        adminExist?next():res.status(404).json({msg: `MIDDLEWARE: ${username} is NOT ADMIN!`})

    }
    catch(err){res.status(503).json({msg: `MIDDLEWARE: ${err.message}`})}
}

//export the module
module.exports = adminMiddleware;