const express = require("express");
const router = express.Router();
// INDEX - GET all posts
router.get("/", (req, res) => {
    res.send("GET for all posts");
});
// SHOW - GET a specific post by ID
router.get("/:id", (req, res) => {
    res.send("GET for post id");
});
//POST 
router.post("/",(req,res)=>{
    res.send("POST for posts");
});
//DELETE
router.delete("/:id",(req,res)=>{
    res.send("DELETE for posr id");
});
module.exports=router;