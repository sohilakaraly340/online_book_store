class WishListController {
  constructor(whishListRepository) {
    this.whishListRepository = whishListRepository;
  }
  async getAllUsersWishList(auth) {
    const user = auth;
    return await this.whishListRepository.getAllWishList(user.email);
  }

  async updateWishList(id, auth) {
    const user = auth;

    if (user.wishList.includes(id)) {
      user.wishList.splice(user.wishList.indexOf(id), 1);
    } else {
      user.wishList.push(id);
    }

    return await this.whishListRepository.updateWishList(
      user.email,
      user.wishList
    );
  }
}
module.exports = WishListController;
