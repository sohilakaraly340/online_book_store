require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");

//routers
const userRouter = require("./routes/User.router");
const itemRouter = require("./routes/Item.router");
const categoryRouter = require("./routes/Category.router");
const authorRouter = require("./routes/author.router");
const wishListRouter = require("./routes/wishList.router");
const cartRouter = require("./routes/Cart.router");
const shoppingItemRouter = require("./routes/ShoppingItem.router");
const orderRouter = require("./routes/Order.router");
const stripe = require("./routes/Stripe");

const adminUserRouter = require("./routes/admin/UserRoutes");
const adminItemRouter = require("./routes/admin/ItemRouter");
const adminItemTypeRouter = require("./routes/admin/ItemTypeRouter");
const adminCategoryRouter = require("./routes/admin/CategoryRouter");
const adminOrderRouter = require("./routes/admin/OrderRouter");
const adminAuthorRouter = require("./routes/admin/AuthorRouter");

//repositories
const AuthorRepository = require("./repository/author.repository");
const CategoryRepository = require("./repository/Category.repository");
const UserRepository = require("./repository/User.repository");
const ItemRepository = require("./repository/Item.repository");
const WishListRepository = require("./repository/wishList.repository");
const CartRepository = require("./repository/Cart.repository");
const ShoppingItemRepository = require("./repository/ShoppingItem.repository");
const OrderRepository = require("./repository/Order.repository");

//controllers
const AuthorController = require("./controllers/author.controller");
const CategoryController = require("./controllers/Category.controller");
const UserController = require("./controllers/User.controller");
const ItemController = require("./controllers/Item.controller");
const WishListController = require("./controllers/wishList.controller");
const CartController = require("./controllers/Cart.controller");
const ShoppingItemsController = require("./controllers/ShoppingItem.controller");
const OrderController = require("./controllers/Order.controller");
const { PORT, DB_URL } = require("./constants");

//instance repos
const authorRepository = new AuthorRepository();
const categoryRepository = new CategoryRepository();
const userRepository = new UserRepository();
const itemRepository = new ItemRepository();
const wishListRepository = new WishListRepository();
const cartRepository = new CartRepository();
const shoppingItemRepository = new ShoppingItemRepository();
const orderRepository = new OrderRepository();

//instance controllers
const authorController = new AuthorController(authorRepository);
const categoryController = new CategoryController(categoryRepository);
const userController = new UserController(userRepository);
const itemController = new ItemController(itemRepository);
const wishListController = new WishListController(
  wishListRepository,
  itemRepository,
  userRepository
);
const cartController = new CartController(cartRepository);
const shoppingItemsController = new ShoppingItemsController(
  userRepository,
  cartRepository,
  itemRepository,
  shoppingItemRepository
);
const orderController = new OrderController(
  cartRepository,
  orderRepository,
  shoppingItemRepository,
  itemRepository
);


const app = express();
app.use(cors());
app.use(express.json());
const mainRouter = express.Router();
const mainAdminRouter = express.Router();

app.use(`${DB_URL}`, mainRouter);

mainRouter.use("/user", userRouter(userController));

mainRouter.use("/item", itemRouter(itemController));

mainRouter.use("/category", categoryRouter(categoryController));

mainRouter.use("/admin", mainAdminRouter);
mainAdminRouter.use("/item", adminItemRouter(itemController));
mainAdminRouter.use("/itemType", adminItemTypeRouter(itemController));
mainAdminRouter.use("/user", adminUserRouter(userController));
mainAdminRouter.use("/category", adminCategoryRouter(categoryController));
mainAdminRouter.use("/order", adminOrderRouter(orderController));
mainAdminRouter.use("/author", adminAuthorRouter(authorController));

mainRouter.use("/cart", cartRouter(cartController));

mainRouter.use("/shoppingItem", shoppingItemRouter(shoppingItemsController));

mainRouter.use("/order", orderRouter(orderController));

mainRouter.use("/author", authorRouter(authorController));

mainRouter.use("/wishList", wishListRouter(wishListController));

mainRouter.use("/stripe", stripe(orderController));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ....`);
});
