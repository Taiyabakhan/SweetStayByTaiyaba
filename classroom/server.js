const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
//app.use(session({secret:"itsasecret"}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session({
    secret:"itsasecret",
    resave:false,
    saveUninitialized:true,
}));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name="someone"}=req.query;
    req.session.name=name;
    req.flash("success","user registered successful");
    res.redirect("/hello");
    //console.log(req.session);
    //res.send(name);
});
app.get("/hello",(req,res)=>{
    // res.send(`hello ${req.session.name}`);
    res.locals.messages=req.flash("success");
    res.render("page.ejs",{name:req.session.name});
});
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`you send the request ${req.session.count} time`);
// });

// app.get("/test",(req,res)=>{
//     res.send("test successful");
// });

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});

// const users=require("./routes/user.js");
// const posts=require("./routes/post.js");
// const cookieParser=require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","china",{signed:true});
//     res.send("signed cookie sned");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("it-is-a","cookie");
//     res.send("send you a cookie");
// });

// app.get("/greet",(req,res)=>{
//     let {name="someone"}=req.cookies;
//     res.send(`Hi, ${name}`);
// });

// app.get("/",(req,res)=>{  
//     console.dir(req.cookies);
//     res.send("Hi ! I am root ");
// });

// app.use("/users",users);
// app.use("/posts",posts);