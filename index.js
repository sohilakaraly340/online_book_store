require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");

//routers
const userRouter = require("./routes/User");
const itemRouter = require("./routes/Item");
const categoryRouter = require("./routes/Category");
const authorRouter = require("./routes/Author");
const wishListRouter = require("./routes/WishList");
const cartRouter = require("./routes/Cart");
const shoppingItemRouter = require("./routes/ShoppingItem");
const orderRouter = require("./routes/Order");
const stripe = require("./routes/Stripe");

const reviewRouter = require("./routes/Review");
const ratingRouter = require("./routes/Rating");

const event = require("./routes/Event");
const ticket = require("./routes/Ticket");
const usedItemRouter = require("./routes/UsedItem");

const adminUserRouter = require("./routes/admin/User");
const adminItemRouter = require("./routes/admin/Item");
const adminItemTypeRouter = require("./routes/admin/ItemType");
const adminCategoryRouter = require("./routes/admin/Category");
const adminOrderRouter = require("./routes/admin/Order");
const adminAuthorRouter = require("./routes/admin/Author");
const adminEventRouter = require("./routes/admin/Event");
const adminUsedItemRouter = require("./routes/admin/UsedItem");

//repositories
const AuthorRepository = require("./repositories/Author");
const CategoryRepository = require("./repositories/Category");
const UserRepository = require("./repositories/User");
const ItemRepository = require("./repositories/Item");
const WishListRepository = require("./repositories/WishList");
const CartRepository = require("./repositories/Cart");
const ShoppingItemRepository = require("./repositories/ShoppingItem");
const OrderRepository = require("./repositories/Order");

const ReviewRepository = require("./repositories/Review");
const RatingRepository = require("./repositories/Rating");

const EventRepository = require("./repositories/Event");
const TicketRepository = require("./repositories/Ticket");
const UsedItemRepository = require("./repositories/UsedItem");

//controllers
const AuthorController = require("./controllers/Author");
const CategoryController = require("./controllers/Category");
const UserController = require("./controllers/User");
const ItemController = require("./controllers/Item");
const WishListController = require("./controllers/WishList");
const CartController = require("./controllers/Cart");
const ShoppingItemsController = require("./controllers/ShoppingItem");
const OrderController = require("./controllers/Order");
const ReviewController = require("./controllers/Review");
const RatingController = require("./controllers/Rating");
const { PORT, DB_URL } = require("./constants");
const { NotFoundError } = require("./Errors/notFoundError");
const EventController = require("./controllers/Event");
const TicketController = require("./controllers/Ticket");
const UsedItemController = require("./controllers/UsedItem");

//instance repos
const authorRepository = new AuthorRepository();
const categoryRepository = new CategoryRepository();
const userRepository = new UserRepository();
const itemRepository = new ItemRepository();
const wishListRepository = new WishListRepository();
const cartRepository = new CartRepository();
const shoppingItemRepository = new ShoppingItemRepository();
const orderRepository = new OrderRepository();

const reviewRepository = new ReviewRepository();
const ratingRepository = new RatingRepository();

const eventRepository = new EventRepository();
const ticketRepository = new TicketRepository();
const usedItemRepository = new UsedItemRepository();

//instance controllers
const authorController = new AuthorController(authorRepository);
const categoryController = new CategoryController(categoryRepository);
const userController = new UserController(userRepository);
const itemController = new ItemController(itemRepository);
const wishListController = new WishListController(wishListRepository);
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

const reviewController = new ReviewController(reviewRepository);
const ratingController = new RatingController(ratingRepository);

const eventController = new EventController(eventRepository);
const ticketController = new TicketController(ticketRepository);
const usedItemController = new UsedItemController(usedItemRepository);

const mainRouter = express.Router();
const mainAdminRouter = express.Router();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(`${DB_URL}`, mainRouter);

mainRouter.use("/admin", mainAdminRouter);
mainAdminRouter.use("/item", adminItemRouter(itemController));
mainAdminRouter.use("/itemType", adminItemTypeRouter(itemController));
mainAdminRouter.use("/user", adminUserRouter(userController));
mainAdminRouter.use("/category", adminCategoryRouter(categoryController));
mainAdminRouter.use("/order", adminOrderRouter(orderController));
mainAdminRouter.use("/author", adminAuthorRouter(authorController));
mainAdminRouter.use("/event", adminEventRouter(eventController));
mainAdminRouter.use("/usedItem", adminUsedItemRouter(usedItemController));

mainRouter.use("/user", userRouter(userController));

mainRouter.use("/item", itemRouter(itemController));

mainRouter.use("/category", categoryRouter(categoryController));

mainRouter.use("/cart", cartRouter(cartController));

mainRouter.use("/shoppingItem", shoppingItemRouter(shoppingItemsController));

mainRouter.use("/order", orderRouter(orderController));

mainRouter.use("/author", authorRouter(authorController));

mainRouter.use("/wishList", wishListRouter(wishListController));

mainRouter.use("/review", reviewRouter(reviewController, itemController));

mainRouter.use("/rating", ratingRouter(ratingController));

mainRouter.use("/stripe", stripe(orderController));

mainRouter.use("/event", event(eventController));

mainRouter.use("/ticket", ticket(ticketController));

mainRouter.use("/usedItem", usedItemRouter(usedItemController));

app.all("*", (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ....`);
});
