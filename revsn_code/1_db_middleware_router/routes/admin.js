const express = require('express');
const { admin, course } = require('../db/db');
const adminMiddleware = require('../middleware/admin');
const app = express();


app.use(express.json());
    //---------- POST: SIGNUP --------------------
app.post('/singnup', async(req, res)=>{
    try{
        username = req.body.username;
        password = req.body.password;

        //check if admin already exist
        const adminExist = await admin.findOne({username, password});
        if(!adminExist){
            res.status(404).json({msg: `${username} doesn\'t exist`})
        }
        const createAdmin = await admin.create({username, password});
        res.status(200).json({msg: `${username} has been created successfully!`})
    }
    catch(err){res.status(500).json({msg: err.message})}
})

    // ----------- POST: COURSES: once verified from Admin-Middleware then only access to create courses by ADMIN
app.post('/courses', adminMiddleware ,(req, res)=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink;

        //check if course already exist
        course.findOne({
            title
        })
        .then(courseExist=>{
            if(!courseExist){
                res.status(404).json({msg: `${course} doen\'t exist.`});
            }
            course.create({
                title,description, price, imageLink
            })
        })
        .catch(err=>console.log("ERROR: ADMIN->Course_Creation: ", err.message));
    }
    catch(err){res.status(503).json({msg:  `Invalid: ${err.message}`})}
})

    //------------- GET: COURSES: All the created course by ADMIN -------------------------
app.get('/courses', adminMiddleware ,async(req, res)=>{
    try{
        const showCourses = await course.find({});
        res.status(200).json({
            courses: showCourses
        })
    }
    catch(err){res.status(503).json({msg: `GET-COURSE ERROR: ${err.message} `})}
})

//export the Object 'app'
module.export = app;