const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title :{
        type:String,
        required:true,

    },
    description :{
        type:String,
        required:true,

    },
    image:{
        type:String,
        require:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    }
})


module.exports = mongoose.model("Blog", blogSchema)