const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require('bcrypt');


//update
router.put("/:id", async (req,res) => {

    if(req.body.userId === req.params.id){

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });

            res.status(200).json(updatedUser)
        } catch(err){
            res.status(500).json(err);
        }
    }

    else{
        res.status(401).json("You can update only your account");
    }
});


//delete


//fetchAccountInformation

router.post("/account/:accountId", async (req,res) =>{
    const accountId = req.params.accountId;

    try{
        const user = await User.findById(accountId);
        res.status(200).json(user);
    }catch(err){
        res.status(401).json("error")
    }

});

module.exports = router