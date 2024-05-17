const shoppingItemValidation = require("../validation/ShoppingItem.validator");

class ShoppingItemsController {
  constructor(cartRepository, itemRepository, shoppingItemRepository) {
    this.cartRepository = cartRepository;
    this.itemRepository = itemRepository;
    this.shoppingItemRepository = shoppingItemRepository;
  }

  async getAllCurrentCartshoppingItemsController() {
    //userId
    const userId = "66444414aead5d1508746061";
    try {
      const cart = await this.cartRepository.getCurrentUserCartRepository(
        userId
      );
      console.log(cart._id);
      const data =
        await this.shoppingItemRepository.getAllCurrentCartshoppingItemsRepository(
          cart._id
        );
      console.log(data);
      return data;
    } catch (error) {
      return { message: error.message };
    }
  }

  async addToCartController(body) {
    try {
      const { error, value } = shoppingItemValidation(body);

      if (error) {
        return { message: error.message };
      }

      let { item, quantity } = body;
      if (!quantity) {
        quantity = 1;
      }
      const userId = "66444414aead5d1508746061";

      const Isitem = await this.itemRepository.findItem(item);
      if (!Isitem) return "Product not found";

      let cart = await this.cartRepository.getCurrentUserCartRepository(userId);
      if (!cart) {
        cart = await this.cartRepository.createCartRepository({ user: userId });
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

          await this.shoppingItemRepository.updateShoppingItemRepository(
            shoppingItems[i]._id,
            { quantity: newQuantity }
          );
          return value;
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
      console.log(error);
      return { message: error.message };
    }
  }

  async updateShoppingItemController(id, body) {
    try {
      const shoppingItem =
        await this.shoppingItemRepository.findShoppingItemByIdRepository(id);
      if (!shoppingItem) return "ShoppingItem not found";

      const item = await this.itemRepository.findItem(shoppingItem.item);
      if (!item) return "Product not found";

      if (body.quantity) {
        let isAvaliable = await this.checkStock(item, body.quantity);
        console.log(isAvaliable);
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
      console.log(error);
      return { message: error.message };
    }
  }

  async removeShoppingItemFromCartController(id) {
    try {
      //   const deletedShoppingItem =
      return await this.shoppingItemRepository.deleteShoppingItemRepository(id);
      //   return { success: true, data: deletedShoppingItem };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async clearShoppingItemsFromCart(id) {
    try {
      const allShoppingItems =
        await this.shoppingItemRepository.getAllCurrentCartshoppingItemsRepository(
          id
        );
      console.log(allShoppingItems);
      allShoppingItems.map(async (shoppingItem) => {
        await this.shoppingItemRepository.updateShoppingItemRepository(
          shoppingItem._id,
          { cartId: null }
        );
      });
      return allShoppingItems;
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
