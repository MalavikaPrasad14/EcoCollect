import React from "react";
import "../../assets/css/Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Connect with Us</h3>
        <p>Follow us on social media and stay updated with our latest services and updates.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <p>&copy; 2024 EcoCollect : Waste Management Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
