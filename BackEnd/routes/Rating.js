const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

const ratingRouter = (ratingController)=>{
    router.post("/:id", auth,handleAsync(async(req,res)=>{
        const user = req.auth ;
        const item = req.params.id;
        const isRated = await ratingController.getUserRate({user: user._id, item});
        if(isRated)return res.status(401).send({ message: "this item already rated" });
        const rate = +req.body.rate

        const newRate = await ratingController.createRate({user: user._id, item,rate});
        res.status(201).json({success: true , data: newRate})
    }))
    return router;
}
module.exports = ratingRouter;