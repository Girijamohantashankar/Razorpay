import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setUserEmail } from "../redux/userSlice";
import "./Razorpay.css";

function Razorpay() {
  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  // console.log('User Name:', userName);
  // console.log('User Email:', userEmail);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay script failed to load");
      return;
    }

    const options = {
      key: "rzp_test_j7LSLWggtOClKJ",
      currency: "INR",
      amount: 10000,
      name: userName,
      email: userEmail,
      description: "Thanks for using",
      image:
        "https://lh3.googleusercontent.com/ogw/AKPQZvzTCdVmLQTwII8SfL7F6F6avFiQgIhIqWupC4Yr4c8=s32-c-mo",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment will be successful");
      },
      prefill: {
        name: userName,
        email: userEmail,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="container">
      <dive className="form">
        <h1 className="awesome">RazorPay Payment</h1>
        <input
        type="name"
          placeholder="Enter Username"
          id="user"
          value={userName}
          onChange={(e) => dispatch(setUserName(e.target.value))}
          required
        />
        <input
        type="email"
          placeholder="Enter Email"
          id="email"
          value={userEmail}
          onChange={(e) => dispatch(setUserEmail(e.target.value))}
          required
        />

        <button onClick={() => displayRazorpay()}>Pay now</button>
      </dive>
    </div>
  );
}

export default Razorpay;
