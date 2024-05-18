
const mongoose=require('mongoose');

const authorSchema= new mongoose.Schema({
   name:{
    type:String,
    minLength: [3, "name must be at least 3 characters long"],
    required: [true, "name is required"],
   },
   description:{
    type:String,
    required:[true,"description is required"]
   },
   image:{
    type:String
   }
})
const Author=mongoose.model("Author",authorSchema)
module.exports=Author