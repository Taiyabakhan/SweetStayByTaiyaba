const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirecturl } = require("../middleware.js");
const usercontroller=require("../controllers/user.js");
// Render signup page & Handle signup
router.route("/signup")
.get(usercontroller.rendersignup)
.post(wrapAsync(usercontroller.handlesignup));
// Render login page & Handle login
router.route("/login")
.get( usercontroller.renderlogin)
.post( saveRedirecturl ,passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}),usercontroller.handlelogin );
//logout route
router.get("/logout",usercontroller.handlelogout);
module.exports = router;

