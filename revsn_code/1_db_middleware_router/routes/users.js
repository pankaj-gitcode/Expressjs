const express = require('express');
const { Users, Course } = require('../db/db');
const userMiddleware = require('../middleware/users');
const router = express.Router();

//POST: user signup
router.post('/signup', (req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        //check if userExist
        Users.findOne({username})
        .then(userExist=>{
            if(userExist){
                res.status(301).json({msg: `Uer: ${username} already exist!`});
                return;
            }
            Users.create({username, password});
            res.status(200).json({msg: ` USER: ${username} created successfully!`});
            return;
        })
        .catch(err=>console.log(`ERROR: [router/User/signup]: ${err.message}`))
    }
    catch(err){res.status(503).json({msg: `ERROR: [POST:Router/User/signup]=> ${srr.message}`})}
})

// GET: list all courses
router.get('/courses', userMiddleware, (req, res)=>{
    try{
        const username = req.headers.username;
        const password = req.headers.password;

        //output all the courses on screen
        Course.find({})
        .then(allCourses=>res.status(200).json({msg: `All courses are: ${allCourses}`}))
        .catch(err=>console.log(`User/GET:AllCourses: ${err.message}`))
    }
    catch(err){res.status(503).json({msg: `ERROR: [GET:/user/courses]=> ${err.message}`})}
}) 

//POST: Purchase a course
router.post('/courses/:courseId', userMiddleware, (req, res)=>{
    try{
        const username = req.headers.username;
        const password = req.headers.password;
        const courseId = req.params.courseId;

        //update the purchased course to this userDB with CourseId
        Users.updateOne({username},{
            $addToSet: {purchasedCourse: courseId}
        })
        .then(courseExist=>{
            if(courseExist.nModified === 0){
                res.status(404).json({msg: `User not found or course already purchased!`});
                console.log(`Course Exist: ${courseExist}`);
                return;
            }
            res.status(200).json({msg: `Course: ${courseExist} added!`})
        })
    }
    catch(err){res.status(503).json({msg: `ERROR: [POST:/router/Users]=> ${err.message}`})}
});

//GET: list all purchased course by user
router.get('/purchasedCourses',userMiddleware, async(req, res)=>{
    try{
        const username = req.headers.username;
        const password = req.headers.password;
        const allCourses = await Users.findOne({purchasedCourse});
        res.status(200).json({msg: `List of all purchased course: ${allCourses}`})
    }
    catch(err){res.status(503).json({msg: `ERROR: [GET:/router/users]=> ${err.message}`})}
} )