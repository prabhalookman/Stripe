import { Console } from 'console'
import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class SubscribeUser extends React.PureComponent {
    onToken = (token) => {
        console.log('process.env.REACT_APP_STRIPE_PUBLISHABLE : ', process.env.REACT_APP_STRIPE_PUBLISHABLE)
        console.log("My Token : ", token)
    }

    render() {
        return (
            // going to grab the users credit card and then when it's done sending that to stripe server this callback gets called and gives us a token that we can do stuff with
            <StripeCheckout
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
            />
            // we have some IDS and Card details. we have to care here about token - this token is what we're gonaa send this server and we can use this token to tie the user onto their credit card and then charge them first subscription

            // We need to set up on the server to be able to receive token and do something with it
        )
    }
}