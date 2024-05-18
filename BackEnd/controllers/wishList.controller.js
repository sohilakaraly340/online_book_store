const { InternalServerError } = require("../Errors/internalServerError");

class WishListController {
  constructor(whishListRepo, itemRepo, userRepo) {
    this.whishListRepo = whishListRepo;
    this.itemRepo = itemRepo;
    this.userRepo = userRepo;
  }
  async getAllUsersWishList(auth) {
    const user = auth;
    return await this.whishListRepo.getAllWishList(user.email);
  }

  async updateWishList(id, auth) {
    const user = auth;

    if (user.wishList.includes(id)) {
      user.wishList.splice(user.wishList.indexOf(id), 1);
    } else {
      user.wishList.push(id);
    }

    return await this.whishListRepo.updateWishList(user.email, user.wishList);
  }
}
module.exports = WishListController;
