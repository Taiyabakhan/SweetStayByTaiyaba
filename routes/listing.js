const express=require("express");
const router=express.Router();
const Listing = require("../models/listing.js");
const wrapasync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner}=require("../middleware.js");  
const listingcontroller=require("../controllers/listings.js");
const  multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});

router.route("/")
.get(wrapasync (listingcontroller.index))
.post(isLoggedIn,upload.single('listing[image]'),wrapasync (listingcontroller.createform));
// .post(upload.single('listing[image]'),(req,res)=>{res.send(req.file)});

//NEW ROUTE 
router.get("/new" ,isLoggedIn,listingcontroller.newform);

router.route("/:id")
.get(wrapasync (listingcontroller.showpage))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), wrapasync(listingcontroller.updateform))
.delete(isLoggedIn,isOwner,wrapasync (listingcontroller.deletepage)); 

//EDIT ROUTE 
router.get("/:id/edit",isLoggedIn,isOwner,wrapasync (listingcontroller.editform));
module.exports=router;

// const validateListing=(req,res,next)=>{
//     let {error}=listingSchema.validate(req.body);
//     if(error){
//         let errmsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errmsg);
//     }else{
//         next();
//     }
// };