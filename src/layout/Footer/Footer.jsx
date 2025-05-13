import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import "./Footer.scss"; // Import the SCSS file

function Footer() {
  return (
    <footer>
      {/* Newsletter Section */}
      <div className="top-footer">
        <h3>
          STAY UPTO DATE ABOUT <br className="hide-on-mobile" />{" "}
          {/* Class added */}
          OUR LATEST OFFERS
        </h3>
        <div className="top-footer-items">
          <div className="input-wrapper">
            <input type="email" placeholder="Enter your email address" />
            <TfiEmail className="input-icon" />
          </div>
          <button>Subscribe to Newsletter</button>
        </div>
      </div>
      {/* Main Footer Content Area */}
      <div className="hero-footer">
        <div className="container">
          {" "}
          {/* Added Container Wrapper */}
          <div className="paragrif-wrapper">
            {" "}
            {/* This now handles left/right layout */}
            {/* Footer Left Section */}
            <div className="footer-left">
              <span>SHOP.CO</span>
              <p>
                We have clothes that suits your style and <br /> which you're
                proud to wear. From <br /> women to men.
              </p>
              <div className="footer-icons">
                {/* Adjusted icon size slightly for consistency */}
                <BsTwitter style={{ width: "24px", height: "24px" }} />
                <BsFacebook style={{ width: "24px", height: "24px" }} />
                <BsInstagram style={{ width: "24px", height: "24px" }} />
                <BsGithub style={{ width: "24px", height: "24px" }} />
              </div>
            </div>
            {/* Footer Right Section (Link Columns) */}
            <div className="footer-right">
              {/* Column 1 */}
              <div className="footer-paragrif">
                {" "}
                {/* Keep class or rename to link-column */}
                <p className="column-title">COMPANY</p> {/* Added class */}
                <p>About</p>
                <p>Features</p>
                <p>Works</p>
                <p>Career</p>
              </div>
              {/* Column 2 */}
              <div className="footer-paragrif">
                <p className="column-title">HELP</p> {/* Added class */}
                <p>Customer Support</p>
                <p>Delivery Details</p>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
              </div>
              {/* Column 3 */}
              <div className="footer-paragrif">
                <p className="column-title">FAQ</p> {/* Added class */}
                <p>Account</p>
                <p>Manage Deliveries</p>
                <p>Orders</p>
                <p>Payments</p>
              </div>
              {/* Column 4 */}
              <div className="footer-paragrif">
                <p className="column-title">RESOURCES</p> {/* Added class */}
                <p>Free eBooks</p>
                <p>Development Tutorial</p>
                <p>How to - Blog</p>
                <p>Youtube Playlist</p>
              </div>
            </div>
          </div>
          <hr />
          {/* Footer Bottom Section */}
          <div className="footer-finish">
            <p>Shop.co © 2000-2023, All Rights Reserved</p>
            <div className="payment-cards">
              {/* Make sure image paths are correct relative to your public folder or assets setup */}
              <img src="/src/assets/visa.png" alt="Visa" />
              <img src="/src/assets/mastercard.png" alt="Mastercard" />
              <img src="/src/assets/paypal.png" alt="PayPal" />
              <img src="/src/assets/pay.png" alt="Apple Pay" />
              <img src="/src/assets/googlePay.png" alt="Google Pay" />
            </div>
          </div>
        </div>{" "}
        {/* End Container */}
      </div>{" "}
      {/* End Hero Footer */}
    </footer>
  );
}

export default Footer;
