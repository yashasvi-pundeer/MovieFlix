const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true,"Email should be unique"],
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid Email")
            }
        }
    },
    likedMovies: Array,

})

//collection

const User = new mongoose.model("User",userSchema);
module.exports= User