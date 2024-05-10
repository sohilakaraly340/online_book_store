const express=require('express');
const AuthorController = require('../controllers/author.controller');
const AuthorRepository = require('../repository/author.repository');
const authorRouter=express.Router();
const author=require('../models/author.schema')
const item=require('../models/Item.schema')

const authorRepository=new AuthorRepository(author,item)
const authorController= new AuthorController(authorRepository)

authorRouter.get('/',(req,res)=>authorController.getAllAuthor(req,res));
authorRouter.post('/',(req,res)=>authorController.createAuthor(req,res));
authorRouter.get('/books/:id',(req,res)=>authorController.getBooksOfAuthor(req,res));


module.exports=authorRouter;