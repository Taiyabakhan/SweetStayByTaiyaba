if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
console.log(process.env.secret);

const express=require("express");
const app=express();
const mongoose=require("mongoose");
//const mongourl="mongodb://127.0.0.1:27017/websitebytee";
const dburl=process.env.ATLASDB_URL;

const path=require("path");
const methodoverride=require("method-override");
const ejsmate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const mongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local").Strategy;
const User=require("./models/user.js");

const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

async function main (){
    await mongoose.connect(dburl);
};

main().then(()=>{
    console.log("connected to database");
}).catch(err=>{
    console.log(err);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine('ejs',ejsmate);
app.use('/public', express.static('public'));
const store=mongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:"mysupersecretcode",
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("error showing");
});
const sessionOptions={
    store,
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }, 
};

app.get("/",(req,res)=>{
    res.send("working");
});

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.use((err,req,res,next)=>{
    let {code=500,message="Something went wrong!!"}=err;
    res.status(code).render("error.ejs", { err });
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

//SCHEMA OF DATABASE
// app.get("/testlisting",async (req,res)=>{
//     let samplelisting=new listing({
//         title:"my new villa",
//         description:"with free car",
//         prices:1000000,
//         location:"miami",
//         country:"google krlo",
//     });
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successfully testing");
// });

