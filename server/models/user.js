const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, username: {
        type: String,
        required: true,
        unique: true
    }, email: {
        type: String,
        required: true,
        unique: true
    }, phone: {
        type: Number
    }, password: {
        type: String,
        required: true
    }
});


userSchema.statics.signup = async function ({email, password, name, phone, username}){
    if(!email || !password || !phone || !name || !username) {
        return {msg: 'error', message: 'Please fill all the fields'};
    }

    if(!validator.isEmail(email)) {
        return {msg: 'error', message: 'Email is not valid'};
    }

    let exist = await this.find({email});
    if(exist.length) {
        return {msg: 'error', message: 'This email already exist!'};
    }

    exist = await this.find({username});
    if(exist.length) {
        return {msg: 'error', message: 'This username already exist!'};
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({email,name,phone,username,password:hash});

    return user;
}

userSchema.statics.login = async function({email, password}) {
    if(!email || !password) {
        return {msg: 'error', message: 'Please fill all the fields'};
    }
 
    const user = await this.findOne({$or: [{email}, {username: email}]});
    if(!user) {
        return {msg:'error', message: 'Invalid Cardantials'};
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        return {msg:'error', message: 'Invalid Cardantials'};
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);