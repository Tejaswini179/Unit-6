const express = require('express');

const app = express();

const posts = require('./posts');
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
max : 10,
windowMs : 60000
})

app.get('/posts', limiter, (req,res)=>{
    res.send({
        status: "success",
        posts : posts
    })
})
app.listen(5000, () => console.log("Listening on port 5000 "))
