import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container__footer">
        <div className="box__footer">
          <div className="logo">
            <img src="" alt="" />
          </div>
          <div className="terms">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab et
              tenetur nihil libero possimus quidem molestiae dolorum non cum
              aperiam? Quisquam est rerum nulla molestias ea. Alias fuga
              pariatur animi?
            </p>
          </div>
        </div>
        <div className="box__footer">
          <h2>PRODUCT</h2>
          <a href="#">How it works</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Testimonials</a>
        </div>
        <div className="box__footer">
          <h2>ABOUT FORM</h2>
          <a href="#">Our team</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Stores</a>
        </div>
        <div className="box__footer">
          <h2>CONTACT</h2>
          <a href="#">info@form.com</a>
          <a href="#">123-456-7890</a>
          <a href="#">0123-456-789</a>
          <a href="#">Stores</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
