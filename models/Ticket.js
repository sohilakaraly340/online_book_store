const mongoose = require("mongoose");

const tickettSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: {
    type: String,
    default: () => new Date().toLocaleString("en-US"),
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});
const Ticket = mongoose.model("Ticket", tickettSchema);
module.exports = Ticket;
