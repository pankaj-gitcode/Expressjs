const mongoose = require('mongoose');
const URL = 'mongodb+srv://pankajadityadev:8H0jNCDpyeMpVsjg@project-v-2.fib3wyh.mongodb.net/course-selling-App-3';

//connect to mongoDB
mongoose.connect(URL);

//create schema: Admin, Users, Course
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

//create model
const Admin = mongoose.model('Admin', adminSchema);
const Users = mongoose.model('Users', userSchema);
const Course = mongoose.model('Course', courseSchema);

//exports the module
module.exports = {
    Admin,
    Users,
    Course
}