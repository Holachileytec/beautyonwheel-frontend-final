import React, { useEffect, useRef } from "react";
import "./Styles/footer.css";
import logo from "./assets/react.svg";
import { Row, Col } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("footer-show");
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    if (el) observer.observe(el);
  }, []);

  return (
    <div className="foot ">
      <div className="container ">
        <Row className="footer" ref={footerRef}>
          <Col xl={6} style={{ padding: "20px" }}>
            <div className="footerWrapper">
              <div className="companyLogo">
                <img
                  className="footerImg"
                  src={logo}
                  alt="BeautyOnWheel Logo"
                />
                <h1 className="footerHeadText">BEAUTYONWHEEL</h1>
                <p className="footerSlogan">Bringing beauty to your doorstep</p>
              </div>
              <Col>
                <div className="text-center">
                  <p>
                    BeautyOnWheel caters for individual beauty and <br />
                    wellness services and also serves as a platform for anyone
                    seeking <br />
                    in-house beauty treatment.
                  </p>
                </div>
              </Col>
            </div>
          </Col>
          <Col>
            <div className="company">
              <h1>Company</h1>
              <a href="">Gallery</a>
              <a href="/contact">Contact Us</a>
              <a href="/LandPage">Terms/Condition</a>
              <a href="/Privacy">Privacy</a>

              <a href="Sign Up">Join us</a>
            </div>
          </Col>
          <Col>
            <div className="what_we_do">
              <h1 className="wwdH1">What We Do</h1>
              <p className="wwdNav d-flex flex-column">
                <a href="#">MakeUp</a>
                <a href="#">Pedicure</a>
                <a href="#">Manicure</a>
                <a href="#">Massage</a>
              </p>
            </div>
          </Col>

          <Col>
            <div className="where_we_are">
              <h1>Where We Are</h1>
              <a href="#">Lagos</a>
              <a href="#">Abuja</a>
              <a href="#">Ogun</a>
              <a href="#">Porthacourt</a>
            </div>
          </Col>
        </Row>

        <div className="underlineFooter"></div>

        <Row style={{ textAlign: "center" }}>
          <Col>
            <div className="copywrite">
              <p className="faphone mail">
                <FaPhoneAlt /> +2347089986222 &nbsp;
                @info.beautyonwheel@gmail.com
              </p>
              <p>© 2025 BeautyOnWheel. All rights reserved.</p>
            </div>
          </Col>
          <Col>
            <div className="address">
              <div className="icons">
                <p className="icon whatsap">
                  <FaWhatsapp />
                </p>
                <p className="icon facebook">
                  <FaFacebookF />
                </p>
                <p className="icon twitter">
                  <FaTwitter />
                </p>
                <p className="icon youtube">
                  <FaYoutube />
                </p>
                <p className="icon insta">
                  <FaInstagram />
                </p>
                <p className="icon tiktok">
                  <FaTiktok />
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
