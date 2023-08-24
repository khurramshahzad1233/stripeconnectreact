import React from 'react';
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';

const stripePromise=loadStripe("pk_test_51NXNWpKyWdxd7WwsHOB1NKt5KqOj703qjGofeiwpkAnxIShrxac3K7NTHwC1PWVxPRwBzm3jiAjr2ugohCBVDQo400L8scRgGI")

const Payment = () => {
    
  return (
    <Elements stripe={stripePromise}>
        <CheckoutForm/>
    </Elements>
  )
}

export default Payment