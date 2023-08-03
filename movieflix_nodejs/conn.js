const mongoose = require('mongoose')
const path = require('path')
const dbName= "student";
mongoose.set("strictQuery", false);
//creating and connecting to db
mongoose.connect("mongodb://0.0.0.0:27017/netflix",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection successful")
).catch((err)=>{
    console.log("error! couldnt connect")
    console.log(err)})
