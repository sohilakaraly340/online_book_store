const review = require("../models/Review");

class ReviewRepository {
  async createReview(body) {
    return await review.create(body);
  }

  async getAllItemReview(id) {
    return review.find({ item: id }).populate("user").populate("item");
  }

  async getReviews(_id) {
    return review.findOne({ _id }).populate("user").populate("item");
  }

  async deleteReview(_id) {
    return await review.deleteOne({ _id });
  }

  async updateReview(_id, body) {
    return await review.updateOne({ _id }, body);
  }

  async getAllReviews() {
    return await review
      .find()
      .populate({
        path: "user",
        select: "firstName images",
      })
      .populate({
        path: "item",
        select: "title images",
      });
  }
}

module.exports = ReviewRepository;
