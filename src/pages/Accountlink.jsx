import React from 'react'
import stripe from 'stripe';

const Accountlink = () => {

    const createaccountlinkhandler=async()=>{
        const stripeClient=new stripe("sk_test_51NXNWpKyWdxd7WwsMPwjvE7we74TB92fp6Q81hG9wQur2b5pUmsLZV0ZkvYh9di0ziiu5GXIXcxVW9FanroQMepZ00IhXDsxy2",{
            apiVersion:"2022-11-15"
        });
        const accountlink = await stripeClient.accountLinks.create({
            account: 'acct_1NfRNjQLndHvg2XG',
            type:"account_onboarding",
            return_url:"http://localhost:5000/success/account",
            refresh_url:"http://localhost:5000/error",

            
            });
            let accountLinkURL=accountlink.url;
            console.log(accountLinkURL)
    }
  return (
    <div>
        <button onClick={createaccountlinkhandler}>Create Account Link</button>
    </div>
  )
}

export default Accountlink