import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {Elements,CardElement,useStripe,useElements,} from "@stripe/react-stripe-js";
// import  "bootswatch/dist/lux/bootstrap.min.css"; 

const stripePromise = loadStripe(
  "pk_test_51MANHLF0F0eh0GunYZojEqgP342QCv2IynEFyZeUT3InkHRRRILq8er35POaPs35J5ZgUzlyomgdizFw4O2N86yp00LveamUI8"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

   const {error,paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.get(CardElement),
    });
    if (!error){ 
    const {id} = paymentMethod
  
  }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className ="border-black">
      <CardElement />
      <button>buy</button>
    </form>
    </div>
  );
};

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
