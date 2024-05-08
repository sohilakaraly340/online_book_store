const joi =require('joi');
const userProfile=require('../models/User.schema');
const bycrypt = require('bcrypt');



const EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

class UserProfileController{
    constructor(userProfileRepo){
        this.userProfileRepo=userProfileRepo;
        
    }

    async validateUserProfile(profile){
        const schema=joi.object({
            firstName:joi.string().min(3).max(20),
            lastName:joi.string().min(3).max(20),
            email: joi.string().regex(EmailPattern),
            phoneNumber: joi.string().regex(phonePattern).min(11).max(11),
            // image: joi.string(),
            password: joi.string().min(8),
            address:joi.string()

        })
        return schema.validate(profile);
    }

    async getCurrentProfile(req, res) {
        try {
            
            const currentUser = await this.userProfileRepo.getUser(req.headers.email);
            
            if(!currentUser)res.json("Un authorized");
            res.status(200).json({
                success:"true",
                data:{
                _id: currentUser._id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                password:currentUser.password,
                phoneNumber: currentUser.phoneNumber,
                image: currentUser.image,
                address:currentUser.address
                }
            });
            
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
    }

   async UpdateUserProfile(req,res){
    try{
        const {error , value}= await this.validateUserProfile(req.body)
        if(error) return res.status(422).json({message:error.message})
    
            
            if(req.body.email){
                res.end("can't change email!")
                return;
            }
            
            if(req.body.password){
                
                req.body.encryptedPassword= await bycrypt.hash(req.body.password,10)
                // console.log(req.body.password);
                delete req.body.password
                req.body.password=req.body.encryptedPassword
                
            }
            
            const updatedProfile= await this.userProfileRepo.updateProfile(req.headers.email,req.body)
            const user =await this.userProfileRepo.getUser(req.headers.email);
            res.status(200).json(user);
        
    
        }
    catch(e){
        console.error('Error:', e);
        return res.status(500).json({ message: 'Internal server error' });

    }
}
    
}
module.exports=UserProfileController;