class AuthorRepository{
    constructor(author,item){
        this.author=author;
        this.item=item
    }
    
    async createNewAuthor(body){
        try{
            const newAuthor =await this.author.create(body);
            return newAuthor;

        }catch(error){
            throw new Error(error.message);
        }
    }

   async getAll(){
    try{
        const authors=await this.author.find();
        return authors;   
    }
    catch(error){
        throw new Error(error.message);
    }
    }

    async getAllBooks(authorId){
        try{
            const books=await this.item.find({authorId})
            // console.log(books);
            return books;
           
        }catch(error){
            throw new Error(error.message);
        }

    }
}
module.exports=AuthorRepository;