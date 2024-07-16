const mongoose = require('mongoose');
const URL = '';
mongoose.connect(URL);

//create Schema
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    coursePurchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imgaeLink: String,
    price: Number
});

//create Models
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);

//export
module.exports = {
    Admin, User, Course
}