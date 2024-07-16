const express = require('express');
const app = express();
const {User, Course} = require('../db/db');
const adminMiddleware = require('../middleware/admin');

app.post('/signup', async (req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        //check userExistance
        const userExist = await findOne({username, password});
        if(!userExist){
            res.status(403).json({msg: `User doesn't exist!!`})
        }
        const createUser = await User.create({
            username, password
        })
        res.status(200).json({msg: `${username} has been created successfully!!`})
    }
    catch(err){
        msg: err.message
    }
})

app.post('/courses', adminMiddleware ,(req, res)=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink;

        //check if course exisit already, if not create it else msg: already course created
        Course.findOne({title})
        .then((courseExist)=>{
            if(!courseExist){ res.status(404).json({msg: `Course doen't exist`})}
            const createCourse = 
        })
    }
})