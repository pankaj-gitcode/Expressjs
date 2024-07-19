const express = require('express');
const { Admin, Course } = require('../db/db');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();
// const PORT = 3000;


// app.use(express.json());
    //---------- POST: SIGNUP --------------------
router.post('/signup', async(req, res)=>{
    try{
        username = req.body.username;
        password = req.body.password;

        //check if admin already exist
        const adminExist = await Admin.findOne({username, password});
        if(adminExist){
            res.status(300).json({msg: `${username} already exist`})
            return;
        }
        const createAdmin = await Admin.create({username, password});
        res.status(200).json({msg: `Admin- \"${username}\" has been created successfully!`})
    }
    catch(err){res.status(500).json({msg: err.message})}
})

    // ----------- POST: COURSES: once verified from Admin-Middleware then only access to create courses by ADMIN
router.post('/courses', adminMiddleware ,async (req, res)=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink;

        //check if course already exist
        // Course.findOne({
        //     title
        // })
        // .then(courseExist=>{
        //     if(!courseExist){
        //         res.status(404).json({msg: `${Course} doesn\'t exist.`});
        //     }
        //     Course.create({
        //         title,description, price, imageLink
        //     })
        // })
        // .catch(err=>console.log("ERROR: ADMIN->Course_Creation: ", err.message));

        const courseExist = await Admin.findOne({title});
        if(courseExist) {
            res.status(302).json({msg: `COURSE STATUS: ${title} Already Exist`}) ;
            return;
        }
        
        else{
            const createCourse = await Admin.create({
                title, description, price, imageLink
            })
            res.status(200).json({msg: `Course has been created successfully: ${createCourse}`})
            return createCourse;
        }


    }
    catch(err){res.status(503).json({msg:  `Invalid: ${err.message}`})}
})

    //------------- GET: COURSES: All the created course by ADMIN -------------------------
router.get('/courses', adminMiddleware ,async(req, res)=>{
    try{
        const showCourses = await Course.find({});
        res.status(200).json({
            courses: showCourses
        })
    }
    catch(err){res.status(503).json({msg: `GET-COURSE ERROR: ${err.message} `})}
})

// app.listen(PORT, (req, res)=>console.log(`Listening PORT: ${PORT}`));

//export the Object 'app'
module.exports = router;