import React from 'react'
import stripe from 'stripe';

const TeacherAccount = () => {
    const teacheraccounthandler=async()=>{
        const stripeClient=new stripe("sk_test_51NXNWpKyWdxd7WwsMPwjvE7we74TB92fp6Q81hG9wQur2b5pUmsLZV0ZkvYh9di0ziiu5GXIXcxVW9FanroQMepZ00IhXDsxy2",{
            apiVersion:"2022-11-15"
        });
        const account = await stripeClient.accounts.create({
            country:"GB",
            type: 'express',
            capabilities: {
                card_payments: {
                  requested: true,
                },
                transfers: {
                  requested: true,
                },
              },
              business_type:"individual",
              business_profile:{
                url:"https://www.trips.com",
              },
            
            });
            let connectedId=account.id;
            console.log(connectedId)

    }
  return (
    <div>
        <button onClick={teacheraccounthandler}>New Teacher Account</button>
    </div>
  )
}

export default TeacherAccount