const express =require('express')
const mongoose=require("mongoose")
require("./conn")
const cors =require('cors')
const userRoutes = require('./routes/UserRoutes')

const app =express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/user",userRoutes);

app.get("/",(req,res)=>{
    res.send("hello worlds");
})

app.listen(port,()=>{
    console.log(`listening to port: ${port}`);
})