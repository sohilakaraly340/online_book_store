const jwt = require("jsonwebtoken");
const {
  shoppingItemValidation,
  updateShoppingItemValidation,
} = require("../validation/ShoppingItem.validator");
const { UnAuthorizedError } = require("../Errors/unAuthorizedError");
const { NotFoundError } = require("../Errors/notFoundError");
const { ValidationError } = require("../Errors/validationError");
const { NotImplementedError } = require("../Errors/NotImplementedError");

class ShoppingItemsController {
  constructor(
    userRepository,
    cartRepository,
    itemRepository,
    shoppingItemRepository
  ) {
    this.userRepository = userRepository;
    this.cartRepository = cartRepository;
    this.itemRepository = itemRepository;
    this.shoppingItemRepository = shoppingItemRepository;
  }

  async getAllCurrentCartshoppingItemsController(headers) {
    const token = headers["jwt"];

    if (!token) throw new UnAuthorizedError("UnAuthorized User");

    const payLoad = jwt.verify(token, "myjwtsecret");

    const user = await this.userRepository.findByEmail(payLoad.email);

    if (!user) {
      throw new UnAuthorizedError("UnAuthorized User");
    }

    await this.cartRepository.getCurrentUserCartRepository(user._id);

    const data =
      await this.shoppingItemRepository.getAllCurrentCartshoppingItemsRepository(
        cart._id,
        user._id
      );

    return data;
  }

  async addToCartController(auth, body) {
    const user = auth;

    const { error, value } = shoppingItemValidation(body);
    if (error) {
      throw new ValidationError(`InValid data ${error.message}`);
    }

    let { item, quantity } = body;
    if (!quantity) {
      quantity = 1;
    }

    await this.itemRepository.findItem(item);

    let cart = await this.cartRepository.getCurrentUserCartRepository(user._id);
    if (!cart) {
      cart = await this.cartRepository.createCartRepository({
        user: user._id,
      });
    }
    const cartId = cart._id;

    let shoppingItems =
      await this.shoppingItemRepository.getAllCurrentCartshoppingItemsRepository(
        cartId
      );

    for (let i = 0; i < shoppingItems.length; i++) {
      if (shoppingItems[i].item._id == item) {
        const newQuantity = (shoppingItems[i].quantity += +quantity);
        let isAvaliable = await this.checkStock(item, newQuantity);

        if (!isAvaliable) {
          throw new NotImplementedError("Quantity not avaliable in stock");
        }

        const updatedData =
          await this.shoppingItemRepository.updateShoppingItemRepository(
            shoppingItems[i]._id,
            { quantity: newQuantity }
          );
        return updatedData;
      }
    }

    let isAvaliable = await this.checkStock(item, quantity);

    if (!isAvaliable) {
      throw new NotImplementedError("Quantity not avaliable in stock");
    }

    return await this.shoppingItemRepository.createShoppingItemRepository({
      cartId: cartId,
      item: item,
      quantity: quantity,
    });
  }

  async updateShoppingItemController(id, body, auth) {
    const user = auth;

    await this.shoppingItemRepository.findShoppingItemByIdRepository(id);

    const { error, value } = updateShoppingItemValidation(body);

    if (error) {
      throw new ValidationError(`InValid data ${error.message}`);
    }

    await this.itemRepository.findItem(shoppingItem.item);

    if (body.quantity) {
      let isAvaliable = await this.checkStock(item, body.quantity);

      if (!isAvaliable) {
        throw new NotImplementedError("Quantity not avaliable in stock");
      }
    }

    const upadtedData =
      await this.shoppingItemRepository.updateShoppingItemRepository(id, body);

    return upadtedData;
  }

  async removeShoppingItemFromCartController(id, auth) {
    const user = auth;

    await this.shoppingItemRepository.findShoppingItemByIdRepository(id);

    await this.shoppingItemRepository.deleteShoppingItemRepository(
      id,
      user._id
    );
    return "Deleted Successfully";
  }

  async clearAllShoppingItemsFromCart(auth) {
    const user = auth;

    const cart = await this.cartRepository.getCurrentUserCartRepository(
      user._id
    );
    await this.shoppingItemRepository.clearAllShoppingItem(cart._id);
    return "All items deleted";
  }

  async checkStock(itemId, quantity) {
    const item = await this.itemRepository.findItem(itemId);

    if (+item.countInStock >= +quantity) {
      return true;
    }

    return false;
  }
}

module.exports = ShoppingItemsController;
