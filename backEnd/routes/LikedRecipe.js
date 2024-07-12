const mongoose = require('mongoose');

const router = require("express").Router();
const LikedRecipe = require("../models/LikedRecipe");




router.post("/:recipeId/:user", async(req,res) => {
    const recipeId = req.params.recipeId;
    const user = req.params.user;
    try{   
    
        const newLike = new LikedRecipe({user:user,recipe:recipeId});
        await newLike.save();
        res.status(200).json("success");

    }catch(err){
        res.status(500).json(err);
    }
})


//get

router.get("/fetchLiked/:userid", async(req,res)=>{
    const userId = req.params.userid;

    

    try{
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const likedrecipe = await LikedRecipe.find({user: userId})
        .populate('user', 'username email')
        .populate('recipe', 'recipetitle');
        res.status(200).json(likedrecipe);
        console.log('Liked Recipes:', likedrecipe);
    }catch(err){
        console.error('Error fetching liked recipes:', err); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

module.exports = router;