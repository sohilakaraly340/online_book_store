require("dotenv").config();
require("./db");

const express = require("express");
/////Router////
const userRouter = require("./routes/User.router");
const itemRouter = require("./routes/Item.router");
const adminRouter = require("./routes/Admin.router");
const categoryRouter = require("./routes/Category.router");
const userProfile=require('./routes/userProfile.router');
const authorRouter=require('./routes/author.router');
const wishListRouter= require('./routes/whishList.router')
const cartRouter = require("./routes/Cart.router");
///////////////////////////////////////////////

////////models//////////
const author=require('./models/author.schema');
const item=require('./models/Item.schema');
const category = require("./models/Category.schema");
//////////////////////////////////

////////repository//////
const AuthorRepository = require('./repository/author.repository');
const CategoryRepository = require("./repository/Category.repository");

/////////////////////////////

/////////controller/////
const AuthorController = require('./controllers/author.controller');
const CategoryController = require("./controllers/Category.controller");
///////////////////////////



/////instance repo////
const authorRepository=new AuthorRepository(author,item);
const categoryRepository = new CategoryRepository(category, item);


////instance control///
const authorController= new AuthorController(authorRepository);
const categoryController = new CategoryController(categoryRepository);



const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use(`${process.env.API_URL}user`, userRouter);

app.use(`${process.env.API_URL}item`, itemRouter);

app.use(`${process.env.API_URL}category`, categoryRouter(categoryController));

app.use(`${process.env.API_URL}admin`, adminRouter);

app.use(`${process.env.API_URL}cart`, cartRouter);

app.use(`${process.env.API_URL}profile`, userProfile);

app.use(`${process.env.API_URL}author`, authorRouter(authorController));

app.use(`${process.env.API_URL}wishList`, wishListRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});
