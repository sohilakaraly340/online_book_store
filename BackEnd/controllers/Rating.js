class RatingController{
    constructor(ratingRepo){
        this.ratingRepo = ratingRepo
    }
    async createRate(body){
        return await this.ratingRepo.createRate(body);
    }

    async getUserRate(body){
        return await this.ratingRepo.getUserRate(body);
    }

    async getAllItemRate(item){
        return await this.ratingRepo.getAllItemRate(item);
    }
}
module.exports = RatingController;