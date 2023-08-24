import React from 'react'
import { Stripestate } from '../context/Stripeprovider'
import stripe from 'stripe'
import {useNavigate} from "react-router-dom"

const Checkout = () => {
    const {setClientsecret}=Stripestate();
    const navigate=useNavigate();

    const paymentIntenthandler=async()=>{
        const stripeClient=new stripe("sk_test_51NXNWpKyWdxd7WwsMPwjvE7we74TB92fp6Q81hG9wQur2b5pUmsLZV0ZkvYh9di0ziiu5GXIXcxVW9FanroQMepZ00IhXDsxy2",{
            apiVersion:"2022-11-15"
        });
        let totalAmount=10000;
        
        if(!totalAmount){
            alert("can't initial payment"); return;
        }
        let plateformAmount=totalAmount*0.20;
        let teacherAmount=totalAmount*0.80;

        try {
            const paymentIntent=await stripeClient.paymentIntents.create({
                amount:teacherAmount,
                currency:"usd",
                automatic_payment_methods:{
                    enabled:true,
                },
                application_fee_amount:plateformAmount,
                transfer_data:{
                    destination:"acct_1Ng9DC4KVlRvwoGf"
                }
            });
            const clientsecret=paymentIntent.client_secret;
            setClientsecret(clientsecret);
            navigate('/payment')
    
            
        } catch (error) {
            alert("!connection Error, can't complete the payment process")
            
        }
        

    }
  return (
    <div>
        <button onClick={paymentIntenthandler}>Checkout</button>
    </div>
  )
}

export default Checkout