const express =require('express');
const userProfile=express.Router();
const UserProfileRepo=require('../repository/userProfile.repository');
const UserProfileController =require('../controllers/userProfile.controller');

const user = require("../models/User.schema");



const userProfileRepository=new UserProfileRepo(user);
const userProfileController= new UserProfileController(userProfileRepository);

userProfile.get('/', (req,res)=>userProfileController.getCurrentProfile(req,res));
userProfile.patch('/', (req,res)=>userProfileController.UpdateUserProfile(req,res));
    

module.exports=userProfile;