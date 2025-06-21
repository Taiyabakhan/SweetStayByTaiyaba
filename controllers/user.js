const User = require("../models/user");
module.exports.rendersignup=(req, res) => {
    res.render("./users/signup.ejs");
};
module.exports.handlesignup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body.user;
        const newUser  = new User({ email, username });
        const regUser  = await User.register(newUser , password); // This hashes the password
        console.log(regUser );
        req.login(regUser , (err) => {
            if (err) {
                return next(err); // Pass the error to the next middleware
            }
            req.flash("success", `Welcome ${username} to the SweetStay by Taiyaba`);
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup"); // Redirect back to signup on error
    }
};
module.exports.renderlogin=(req, res) => {
    res.render("./users/login.ejs");
};
module.exports.handlelogin=async (req, res) => {
    req.flash("success", "Welcome to SweetStay by Taiyaba !! You are logged in now :)");
    let redirecturl=res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);
};
module.exports.handlelogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!! ");
        res.redirect("/listings");
    })
};