import React, { useRef } from "react";
import { Link } from "react-router-dom";
// import Gallery from "./Gallery";
import ResponsiveAppBar from "../shared/Navbar";
import "../../assets/css/Home.css";
import Footer from "../shared/Footer";

const Home = () => {
  const galleryRef = useRef(null);
  const aboutUsRef = useRef(null);

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <ResponsiveAppBar scrollToSection={scrollToSection} galleryRef={galleryRef} aboutUsRef={aboutUsRef} />
      <div className="banner">
      <div className="bannerOverlay"></div> {/* Semi-transparent overlay */}

        <div className="bannerText">
          <h2><strong>EcoCollect</strong> : Efficient Waste Management for a <br />Sustainable Tomorrow </h2>
          <Link to="/new-booking" className="banner-btn">New Booking</Link>
        </div>
      </div>

      {/* Gallery Section */}
      <section ref={galleryRef} className="gallery-section">
        <h2>Gallery</h2><br />
        <div className="gallery-container">
          <div className="gallery-item"><img src="/images/gallery1.jpg" alt="pic 1" /></div>
          <div className="gallery-item"><img src="/images/gallery2.jpg" alt="pic 2" /></div>
          <div className="gallery-item"><img src="/images/gallery3.jpg" alt="pic 3" /></div>
          <div className="gallery-item"><img src="/images/gallery4.jpg" alt="pic 4" /></div>
          <div className="gallery-item"><img src="/images/gallery5.jpg" alt="pic 5" /></div>
          <div className="gallery-item"><img src="/images/gallery6.jpg" alt="pic 6" /></div>
          <div className="gallery-item"><img src="/images/gallery7.jpg" alt="pic 7" /></div>
          <div className="gallery-item"><img src="/images/gallery8.jpg" alt="pic 8" /></div>
          <div className="gallery-item"><img src="/images/gallery9.jpg" alt="pic 9" /></div>
          <div className="gallery-item"><img src="/images/gallery10.jpg" alt="pic 10" /></div>
          <div className="gallery-item"><img src="/images/gallery11.jpg" alt="pic 11" /></div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutUsRef} className="about-us">
        <h2>About Us</h2>
        <p>We provide efficient and eco-friendly waste management solutions tailored to meet your needs. Our services are designed to make waste disposal easier and more sustainable for everyone.</p>
      </section>


     <Footer />
    </div>
  );
};

export default Home;
