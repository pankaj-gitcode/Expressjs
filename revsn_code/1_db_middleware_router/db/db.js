const mongoose = require('mongoose');
const URL = '';
mongoose.connect(URL);

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
})

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }]
})

//create model
const admin = mongoose.model('admin', adminSchema);
const users = mongoose.model('users', usersSchema);
const course = mongoose.model('course', courseSchema);

//exports the module
module.exports = {
    admin,
    users,
    course
}