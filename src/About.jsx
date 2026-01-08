import React from 'react';
import "./Styles/about.css"
const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        
        <header className="about-header">
          <h1>Beauty That Cares</h1>
          <p>We create luxurious, effective cosmetics rooted in nature and backed by science, for radiance that lasts.</p>
        </header>
        

        <section className="about-section mission-section">
          <h2 className="section-title">About Us</h2>
          <p>
            **Beauty On Wheels.** is a mordern, on-demand beauty service platform designed to bring professional beauty care to clients - anytime, anywhere. Instead of travelling to a salon or waiting in long queues, customers can book a wide range  of beauty services and have certified beauticians come to their home, office, event location, or any preferred place. 
          </p>
          <p>
            Built around convinience, flexibility and quality, Beauty On Wheel transforms the traditional salon experience into a seamless mobile service. Users can easily browse available services, compare prices, check stylist profiles and schedule appointments with just a few clicks. The platform ensures reliability by partnering only with trained and background-checked professionals who deliver salon-grade results.
          </p>
          <p>

            Beyond convinience, Beauty On Wheel also supports beauty professionals by giving them a digital space to showcase their skils, gain more clients, manage bookings, and increase their earnings without the high cost of running a physical salon.
          </p>
          <p>
            Whether it's makeup for a special event, manicure and pedicure, hairstyling, skincare treatments, grooming services, Beauty On Wheels is redefining beauty care - by making it fully mobile, customer-centered, and accessible to everyone.
          </p>
        </section>

        <section className="about-section values-section">
          <h2 className="section-title">Why Choose BeautyOnWheel?</h2>
          
          <div className="value-cards">
            <div className="card">
              <h3>🌿 Your Convenience First</h3>
              <p>We make beauty services easy, accessible, and available anywhere- puttig comfort and flexibility at the center of the customer's experience</p>
            </div>
            
            <div className="card">
              <h3>🦾 Quality & Excellence</h3>
              <p>Every service delivered through Beauty On Wheel represents top tier quality ensuring our customers consistently recieve salon-grade results</p>
            </div>
            
            <div className="card">
              <h3>✨ Customer-Centric Service</h3>
              <p>Every decision, feature, and service is designed around the needs, comfort and satisfaction of our clients.</p>
            </div>
          </div>
          <div className="value-cards">
            <div className="card">
              <h3>🦺 Trust & Safety</h3>
              <p>We priortize customer security and peace of mind through background checks, transparent pricing, and reliable service delivery.</p>
            </div>
            
            <div className="card">
              <h3>👷‍♂️ Empowerment</h3>
              <p>We create opportunities for beauty professionals to grow their careers, reach new clients, and increase their earnings.</p>
            </div>
            
            <div className="card">
              <h3>💅 Professionalism</h3>
              <p>We work with trained, verified, and experienced beauty experts who uphold at highest standards of service and conducts.</p>
            </div>
          </div>
        </section>
        <section className="">
          <h2 className="section-title">Mission Statement</h2>
          <p>To deliver convenient high-quality, and professional beauty services directly to our customer's doorstep. Empowering individuals to look and feel their best through accessible, reliable, and personized mobile beauty care.</p>
    
        </section>
        <section className="">
          <h2 className="section-title">Vision Statement</h2>
          <p>To become the leading moblie beauty service platform accross Africa and beyond-transforming the beauty industry by making premium, on-demand beauty experiences effortless, affordable, and available anywhere.</p>
    
        </section>

        <footer className="about-footer">
          <p>Ready to discover the best version of yourself ? Explore our services!</p>
          <a href="/" className="cta-button">Shop Now</a>
        </footer>

      </div>
    </div>
  );
};

export default About;