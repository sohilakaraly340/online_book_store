require("dotenv").config();
require("./db");

const express = require("express");
/////Router////
const userRouter = require("./routes/User.router");
const itemRouter = require("./routes/Item.router");
const adminRouter = require("./routes/Admin.router");
const categoryRouter = require("./routes/Category.router");
const userProfile = require("./routes/userProfile.router");
const authorRouter = require("./routes/author.router");
const wishListRouter = require("./routes/whishList.router");
const cartRouter = require("./routes/Cart.router");
///////////////////////////////////////////////
const { validatUsers } = require("./validation/User.validator");
////////models//////////
const author = require("./models/Author.schema");
const item = require("./models/Item.schema");
const itemType = require("./models/ItemType.schema");
const category = require("./models/Category.schema");
const user = require("./models/User.schema");
//////////////////////////////////

////////repository//////
const AuthorRepository = require("./repository/Author.repository");
const CategoryRepository = require("./repository/Category.repository");
const UserRepository = require("./repository/User.repository");
const UserProfileRepo = require("./repository/UserProfile.repository");
const ItemRepository = require("./repository/Item.repository");
const WishListRepository = require("./repository/whishList.repository");

/////////////////////////////

/////////controller/////
const AuthorController = require("./controllers/Author.controller");
const CategoryController = require("./controllers/Category.controller");
const UserController = require("./controllers/User.controller");
const UserProfileController = require("./controllers/UserProfile.controller");
const ItemController = require("./controllers/Item.controller");
const WishListController = require("./controllers/whishList.controller");
///////////////////////////

/////instance repo////
const authorRepository = new AuthorRepository(author, item);
const categoryRepository = new CategoryRepository(category, item);
const userRepository = new UserRepository(user);
const userProfileRepository = new UserProfileRepo(user);
const itemRepository = new ItemRepository(item, itemType, category, author);
const wishListRepository = new WishListRepository(user);

////instance control///
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

app.use(`${process.env.API_URL}user`, userRouter(userController));

app.use(`${process.env.API_URL}item`, itemRouter(itemController));

app.use(`${process.env.API_URL}category`, categoryRouter(categoryController));

app.use(
  `${process.env.API_URL}admin`,
  adminRouter(itemController, userController, categoryController)
);

app.use(`${process.env.API_URL}cart`, cartRouter);

app.use(`${process.env.API_URL}profile`, userProfile(userProfileController));

app.use(`${process.env.API_URL}author`, authorRouter(authorController));

app.use(`${process.env.API_URL}wishList`, wishListRouter(wishListController));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});
