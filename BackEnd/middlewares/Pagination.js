const paginate = (model, populateOptions = []) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    try {
      const totalDocuments = await model.countDocuments().exec();
      const numOfPages = Math.ceil(totalDocuments / limit);

      if (endIndex < totalDocuments) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      let query = model.find().limit(limit).skip(startIndex);
      if (populateOptions.length > 0) {
        populateOptions.forEach((option) => {
          query = query.populate(option);
        });
      }

      result.results = await query.exec();

      req.paginatedResult = { ...result, numOfPages };
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = paginate;
