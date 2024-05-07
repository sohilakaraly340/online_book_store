require("dotenv").config();
require("./db");
const express = require("express");
const userRouter = require("./routes/User.router");
const itemRouter = require("./routes/Item.router");
const adminRouter = require("./routes/Admin.router");
const categoryRouter = require("./routes/Category.router");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use(`${process.env.API_URL}user`, userRouter);
app.use(`${process.env.API_URL}item`, itemRouter);
app.use(`${process.env.API_URL}category`, categoryRouter);
app.use(`${process.env.API_URL}admin`, adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});