const router = require("express").Router();
const Recipe = require("../models/Recipe");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single('recipephoto'),async (req,res) => {
    try{
        const newRecipe = new Recipe({
            recipetitle: req.body.recipetitle,
            recipedescription: req.body.recipedescription,
            recipebody: req.body.recipebody,
            author: req.body.author,
            preptime: req.body.recipeprep,
            recipephoto: req.file.buffer,
            recipestep: req.body.recipestep,
        });
        const post = newRecipe.save();
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err)
    }
})

//fetch recipe

router.get("/viewrecipe/:id", async (req,res) => {
    const id = req.params.id // changed from req.body.id to req.params.id
    try{
        const recipe = await Recipe.findById(id);
   
        res.status(200).json(recipe);
    }catch(err){res.status(500).json(err)}
});

//search recipe
router.get("/Search/:searchValue", async (req,res) => {
    const searchValue = req.params.searchValue;

    try{
        const recipes = await Recipe.find({ recipetitle: new RegExp(searchValue, 'i') });
        res.status(200).json(recipes);
    }catch(err){res.status(500).json(err)}
})


//fetch 10 random recipes
router.get("/recipes/random", async (req,res) =>{
    try{
        const recipes = await Recipe.aggregate([{
            $sample: {
                size: 10
            }
        }]);
        res.status(200).json(recipes);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//fetch sharedRecipe 
router.get("/shared/:username", async(req,res) => {
    try{
        const userName = req.params.username;

        const recipes = await Recipe.find({author: userName});
        res.status(200).json(recipes);
    }catch(err){
        res.status(500).json(err);
    }
});


router.get("/recipes/recommended/:count", async (req,res) =>{

    const count = parseInt( req.params.count);
    try{
        const recipes = await Recipe.aggregate([{
            $sample: {
                size: count
            }
        }]);
        res.status(200).json(recipes);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


//update recipe

router.put("/update/:id", upload.single('recipephoto'), async(req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).json({message: "Recipe not found"})
        }

        recipe.recipetitle = req.body.recipetitle || recipe.recipetitle;
        recipe.recipedescription = req.body.recipedescription || recipe.recipedescription;
        recipe.recipebody = req.body.recipebody || recipe.recipebody;
        recipe.author = req.body.author || recipe.author;
        recipe.preptime = req.body.preptime || recipe.preptime;
        if(req.file){
            recipe.recipephoto = req.file.buffer;
        }
        recipe.recipestep = req.body.recipestep || recipe.recipestep;

        const updatedRecipe = await recipe.save();
        res.status(200).json(updatedRecipe);


    }
    catch(err){
        res.status(500).json(err);
    }
})



//delete recipe
router.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id;
    const recipe = Recipe;
    recipe.findByIdAndDelete(id).then(result => {res.status(200).json(result)})
    .catch(err => {
        res.status(500).json(err);
    })
})


//fetch random 3 
router.get("/suggested", async(req,res) => {
    try{
        const random = await Recipe.aggregate([{
            $sample: {
                size: 3
            }
        }])
        res.status(200).json(random);
    }
    catch(err){
        res.status(500).json(err);
    }
})



router.get("/recommendedDisplay", async(req,res) =>{

    try{
        const recommendedDisplay =  await Recipe.aggregate([{

            $sample: {
                size: 5
            }

        }])

        res.status(200).json(recommendedDisplay);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;