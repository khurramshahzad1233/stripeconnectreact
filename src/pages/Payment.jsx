import React from 'react';
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js";
import {Stripestate} from "../context/Stripeprovider"
import CheckoutForm from './CheckoutForm';

const stripePromise=loadStripe("pk_test_51NXNWpKyWdxd7WwsHOB1NKt5KqOj703qjGofeiwpkAnxIShrxac3K7NTHwC1PWVxPRwBzm3jiAjr2ugohCBVDQo400L8scRgGI")

const Payment = () => {
    const {clientsecret}=Stripestate()
    
    
console.log(clientsecret)
    const options={
        clientSecret: clientsecret
    }

    
  return (
    <Elements stripe={stripePromise} options={options}>
        <CheckoutForm/>
    </Elements>
  )
}

export default Payment