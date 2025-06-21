const Listing=require("../models/listing");
const Reviews=require("../models/reviews");

module.exports.createreview=async (req,res)=>{
    //console.log(req.params.id);
    let l= await  Listing.findById(req.params.id);
    let r=new Reviews(req.body.review);
    r.author=req.user._id;
    l.reviews.push(r);
    await r.save();
    await l.save();
    req.flash("success","New Review Created..");
    res.redirect(`/listings/${l._id}`);
};
module.exports.deletereview=async (req, res) => {
    const { id, reviewId } = req.params; // Destructure parameters from request
    try {
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Reviews.findByIdAndDelete(reviewId);
        req.flash("success","Review Deleted..");
        res.redirect(`/listings/${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while deleting the review.");
    }
};