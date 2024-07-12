const mongoose = require("mongoose");


const RecipeSchema = new mongoose.Schema({
    recipetitle:{
        type:String,
        required:true,
    },
    recipedescription:{
        type:String,
        required:true,
    },
    recipebody:{
        type:String,
        required:true,

    },
    author:{
        type:String,
        required: false,
    },
    preptime:{
        type:Number,
        required:false,
    },

    recipestep:{
        type:String,
        required:false,
    },

    recipephoto:{
        type:Buffer,
        required:false,
    },

},{timestamps: true})



module.exports = mongoose.model("Recipe", RecipeSchema);