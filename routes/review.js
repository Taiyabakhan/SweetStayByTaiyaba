const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Reviews = require('../models/reviews.js');
const Listing = require("../models/listing.js");
const { isLoggedIn, isreviewAuthor } = require("../middleware.js");
const reviewcontroller=require("../controllers/reviews.js");
// const validateReview=(req,res,next)=>{
//     let {error}=reviewschema.validate(req.body);
//     if(error){
//         let errmsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errmsg);
//     }else{
//         next();
//     }
// };

//REVIEWS
//POST REVIEWS ROUTE
router.post("/",isLoggedIn ,reviewcontroller.createreview);
//DELETE REVIEW ROUTE 
router.delete("/:reviewId",isreviewAuthor ,reviewcontroller.deletereview);
module.exports=router;