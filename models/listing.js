const mongoose=require("mongoose");
const reviews = require("./reviews");
const { required } = require("joi");
const schema=mongoose.Schema;
const listingSchema=new schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename: String,
        url: {
            type:String,
            set:(v)=>v===""?"https://tse3.mm.bing.net/th?id=OIP.bqo6fdJ4kA_mexrs3hT52wHaEo&pid=Api&P=0&h=180":v,
        },
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:schema.Types.ObjectId,
            ref:"review"
        },
    ],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    }
});
listingSchema.post("findOneAndDelete",async (listing) => {
    if(listing){
        await reviews.deleteMany({_id:{$in:listing.reviews}});
    }
});
const listing=mongoose.model("listing",listingSchema);
module.exports=listing;