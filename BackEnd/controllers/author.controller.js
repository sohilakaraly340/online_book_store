class AuthorController {
  constructor(authorRepo) {
    this.authorRepo = authorRepo;
  }

  async createAuthor(req,res){
    try{
        const newAuthor=await this.authorRepo.createNewAuthor(req.body);
        res.status(200).json({success:true , data : newAuthor}) ;

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }

  }


  async getAllAuthor(req, res) {
    try {
      const allAuthors = await this.authorRepo.getAll();
      if(allAuthors.length==0)res.status(404).json("There are no Authors")
        else{
            res.status(200).json({ success: true, data: allAuthors });
    }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getBooksOfAuthor(req,res){
    try{
        const books=await this.authorRepo.getAllBooks(req.params.id)
        if(books.length==0) {
             res.status(404).json(" this author hasn't have any books")
            }
        else {res.status(200).json({success: true, data: books})};
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
  }
}
module.exports = AuthorController;
