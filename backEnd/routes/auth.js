const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer();

//Register
router.post("/register",upload.none(), async (req,res)=>{
    try{
     
        const existingUser = await User.findOne({
            $or: [
                {email: req.body.email},
                {username: req.body.username}
            ]
        })


        if(existingUser){
            return res.status(400).json({message: "Username or email already Exists"})
        }
      
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);


        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,

        });

        const user = await newUser.save(); //save to database
        res.status(200).json({message: "success"});
    }catch(err){res.status(500).json(err)}
})
//Login
router.post("/login", async (req,res) =>{
    try{
        const user = await User.findOne({username: req.body.username})
         if(!user){
            return res.status(400).json("Wrong credentials!");
         }


        
        const validate = await bcrypt.compare(req.body.password, user.password)
         if(!validate){
           return res.status(400).json("Wrong credentials");
         }


        const {password, ...others} = user._doc;
        res.status(200).json({others})

    }catch(err){res.status(500).json(err)}
});
module.exports = router;