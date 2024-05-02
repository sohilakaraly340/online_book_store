const express = require("express");
const { getItemById, getAllItems } = require("../controllers/Item.controller");

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);

module.exports = router;
