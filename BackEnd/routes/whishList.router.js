const express= require('express');
const WishListController = require('../controllers/whishList.controller');
const WishListRepository = require('../repository/whishList.repository');
const wishListRouter=express.Router();
const user= require('../models/User.schema')
const ItemRepository = require('../repository/Item.repository');
const UserRepository = require('../repository/User.repository');
const ItemController = require('../controllers/Item.controller');
const UserController = require('../controllers/User.controller');

const item = require("../models/Item.schema");
const itemType = require("../models/ItemType.schema");
const category = require("../models/Category.schema");


const wishListRepository= new WishListRepository(user)
const itemRepo=new ItemRepository(item, itemType , category)
const userRepo = new UserRepository(user)
const wishListController=new WishListController(wishListRepository,itemRepo,userRepo);

const itemController = new ItemController(itemRepo);
const userController = new UserController(userRepo)

wishListRouter.get('/',(req,res)=>wishListController.getAllUsersWishList(req,res))
wishListRouter.post('/',(req,res)=>wishListController.updateWishList(req,res))

module.exports=wishListRouter;