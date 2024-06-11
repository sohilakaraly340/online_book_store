const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "name must be at least 3 characters long"],
    required: [true, "name is required"],
  },
  description: {
    type: String,
    minLength: [5, "description must be at least 5 characters long"],
    required: [true, "description is required"],
  },
  date: {
    type: Date,
    required: [true, "date is required"],
  },
  location: {
    type: String,
  },
  numOfTickets: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USer",
    },
  ],
});
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
