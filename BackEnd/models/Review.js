const mongoose = require("mongoose")


const reviewSchema = mongoose.Schema({
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
    review: {
        type: String,
        required: true
    },
    dateOfReview: {
        type: Date,
        default: Date.now()
    }
})

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;