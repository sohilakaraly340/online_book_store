require("dotenv").config();
require("./db");

const express = require("express");
/////Router/////
const userRouter = require("./routes/User.router");
const itemRouter = require("./routes/Item.router");
const categoryRouter = require("./routes/Category.router");
const userProfile = require("./routes/userProfile.router");
const authorRouter = require("./routes/author.router");
const wishListRouter = require("./routes/whishList.router");
const cartRouter = require("./routes/Cart.router");

const adminUserRouter = require("./routes/admin/UserRoutes");
const adminItemRouter = require("./routes/admin/ItemRouter");
const adminItemTypeRouter = require("./routes/admin/ItemTypeRouter");
const adminCategoryRouter = require("./routes/admin/CategoryRouter");

/////models/////
const author = require("./models/Author.schema");
const item = require("./models/Item.schema");
const itemType = require("./models/ItemType.schema");
const category = require("./models/Category.schema");
const user = require("./models/User.schema");

/////repository/////
const AuthorRepository = require("./repository/author.repository");
const CategoryRepository = require("./repository/Category.repository");
const UserRepository = require("./repository/User.repository");
const UserProfileRepo = require("./repository/userProfile.repository");
const ItemRepository = require("./repository/Item.repository");
const WishListRepository = require("./repository/whishList.repository");

/////controller/////
const AuthorController = require("./controllers/author.controller");
const CategoryController = require("./controllers/Category.controller");
const UserController = require("./controllers/User.controller");
const UserProfileController = require("./controllers/UserProfile.controller");
const ItemController = require("./controllers/Item.controller");
const WishListController = require("./controllers/whishList.controller");

/////instance repo/////
const authorRepository = new AuthorRepository(author, item);
const categoryRepository = new CategoryRepository(category, item);
const userRepository = new UserRepository(user);
const userProfileRepository = new UserProfileRepo(user);
const itemRepository = new ItemRepository(item, itemType, category, author);
const wishListRepository = new WishListRepository(user);

/////instance control/////
const authorController = new AuthorController(authorRepository);
const categoryController = new CategoryController(categoryRepository);
const userController = new UserController(userRepository);
const userProfileController = new UserProfileController(userProfileRepository);
const itemController = new ItemController(itemRepository);
const wishListController = new WishListController(
  wishListRepository,
  itemRepository,
  userRepository
);

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const mainRouter = express.Router();
const mainAdminRouter = express.Router();

app.use(`${process.env.API_URL}`, mainRouter);

mainRouter.use("/user", userRouter(userController));

mainRouter.use("/item", itemRouter(itemController));

mainRouter.use("/category", categoryRouter(categoryController));

mainRouter.use("/admin", mainAdminRouter);
mainAdminRouter.use("/item", adminItemRouter(itemController));
mainAdminRouter.use("/itemType", adminItemTypeRouter(itemController));
mainAdminRouter.use("/user", adminUserRouter(userController));
mainAdminRouter.use("/category", adminCategoryRouter(categoryController));

mainRouter.use("/cart", cartRouter);

mainRouter.use("/profile", userProfile(userProfileController));

mainRouter.use("/author", authorRouter(authorController));

mainRouter.use("/wishList", wishListRouter(wishListController));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Using custom statusCode if available
  res.status(statusCode).json({ success: false, message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});
