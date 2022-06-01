import React from 'react'
import { useState } from 'react';

function loadScript(src){
  return new Promise(resolve=>{
    const script = document.createElement("script");
    script.src = src
  
    script.onload  = ()=>{
      resolve(true)
    }
    script.onerror = () =>{
      resolve(false)
    }
    document.body.appendChild(script)
  })

  }

  const _DEV_ = document.domain === 'localhost'



export default function App() {

  const [name, setName] = useState('Tejaswini');

  async function displayRazorpay(){
   const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

   if(!res){
     alert("Razorpay SDK failed to load. Are you online?");
     return
   }

   const data = await fetch('http://localhost:5000/orders/pay',{method: 'POST'} )
                 .then(t => t.json())
                 console.log(data)
   const options = {
    key: _DEV_?'rzp_test_Jfa5nmywl9aLQ8':'PRODUCTION_KEY', // Enter the Key ID generated from the Dashboard
    currency: data.currency,
    amount: data.amount,
    order_id:data.id,
    name: "Donation",
    description: "Test Transaction",
    image: "https://example.com/your_logo",

    handler: function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
        alert("Payment sucessful !!!!!!!!!!")
    },
    prefill: {
        name,
        email: "gaurav.kumar@example.com",
        contact: "9999999999"
    },
   
};

var paymentObject = new Razorpay(options);
paymentObject.open()
}

                            
  return (
    <div>
<a
					className="App-link"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Donate $5
				</a>
    </div>
  )
}





