const Listing=require("./models/listing");
const Review=require("./models/reviews");
module.exports.isLoggedIn = (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You need to login to create a new listing :)");
        return res.redirect("/login"); // Add return here
    }
    next(); // Only called if the user is authenticated
};
module.exports.saveRedirecturl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner=async (req,res,next)=>{
    let { id } = req.params; 
    const l = await Listing.findById(id); // Await the result
    if (!l) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    // Check if the current user is the owner
    if (!l.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports.isreviewAuthor = async (req, res, next) => {
    let { reviewId } = req.params; // Get the reviewId from the request parameters
    const r = await Review.findById(reviewId); // Find the review by reviewId
    if (!r) {
        req.flash("error", "Review not found.");
        return res.redirect(`/listings/${req.params.id}`); // Redirect to the listing if review not found
    }
    // Check if the current user is the author of the review
    if (!r.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review.");
        return res.redirect(`/listings/${req.params.id}`); // Redirect to the listing if not the author
    }
    next(); // Proceed to the next middleware if the user is the author
};