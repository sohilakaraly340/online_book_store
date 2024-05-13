const express = require("express");
const router = express.Router();

// const CategoryController = require("../controllers/Category.controller");
// const CategoryRepository = require("../repository/Category.repository");
// const category = require("../models/Category.schema");
// const item = require("../models/Item.schema");

// const categoryRepository = new CategoryRepository(category, item);
// const categoryController = new CategoryController(categoryRepository);

const categoryRouter=(categoryController)=>{
  router.get("/", async(req, res) => {
    try{
      const allCategory = await categoryController.findAllCategories();
      res.status(200).json({success: true , data: allCategory})
    }catch(error){
      res.status(500).json({ success: false, message: error.message });
    }
  });

  
  return router;

}

// router.get("/:id", (req, res) =>
//   categoryController.findItemsOfCategory(req, res)
// );

module.exports = categoryRouter;
