const router = require("express").Router();
const Post = require("../models/Post");


//upload
router.post("/upload", async (req,res) =>{

    try{
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            username: req.body.username,
        })

        const post = await newPost.save();
        res.status(200).json(post);
    } catch(err){
        res.status(500).json(err);
    }
})


//retrieve


module.exports = router;