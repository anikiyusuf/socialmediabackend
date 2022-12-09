const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
       type:String,
       required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength:8,
    },
    blog:[{type:mongoose.Types.ObjectId, ref:"Blog", require:true}]
});


module.exports = mongoose.model("User", UserSchema)
