require("dotenv").config();
require("./db");

const express = require("express");

//Routers//
const userRouter = require("./routes/User.router");
const itemRouter = require("./routes/Item.router");
const adminRouter = require("./routes/Admin.router");
const categoryRouter = require("./routes/Category.router");
const userProfile = require("./routes/userProfile.router");
const authorRouter = require("./routes/author.router");
const wishListRouter = require("./routes/whishList.router");
const cartRouter = require("./routes/Cart.router");

const cors = require("cors");

const item = require("./models/Item.schema");
const itemType = require("./models/ItemType.schema");
const category = require("./models/Category.schema");
const ShoppingItem = require("./models/ShoppingItem.schema");
const Cart = require("./models/Cart.schema");
const author = require("./models/Author.schema");

//Repositories
const CartRepository = require("./repository/Cart.repository");
const ItemRepository = require("./repository/Item.repository");

//Controllers
const CartController = require("./controllers/Cart.controller");
const ShoppingItemRepository = require("./repository/ShoppingItem.repository");
const ShoppingItemsController = require("./controllers/ShoppingItem.controller");

const app = express();
app.use(cors());
app.use(express.json());

//Instance of Repositries
const cartRepository = new CartRepository(Cart, ShoppingItem);
const itemRepository = new ItemRepository(item, itemType, category, author);
const shoppingItemRepository = new ShoppingItemRepository(ShoppingItem);

//Instance of Controllers
const cartController = new CartController(
  cartRepository,
  itemRepository,
  shoppingItemRepository
);

const shoppingItemsController = new ShoppingItemsController(
  cartRepository,
  itemRepository,
  shoppingItemRepository
);

app.use(`${process.env.API_URL}user`, userRouter);

app.use(`${process.env.API_URL}item`, itemRouter);

app.use(`${process.env.API_URL}category`, categoryRouter);

app.use(`${process.env.API_URL}admin`, adminRouter);

app.use(
  `${process.env.API_URL}cart`,
  cartRouter(cartController, shoppingItemsController)
);

app.use(`${process.env.API_URL}profile`, userProfile);

app.use(`${process.env.API_URL}author`, authorRouter);

app.use(`${process.env.API_URL}wishList`, wishListRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});
