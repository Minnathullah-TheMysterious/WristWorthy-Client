import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../stripePayment/StripeCheckoutForm";
import "../stripePayment/Stripe.css";
import { useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutPage = () => {
  const currentOrder = useSelector((state) => state?.user?.currentOrder);
  console.log(currentOrder);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
      meta: { order_id: currentOrder._id },
      //meta info will go to the stripe => and then to our webhook.
      //so we can conclude that the payment was successful, even if client closes window after client closes
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    //eslint-disable-next-line
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckoutPage;
