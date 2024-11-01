const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    title :{
        type:String,
        required : [true,"Post title is required"],
    },
    description :{
        type:String,
        required : [true,"Post title is required"],
    },
    photo: {
        type:String,
        required: [true,"post image is required"],
    }
},{
    timestamps:true,

});

//compile the post model
const Post = mongoose.model("Post",postSchema);
module.exports=Post;
