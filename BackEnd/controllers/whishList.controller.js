class WishListController{
    constructor(whishListRepo , itemRepo, userRepo){
        this.whishListRepo=whishListRepo;
        this.itemRepo=itemRepo;
        this.userRepo=userRepo
    }
    async getAllUsersWishList(req,res){
        try{
            const userWishList= await this.whishListRepo.getAllWishList(req.headers.email);
            res.status(200).json({success:true , data: userWishList});
        }catch(error){
            res.status(500).json({ message:'Internal server error'})
        }
    }

    async updateWishList(req,res){
        try{
            
            const item= req.body._id;
            const itemAdded=await this.itemRepo.findItem(item);
            const user = await this.userRepo.findByEmail(req.headers.email);
            // console.log(req.headers.email);

            if (user.wishList.includes(item)) {
                 user.wishList.splice(user.wishList.indexOf(item), 1);
                
                } else {
                    user.wishList.push(item);
                }

            
            const updated=await this.whishListRepo.updateWishList(req.headers.email,user.wishList);
            res.status(200).json(updated);

        }catch(error){
            console.log(error);
            res.status(500).json("internal server error ");
        }

    }
}
module.exports=WishListController;