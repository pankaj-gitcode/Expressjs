const mongoose = require('mongoose');
const URL = 'mongodb+srv://pankajadityadev:8H0jNCDpyeMpVsjg@project-v-2.fib3wyh.mongodb.net/course-selling-App-2';
mongoose.connect(URL);

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    imageLink: String
})

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

//create model
const Admin = mongoose.model('Admin', adminSchema);
const Users = mongoose.model('Users', usersSchema);
const Course = mongoose.model('Course', courseSchema);

//exports the module
module.exports = {
    Admin,
    Users,
    Course
}