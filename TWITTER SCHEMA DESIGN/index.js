const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connect  = ()=>{
    mongoose.connect("mongodb://localhost:27017/twitter")
}

// ******************User Schema ********************
//step 1 : creating schema
const userSchema = new mongoose.Schema({
    userName : {type:String, required:true, unique: true},
    email : {type:String, required:true, unique: true},
    password : {type:String, required:true}
},
{
    timestamps:true
})

//step 2 : creating a model
const User = new mongoose.model("user",userSchema)


// *****************Tweet Schema *********************
//step 1 : creating schema
const tweetSchema = new mongoose.Schema({
    title : {type:String, required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true}
   
},
{
    timestamps:true
})

//step 2 : creating a model
const Tweet = new mongoose.model("tweet",tweetSchema)


// *****************Comments Schema *********************
//step 1 : creating schema
const commentSchema = new mongoose.Schema({
    body : {type:String, required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true}

   
},
{
    timestamps:true
})

//step 2 : creating a model
const Comment = new mongoose.model("comment",commentSchema)



//CRUD operation
//get
//user crud
app.get("/users", async(req,res)=>{
    try {
        const users = await User.find().lean().exec()
        return res.send({users:users})
    } catch (error) {
        console.log(error)
    }
})

app.listen(5000, async () =>{
  try {
    await connect();
    console.log("listening to the port 5000")
  } catch (error) {
      console.log(error)
  }
})