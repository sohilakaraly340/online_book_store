const { required } = require("joi");
const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, "Item is required"]
    },
    rate: {
        type: Number,
        min: 1,
        max: 5
    }
})
const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;