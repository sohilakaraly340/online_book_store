class ReviewController{
    constructor(reviewRepo){
        this.reviewRepo = reviewRepo;
    }

    async createReview(body){
        return await this.reviewRepo.createReview(body);
    }

    async getAllReviews(id){
        return await this.reviewRepo.getAllItemReview(id);
    }

    async getReviews(id){
        return await this.reviewRepo.getReviews(id);
    }

    async deleteReview(id){
        return await this.reviewRepo.deleteReview(id);
    }

    async updateReview(id,body){
        return await this.reviewRepo.updateReview(id,body);
    }

}
module.exports = ReviewController;