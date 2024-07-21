const express = require('express');
const { Admin, Course } = require('../db/db');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

//POST: create admin
router.post('/signup', async(req, res)=>{
    try{
        //inputs
        const username = req.body.username;
        const password = req.body.password;
        //check if Admin already exist
        const adminExist = await Admin.findOne({username});
        if(adminExist){
            res.status(404).json({msg:`${username} already exist!!`});
            return;
        }

        //create admin users
        const createAdmin = await Admin.create({username, password});
        res.status(200).json({msg: `${username} created successfully!`});
    }
    catch(err){res.status(503).json({msg: `ERROR: route/admin: ${err.message}`})}
})
//POST: admin create courses once validated from Admin-Middleware
router.post('/courses', adminMiddleware,async(req,res)=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink ;

        //create course once all looks from the Adminmiddleware
        const createCourse = await Course.create({
            title,
            description,
            price,
            imageLink
        });
        res.status(200).json({msg: `$(createCourse.id):${createCourse.title} has been created successfully!!`});
    }
    catch(err){res.status(503).json({msg: `ERROR: [routes/admin/] ${err.message}`})}
});

//GET: show the course created by Admin
router.get('/courses', adminMiddleware, async (req, res)=>{
    try{
        const username = req.headers.username;
        const password = req.headers.password;
        //once verified by Admin-middleware show on console
        const allcourses = await Course.find({})
        res.status(200).json({msg: `Course created by Admin: ${allcourses}`})
    }
    catch(err){msg: `ERROR: [routes/admin/GET]: ${err.message}`}
})

//export module
module.exports = router;