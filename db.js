const mongoose=require("mongoose");
require("dotenv").config();
const connection=mongoose.connect("mongodb+srv://madhusudhan03833:madhusudhanmongodb03833@cluster0.7xo7j5y.mongodb.net/mock")

module.exports={
    connection
}