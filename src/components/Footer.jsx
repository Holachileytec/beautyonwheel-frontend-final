import React, { useEffect, useRef } from "react";
import "../Styles/footer.css";
import logo from "../assets/makeup-logo.png";
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
      { threshold: 0.5 },
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
              <a href="/gallery">Gallery</a>
              <a href="/contact">Contact Us</a>
              <a href="/termsandconditions">Terms & Condition</a>
              <a href="/Privacy">Privacy</a>

              <a href="/signup">Join us</a>
            </div>
          </Col>
          <Col>
            <div className="what_we_do">
              <h1 className="wwdH1">What We Do</h1>
              <p className="wwdNav d-flex flex-column">
                <a href="/makeup">MakeUp</a>
                <a href="/pedicure">Pedicure</a>
                <a href="/manicure">Manicure</a>
                <a href="/massage">Massage</a>
                <a href="/hair-styling">Hair Styling</a>
              </p>
            </div>
          </Col>

          <Col>
            <div className="where_we_are">
              <h1>Where We Are</h1>
              <a href="#">Lagos</a>
              <a href="#">Abuja</a>
              <a href="#">Ogun</a>
              <a href="#">PortHarcourt</a>
              <a href="#">Ibadan</a>
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
                <a href="">
                  <p className="icon whatsap">
                    <FaWhatsapp />
                  </p>
                </a>
                <a href="https://www.facebook.com/share/1AfAswee3B/">
                  <p className="icon facebook">
                    <FaFacebookF />
                  </p>
                </a>
                <a href="">
                  <p className="icon twitter">
                    <FaTwitter />
                  </p>
                </a>
                <a href="">
                  <p className="icon youtube">
                    <FaYoutube />
                  </p>
                </a>
                <a href="https://www.instagram.com/beautyonwheel012?igsh=c3k4OGt2bDkycGhy">
                  <p className="icon insta">
                    <FaInstagram />
                  </p>
                </a>
                <a href="https://www.tiktok.com/@beautyonwheel?_r=1&_t=ZS-92u5AGaSaXJ">
                  <p className="icon tiktok">
                    <FaTiktok />
                  </p>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
