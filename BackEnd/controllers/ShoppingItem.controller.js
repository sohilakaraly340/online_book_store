const jwt = require("jsonwebtoken");
const {
  shoppingItemValidation,
  updateShoppingItemValidation,
} = require("../validation/ShoppingItem.validator");

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
    try {
      const token = headers["jwt"];

      if (!token) return "unauthorized user";

      const payLoad = jwt.verify(token, "myjwtsecret");

      const user = await this.userRepository.findByEmail(payLoad.email);

      if (!user) {
        return "unauthorized user";
      }

      const cart = await this.cartRepository.getCurrentUserCartRepository(
        user._id
      );
      const data =
        await this.shoppingItemRepository.getAllCurrentCartshoppingItemsRepository(
          cart._id,
          user._id
        );
      return data;
    } catch (error) {
      return { message: error.message };
    }
  }

  async addToCartController(auth, body) {
    try {
      const user = auth;

      const { error, value } = shoppingItemValidation(body);
      if (error) {
        return { message: error.message };
      }

      let { item, quantity } = body;
      if (!quantity) {
        quantity = 1;
      }

      const Isitem = await this.itemRepository.findItem(item);
      if (!Isitem) return "Product not found";

      let cart = await this.cartRepository.getCurrentUserCartRepository(
        user._id
      );
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
            return "Quantity not avaliable in stock";
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
        return { message: "quantity not avaliable in stock" };
      }

      await this.shoppingItemRepository.createShoppingItemRepository({
        cartId: cartId,
        item: item,
        quantity: quantity,
      });

      return value;
    } catch (error) {
      return { message: error.message };
    }
  }

  async updateShoppingItemController(id, body, auth) {
    try {
      const user = auth;
      const shoppingItem =
        await this.shoppingItemRepository.findShoppingItemByIdRepository(id);

      if (!shoppingItem) return "ShoppingItem not found";

      const { error, value } = updateShoppingItemValidation(body);

      if (error) {
        return { message: error.message };
      }

      const item = await this.itemRepository.findItem(shoppingItem.item);

      if (!item) return "Product not found";

      if (body.quantity) {
        let isAvaliable = await this.checkStock(item, body.quantity);

        if (!isAvaliable) {
          return "Quantity not avaliable in stock";
        }
      }

      const upadtedData =
        await this.shoppingItemRepository.updateShoppingItemRepository(
          id,
          body
        );

      return upadtedData;
    } catch (error) {
      return { message: error.message };
    }
  }

  async removeShoppingItemFromCartController(id, auth) {
    try {
      const user = auth;

      const item =
        await this.shoppingItemRepository.findShoppingItemByIdRepository(id);

      if (!item) return "Item not found";

      await this.shoppingItemRepository.deleteShoppingItemRepository(
        id,
        user._id
      );
      return "Deleted Successfully";
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async clearAllShoppingItemsFromCart(auth) {
    try {
      const user = auth;

      const cart = await this.cartRepository.getCurrentUserCartRepository(
        user._id
      );
      await this.shoppingItemRepository.clearAllShoppingItem(cart._id);
      return "All items deleted";
    } catch (error) {
      return { message: error.message };
    }
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
