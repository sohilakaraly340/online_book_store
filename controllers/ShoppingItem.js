const jwt = require("jsonwebtoken");
const {
  shoppingItemValidation,
  updateShoppingItemValidation,
} = require("../validators/ShoppingItem");
const { UnAuthorizedError } = require("../Errors/unAuthorizedError");
const { NotFoundError } = require("../Errors/notFoundError");
const { ValidationError } = require("../Errors/validationError");
const { NotImplementedError } = require("../Errors/notImplementedError");
const { JWT_SECRET } = require("../constants");

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

  async getCurrentCartAllshoppingItems(headers) {
    const token = headers["jwt"];

    if (!token) throw new UnAuthorizedError("UnAuthorized User");

    const payLoad = jwt.verify(token, JWT_SECRET);

    const user = await this.userRepository.findUserByEmail(payLoad.email);

    if (!user) {
      throw new UnAuthorizedError("UnAuthorized User");
    }

    const cart = await this.cartRepository.getCurrentUserCart(user._id);
    if (!cart) throw new NotFoundError("cart not found");

    const data =
      await this.shoppingItemRepository.getCurrentCartAllshoppingItems(
        cart._id,
        user._id
      );

    return data;
  }

  async addToCart(auth, body) {
    const user = auth;

    const { error, value } = shoppingItemValidation(body);
    if (error) {
      throw new ValidationError(`InValid data ${error.message}`);
    }

    let { item, quantity } = body;

    if (quantity === 0) {
      throw new ValidationError("InValid data quantity must be more than zero");
    }

    if (!quantity) {
      quantity = 1;
    }

    await this.itemRepository.findItemById(item);

    let cart = await this.cartRepository.getCurrentUserCart(user._id);
    if (!cart) {
      cart = await this.cartRepository.createCart({
        user: user._id,
      });
    }
    const cartId = cart._id;

    let shoppingItems =
      await this.shoppingItemRepository.getCurrentCartAllshoppingItems(cartId);

    for (let i = 0; i < shoppingItems.length; i++) {
      if (
        shoppingItems[i].item._id == item &&
        shoppingItems[i].cartId !== null
      ) {
        const newQuantity = (shoppingItems[i].quantity += +quantity);
        let isAvaliable = await this.checkStock(item, newQuantity);

        if (!isAvaliable) {
          throw new NotImplementedError("Quantity not avaliable in stock");
        }

        const updatedData =
          await this.shoppingItemRepository.updateShoppingItem(
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

    return await this.shoppingItemRepository.createShoppingItem({
      cartId: cartId,
      item: item,
      quantity: quantity,
    });
  }

  async updateShoppingItem(id, body, auth) {
    const user = auth;

    const shoppingItem = await this.shoppingItemRepository.findShoppingItemById(
      id
    );

    const { error, value } = updateShoppingItemValidation(body);

    if (error) {
      throw new ValidationError(`InValid data ${error.message}`);
    }

    const item = await this.itemRepository.findItemById(shoppingItem.item);

    if (body.quantity) {
      let isAvaliable = await this.checkStock(item.item._id, body.quantity);

      if (!isAvaliable) {
        throw new NotImplementedError("Quantity not avaliable in stock");
      }
    }

    const upadtedData = await this.shoppingItemRepository.updateShoppingItem(
      id,
      body
    );

    return upadtedData;
  }

  async removeShoppingItemFromCart(id, auth) {
    const user = auth;

    await this.shoppingItemRepository.findShoppingItemById(id);

    await this.shoppingItemRepository.deleteShoppingItemById(id, user._id);
    return "Deleted Successfully";
  }

  async clearAllShoppingItemsFromCart(auth) {
    const user = auth;

    const cart = await this.cartRepository.getCurrentUserCart(user._id);
    await this.shoppingItemRepository.clearAllShoppingItem(cart._id);
    return "All items deleted";
  }

  async checkStock(itemId, quantity) {
    const item = await this.itemRepository.findItemById(itemId);
    if (+item.item.countInStock >= +quantity) {
      return true;
    }

    return false;
  }
}

module.exports = ShoppingItemsController;
