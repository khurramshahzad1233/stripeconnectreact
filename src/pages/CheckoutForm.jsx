import React from 'react'
import {CardElement} from "@stripe/react-stripe-js"
import {useStripe,useElements} from "@stripe/react-stripe-js"
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const CheckoutForm = () => {
  const stripe=useStripe();
  const elements=useElements();

  const navigate=useNavigate()


  const paymenthandler=async(event)=>{
    event.preventDefault();

    if(!stripe ||!elements){return};
    const result=await stripe.createPaymentMethod({
      type:"card",
      card:elements.getElement(CardElement)
    });
    // console.log(result)
    let payment_method_id="";
    if(result.error){
      let errorMessage=result.error.message;
      alert(errorMessage)

    }else{
      payment_method_id=result.paymentMethod.id
      console.log(payment_method_id)
    };



    let bodydata={
      amount:10,
      currencyname:"usd",
      paymentintentid:payment_method_id,
      teacheraccountid:"acct_1NgiXMQShjsupu3o"
    }
    let payment=""

    try {
      payment=await axios.post("/api/stripe/paymentintent",bodydata,{
        headers:{
          "Content-Type":"application/json"
        }
      });
      
    } catch (error) {
      if(error.response && error.response.status===402){
        alert("insufficient funds");
        return;
      }else{
        console.error("error coming");
        alert("network issue, try again please")
        return;
      }
      
    }
    

    let paymentid="";
    let url=""
    if(payment.data.paymentIntent.status=== "requires_action" && payment.data.paymentIntent.next_action.type==="use_stripe_sdk"){
    
        
        url=payment.data.paymentIntent.next_action.use_stripe_sdk.stripe_js;
        paymentid=payment.data.paymentIntent.id
    
    }else if(payment.data.paymentIntent.status==="requires_capture"){
      
        
        paymentid=payment.data.paymentIntent.id;
        navigate("/payment/success")
        
    
    }else{
      
        
        alert("payment error occured, try again please")
        navigate("/payment/error");
    
    };

    const paymentstatusbody={
      clientintent:paymentid,
    }
    if(url){
      const securewindow=window.open(url);
      const checkstatus= setInterval(async()=>{
        let statusdata=await axios.post("/api/stripe/paymentstatus",paymentstatusbody,{
          headers:{
            "Content-Type":"application/json"
          }
        });
        // console.log(statusdata)
        if(statusdata.data.paymentstatus==="requires_capture"){
          securewindow.close();
          window.location.href="http://localhost:3000/payment/success"
          clearInterval(checkstatus);
        }
      },3000)
      
      
    
    }
    
    console.log(paymentid)
    
  }
  return (
    <form>
      <CardElement/>
      <button onClick={paymenthandler}>Submit</button>
    </form>
  )
}

export default CheckoutForm
