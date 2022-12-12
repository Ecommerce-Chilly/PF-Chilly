import React from "react";
import emailjs from "@emailjs/browser";

function Mailer() {
  const sendEmail = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        "service_2ftsdln",
        "template_m34vm2r",
        event.target,
        "jrT2ITAaTTLYEDYv0"
      )
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={sendEmail}>
        <p>Name:</p>
        <input type="text" name="user_name" />
        <hr />
        <p>Email:</p>
        <input type="text" name="user_email" />
        <hr />
        <p>Message:</p>
        <textarea type="text" name="user_message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Mailer;
