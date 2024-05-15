const express = require('express');
const router=express.Router();

const userRouter=(userController)=>{
    router.get('/',async (req,res)=>{
  
      try{
        const allUser=await userController.findAllUsers()
        res.status(200).json({success:true, data: allUser});
      }catch(error){
        res.status(500).json({success: false, message: error.message})
      }
    })
    return router;
  
  }
  module.exports=userRouter;
  