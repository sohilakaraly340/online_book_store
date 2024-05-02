const Category = require("../models/Category.schema");

const createCategoryService = async (body) => {
  try {
    return await Category.create(body);
  } catch (error) {
    console.log(error);
  }
};

const findCategory = async (id) => {
  return await Category.findOne({ _id: id });
};

const getAllCategoriesService = async () => {
  return await Category.find();
};

module.exports = {
  createCategoryService,
  findCategory,
  getAllCategoriesService,
};
