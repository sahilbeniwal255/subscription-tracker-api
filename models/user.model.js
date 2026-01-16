import {mongoose} from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required: [true, "Name is required"],
        trim : true,
        minLength : [3, "Name must be at least 3 characters long"],
        maxLength : [50, "Name can be at most 50 characters long"]
    },
    email : {
        type : String,
        required: [true, "Email is required"],
        unique : true,
        trim : true,
        lowercase : true,
        match : [/.+@.+\..+/, "Please fill a valid email address"]
    },
    password : {
        type : String,
        required: [true, "Password is required"],
        minLength : [6, "Password must be at least 6 characters long"]
    },
    options: { timestamps : true } //to keep track of createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);

export default User;