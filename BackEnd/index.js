require("dotenv").config();
require("./db");
const express = require("express");
const userRouter = require("./routes/User.router");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World from node!");
// });

app.use(`${process.env.API_URL}user`, userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});
