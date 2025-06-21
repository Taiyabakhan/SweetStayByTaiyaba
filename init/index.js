const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing = require('../models/listing.js');

const  mongourl="mongodb://127.0.0.1:27017/websitebytee";

async function main (){
    await mongoose.connect(mongourl);
};

main().then(()=>{
    console.log("connected to database");
}).catch(err=>{
    console.log(err);
});

const initializedb=async()=>{
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data was inserted");
};
initializedb();