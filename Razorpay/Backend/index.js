const app = require("express")()
const path = require('path');
const Razorpay = require('razorpay');
const cors = require('cors')
const shortid = require("shortid");
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json())
const razorpay = new Razorpay({
    key_id: process.env.YOUR_KEY_ID,
    key_secret: process.env.YOUR_SECRET
})

app.get('/img',(req,res)=>{
res.sendFile(path.join(__dirname,'img.svg'))
})
app.post("/verification",(req,res)=>{
    const secret= '12345678'

    console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')
  
    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
	
	
	} else {
	
	}

    res.json({status:'ok'})
})

app.post('/orders/pay',async(req,res)=>{
    // razorpay.orders.create(options)

    const payment_capture = 1
	const amount = 470
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

try {
    const response = await  razorpay.orders.create(options)
    console.log(response)
    res.json({
        id: response.id,
        currency:response.currency,
        amout: response.amount
    })
} catch (error) {
    console.log(error)
}


    })



app.listen(5000,()=>{
    console.log("App is running at port 5000 !!!!!!!!!!")
})