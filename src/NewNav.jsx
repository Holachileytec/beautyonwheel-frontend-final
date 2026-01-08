import React from "react";
import "./Styles/newNav.css";
import Logo from "./assets/makeup-logo.png";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FaArrowRight, FaSearch, FaUser, FaShoppingBag } from "react-icons/fa";

function NewNav() {
  return (
    <div>
      <div
        className="firstNav"
        style={{ background: "black", height: "40px", color: "white" }}
      >
        <Row>
          <Col className="columnA" lg={6} md={6} sm={0}>
            <a href="/faq">FAQ </a>
            <a href="/termsandconditions">Terms and Conditions </a>
            <a href="">Working hours</a>
          </Col>

          <Col className="columnB" xs={12} lg={6} md={6} sm={12}>
            <div>
              <FaSearch />{" "}
              <p>
                <a href="">search</a>
              </p>
            </div>
            <div>
              <FaUser />
              <p>
                <a href="/login">login</a>
              </p>
            </div>

            <div>
              <FaUser />{" "}
              <p>
                <a href="/user-dashboard">Dashboard</a>
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="cont">
        <div className="logo">
          <img src={Logo} alt="bowLogo" width="150px" height="150px" />
        </div>
        <div className="container">
          {" "}
          <hr />
        </div>
        <Row className="align-items-center">
          <Col xl={9} lg={10} xs={10}>
            <div className="text">
              <Link to="/">Home</Link>
             <a href="#masge">Massage</a>
              <a href="#nils">Nails</a>
              <a href="#mnicure">Manicure</a>
              <a href="#pdicure">Pedicure</a>
              <a href="#mkup">Makeup</a>
              <a href="/blog">Blog</a>
              <a href="/aboutus">About Us </a>
              <a href="/pay">Payment</a>
            </div>
          </Col>
          <Col >

            <div className="book">
              <Link to="/bookASession">
                <Button style={{ alignItems: "center" }} className="Dbutin">
                  Book Now <FaArrowRight />
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default NewNav;
