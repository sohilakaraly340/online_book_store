const { NotFoundError } = require("../Errors/notFoundError");
const User = require("../models/User.schema");

class WishListRepository {
  async getAllWishList(email) {
    // {wishList:1,_id:0} to ignore all data except whishList
    const userWishList = await User.findOne(
      { email },
      { wishList: 1, _id: 0 }
    ).populate("wishList");
    if (!userWishList) throw new NotFoundError("user not found");
    return userWishList;
  }

  async updateWishList(email, wishList) {
    const updatedWishList = await User.updateOne({ email }, { wishList });
    if (!updatedWishList) throw new NotFoundError("user not found");
    return updatedWishList;
  }
}
module.exports = WishListRepository;
