import React, { PureComponent } from 'react'
import StripeCheckout from "react-stripe-checkout";

export default class CreatePrice extends PureComponent {
    render() {
        const handleClick = async (event) => {            
            const response = await fetch("/create-session", {
              method: "POST",
            });
        }
        return (
            <div>
                <h1>Welcome to Create Price</h1>

                <button id="checkout-button" role="link" onClick={handleClick}>Create Product</button>
                
            </div>
        )
    }
}
