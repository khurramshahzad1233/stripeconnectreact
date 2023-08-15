import React from 'react'
import {PaymentElement} from "@stripe/react-stripe-js"
import {useStripe,useElements} from "@stripe/react-stripe-js"
const CheckoutForm = () => {
  const stripe=useStripe();
  const elements=useElements();

  const paymenthandler=async(event)=>{
    event.preventDefault();

    if(!stripe ||!elements){return};
    const result=await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:"http://localhost:3000/success",
      },
      
    });
    console.log(result)
    if(result.error){
      let errorMessage=result.error.message;
      alert(errorMessage)

    }
  }
  return (
    <form>
      <PaymentElement/>
      <button onClick={paymenthandler}>Submit</button>
    </form>
  )
}

export default CheckoutForm