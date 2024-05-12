class WishListRepository{
    constructor(user){this.user=user}

    async getAllWishList(email){
        try{
            // {wishList:1,_id:0} to ignore all data except whishList
            const userWishList= await this.user.findOne({email},{wishList:1,_id:0}).populate('wishList');
            return userWishList;

        }catch(error){
            throw new Error(error.message)
        }

        
    }

    async updateWishList(email,wishList){
        try{
            const updatedWishList= await this.user.updateOne({email}, {wishList})
            return updatedWishList;

        }catch(error){
            throw new Error(error.message);
        }

    }

}
module.exports=WishListRepository;