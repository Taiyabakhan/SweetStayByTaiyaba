const Listing=require("../models/listing");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });
module.exports.index=async (req,res)=>{
    const alllistings=await Listing.find({});
    res.render("./listings/index.ejs",{alllistings});
};
module.exports.newform=(req,res)=>{
    res.render("./listings/new.ejs");
};
module.exports.showpage=async (req, res) => {
    let { id } = req.params;
    const l = await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    if(! l){
        req.flash("error","Listing you requested does not exist!!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", {l});
};
module.exports.createform=async (req,res,next)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();
    let url=req.file.path;
    let filename=req.file.filename;
    //console.log(url,"..",filename);
    const newlisting =new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    newlisting.geometry=response.body.features[0].geometry;
    await newlisting.save();  
    req.flash("success","New Listing Created..");
    res.redirect("/listings");
};
module.exports.editform=async (req,res)=>{
    let {id}=req.params;
    const l=await Listing.findById(id);  
    if(!l){
        res.flash("error","Listing you requested does not exist!!");
        res.redirect("/listings");
    }
    let orgimgurl=l.image.url;
    orgimgurl=orgimgurl.replace("/upload","/upload/h_300,w_250");
    res.render("./listings/edit.ejs",{l,orgimgurl});
};
module.exports.updateform=async (req, res) => {
    let { id } = req.params; 
    let l=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        l.image={url,filename};
        await l.save();
    }
    req.flash("success", "Listing Updated :)");
    res.redirect(`/listings/${id}`);
};
module.exports.deletepage=async (req, res) => {
    let { id } = req.params; 
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated :)");
    res.redirect(`/listings/${id}`);
};