const { InternalServerError } = require("../Errors/internalServerError");

class WishListController {
  constructor(whishListRepo, itemRepo, userRepo) {
    this.whishListRepo = whishListRepo;
    this.itemRepo = itemRepo;
    this.userRepo = userRepo;
  }
  async getAllUsersWishList(email) {
    return await this.whishListRepo.getAllWishList(email);
  }

  async updateWishList(id, email) {
    const user = await this.userRepo.findByEmail(email);

    if (user.wishList.includes(id)) {
      user.wishList.splice(user.wishList.indexOf(id), 1);
    } else {
      user.wishList.push(id);
    }

    return await this.whishListRepo.updateWishList(email, user.wishList);
  }
}
module.exports = WishListController;
