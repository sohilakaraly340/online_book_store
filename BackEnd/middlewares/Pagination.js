const paginate = (model)=>{
    return async(req,res,next)=>{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;

        const result ={};

        if(endIndex < (await model.countDocuments().exec())){
            result.next ={
                page: page+1,
                limit: limit
            }
        }

        if(startIndex > 0){
            result.previous={
                page: page-1,
                limit: limit
            }
        }
        
        try{
            result.results = await model.find().limit(limit).skip(startIndex);
            req.paginatedResult = result;
            next();

        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = paginate