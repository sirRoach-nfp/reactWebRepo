const express = require("express")
const app = express();
const cors = require('cors');

const dotenv = require("dotenv")
app.use(express.json())
app.use(cors()); 
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const postRoute = require("./routes/Post")
const recipeRoute = require("./routes/Recipe")
const likedRecipeRoute = require("./routes/LikedRecipe");

//model

app.use(cors({
    origin: "https://frontend-kzkr.onrender.com", // Replace with your frontend Render domain
    methods: ["GET", "POST"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Specify allowed headers
}));




dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(console.log("connected to mongoDB"))
.catch((err) => console.log(err));


app.use("/api/likedrecipe",likedRecipeRoute);
app.use("/api/auth", authRoute);
app.use("/api/users",usersRoute);
app.use("/api/post",postRoute);
app.use("/api/recipe",recipeRoute);

app.use("/lama",(req,res) =>{
    console.log("this is main");
    res.send("Hello, World!");
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});