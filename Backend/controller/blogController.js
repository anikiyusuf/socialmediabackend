
const { default: mongoose } = require("mongoose");
const user = require("../model/user");
const Blog = require("../model/user")


const getAllBlogs = async(req,res, next)=>{
    let blogs;
    try{
        blogs = await Blog.find()
    }catch (err){
        return  console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blogs})
}

const addBlog = async(req,res,next) => {
    const {title ,description, image, user} = req.body;

    let existingUser;
    try{
        existingUser  = await user.findById(user)
    }catch (err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to find User By  This Id "})
    }
    const blog = Blog({
        title,
        description,
        image,
        user,
    })
    try{
      const session = await mongoose.startSession()
        session.startTransaction(),
        await blog.save({session});
        existingUser.blog.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()
    }catch(err){
       console.log(err)
       return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
}

const updateBlog = async(req,res,next) =>{
    const {title, description} = req.body
      const blogId = req.params.id;
      let blog; 
      try{
       blog = await Blog.findByIdAndUpdate(blogId, {
     title,
     description
}) }catch(err){
    return console.log(err)
}
if(!blog){
    return res.status(500).json({message:"Unable To Update Blog"})
}
return res.status(200).json({blog})
}


const getById = async(req,res,next) =>{
    const id = req.params.id;
    let blog;
    try{
       blog = Blog.findById(id)  
    }catch(err){
       return console.log(err)
    }if(!blog){
        return res.status(404).json({message:"No blog Found"})
    }
    return res.status(200).json({blog})
}


const deleteBlog = async(req,res ,next) =>{
     const id = req.params.id
     let blog;
     try{
        blog = await Blog.findByIdAndRemove(id).populate('user')
        await blog.user.blogs.pull(blog);
        await blog.user.save()
     }catch(err){
        return console.log(err)
     }
     if(!blog){
        return res.status(500).json({message:"Unable to  delete"})
     }
     return res.status(200).json({message:"Successfully deleted"})
}

const getByUserId = async(req,res,next) => {
    const userId = req.params.Id;
    let userBlogs;
    try{
        userBlogs = await user.findById(userId).populate("blogs")
    }
    catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blogs:userBlogs})
}

module.exports = {getAllBlogs, addBlog , updateBlog , getById,  deleteBlog , getByUserId}