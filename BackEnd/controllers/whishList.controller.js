class WishListController{
    constructor(whishListRepo , itemRepo, userRepo){
        this.whishListRepo=whishListRepo;
        this.itemRepo=itemRepo;
        this.userRepo=userRepo
    }
    async getAllUsersWishList(email){
        try{
            return await this.whishListRepo.getAllWishList(email);
        }catch(error){
            throw new Error(error.message);
        }
    }

    async updateWishList(id,email){
        try{
            
            const item= id;
            const itemAdded=await this.itemRepo.findItem(item);
            const user = await this.userRepo.findByEmail(email);
            // console.log(req.headers.email);

            if (user.wishList.includes(item)) {
                 user.wishList.splice(user.wishList.indexOf(item), 1);
                
                } else {
                    user.wishList.push(item);
                }

            
           return await this.whishListRepo.updateWishList(email,user.wishList);
         

        }catch(error){
            throw new Error(error.message);
        }

    }
}
module.exports=WishListController;