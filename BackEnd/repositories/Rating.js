const rating = require("../models/Rating");

class RatingRepository{
    async createRate(body){
        return await rating.create(body)
    }

    async getUserRate(body){
        return await rating.findOne({body});
    }

    async getAllItemRate(item){
        return await rating.find({item});
    }

}
module.exports = RatingRepository