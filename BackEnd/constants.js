const PORT= process.env.PORT || 3000;
const DB_URL=process.env.API_URL;
const JWT_SECRET= "myjwtsecret";
const STRIPE_KEY= process.env.STRIPE_KEY;

module.exports={
    PORT,
    DB_URL,
    JWT_SECRET,
    STRIPE_KEY
}