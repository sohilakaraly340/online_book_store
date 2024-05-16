class WishListController {
  constructor(whishListRepo, itemRepo, userRepo) {
    this.whishListRepo = whishListRepo;
    this.itemRepo = itemRepo;
    this.userRepo = userRepo;
  }
  async getAllUsersWishList(email) {
    try {
      return await this.whishListRepo.getAllWishList(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateWishList(id, email) {
    try {
      // const itemAdded = await this.itemRepo.findItem(id);
      const user = await this.userRepo.findByEmail(email);

      if (user.wishList.includes(id)) {
        user.wishList.splice(user.wishList.indexOf(id), 1);
      } else {
        user.wishList.push(id);
      }

      return await this.whishListRepo.updateWishList(email, user.wishList);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = WishListController;
