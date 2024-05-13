const express = require("express");

const router = express.Router();

const authorRouter = (authorController) => {

  router.get("/", async (req, res) => {
    try{
        const authors = await authorController.getAllAuthor();
        if (authors.length == 0) res.status(404).json("There are no Authors");
        else {
          res.status(200).json({ success: true, data: authors });
        }
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
  });

  router.post('/',async (req,res)=>{
    try{
        const newAuthor=await authorController.createAuthor(req.body);
        res.status(200).json({success:true, data : newAuthor})

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
  });

  router.get('/books/:id',async(req,res)=>{
    try{
        const allBooks= await authorController.getBooksOfAuthor(req.params.id)
        if(allBooks.length==0) {
            res.status(404).json(" this author hasn't have any books")
           }
       else {res.status(200).json({success: true, data: allBooks})};

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
};


module.exports = authorRouter;
