const { NotFoundError } = require("../handleErrors/notFoundError");

class WishListRepository {
  constructor(user) {
    this.user = user;
  }

  handleError = (error) => {
    if (error instanceof NotFoundError) throw new NotFoundError(error.message);

    throw new InternalServerError(error.message);
  };

  async getAllWishList(email) {
    try {
      // {wishList:1,_id:0} to ignore all data except whishList
      const userWishList = await this.user
        .findOne({ email }, { wishList: 1, _id: 0 })
        .populate("wishList");
      if (!userWishList) throw new NotFoundError("user not found");
      return userWishList;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateWishList(email, wishList) {
    try {
      const updatedWishList = await this.user.updateOne(
        { email },
        { wishList }
      );
      if (!updatedWishList) throw new NotFoundError("user not found");
      return updatedWishList;
    } catch (error) {
      this.handleError(error);
    }
  }
}
module.exports = WishListRepository;
