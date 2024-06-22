
const mongoose = require('mongoose');

const paginate = (model, populateOptions = [], filterOptions = {}) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    try {
      
      const filterCriteria = { ...filterOptions };
      for (const key in req.query) {
        if (req.query.hasOwnProperty(key) && key !== "page" && key !== "limit") {
          if ((key === "category" || key === "itemType" || key === "authorId") && req.query[key] !== "all") {
     
            if (mongoose.Types.ObjectId.isValid(req.query[key])) {
              filterCriteria[key] =new mongoose.Types.ObjectId(req.query[key]);
            } else {
              return res.status(400).json({ message: `Invalid ${key} value` });
            }
          } else if (req.query[key] !== "all") {
            filterCriteria[key] = req.query[key];
          }
        }
      }

      
      const totalDocuments = await model.countDocuments(filterCriteria).exec();
      const numOfPages = Math.ceil(totalDocuments / limit);

      if (endIndex < totalDocuments) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      result.numOfPages = numOfPages;

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      let query = model.find(filterCriteria).limit(limit).skip(startIndex);
      if (populateOptions.length > 0) {
        populateOptions.forEach((option) => {
          query = query.populate(option);
        });
      }

      result.results = await query.exec();

      req.paginatedResult = { ...result, numOfPages };
      next();
    } catch (error) {
      console.error("Error in paginate middleware:", error);
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = paginate;
