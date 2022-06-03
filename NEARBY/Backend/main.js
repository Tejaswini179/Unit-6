const { MongoClient } = require("mongodb");
const Express = require("express");
const Cors = require("cors");
const { connect } = require("mongoose");



const app = Express()
app.use(Cors());
app.use(Express.json())

const client = new MongoClient(
        "mongodb+srv://Tejaswini:Tejaswini@cluster0.0kblt.mongodb.net/sample_airbnb?retryWrites=true&w=majority",
        { 
            useUnifiedTopology: true 
        }
        );

var collection;
app.post("/search", async (req,res,next)=>{
try {
    let result = await collection.aggregate([
        {
            "$search":{
                "index":"autocomplete",
                "compound":{
                    "must":[
                        {
                            "autocomplete":{
                                "query": `${req.body.query}`,
                                "path":"name"
                            },
                            "geoWithin":{
                                "circle":{
                                    "center":{
                                        "type":"Point",
                                        "coordinates":[
                                            req.body.position.lng,
                                            req.body.position.lat
                                        ]
                                    },
                                    "radius":10000
                                },
                                "path":"address.location"
                            }
                        }
                    ]
                }
            }
        }
    ]).toArray();
     res.send(result)
} catch (error) {
    res.status(500).send({message:error.message})
}
})

app.listen(3000, async()=>{
    try {
        await client.connect()
        collection= client.db("sample_airbnb").collection("listingsAndReviews")
        console.log("listening to port 3000!!!")
    } catch (error) {
        console.log(error)
    }
})