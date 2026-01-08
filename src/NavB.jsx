import { FaUser, FaShoppingBag, FaArrowRight, FaSearch } from "react-icons/fa";
import { useState } from "react";
import "./Styles/navbar.css";

import {
  Row,
  Col,
  Button,
  Nav,
  Navbar,
  NavDropdown,
  NavbarToggle,
} from "react-bootstrap";
import Offacnvas from "./Offacnvas";
import Logo from "./assets/makeup-logo.png";
import Accod from "./Accod";

import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="firstNav"
        style={{ background: "black", height: "40px", color: "white" }}
      >
        <Row>
          <Col className="columnA" lg={6} md={6} sm={0}>
            <a href="">Privacy </a>
            <a href="">Terms and Conditions </a>
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
              <FaShoppingBag />{" "}
              <p>
                <a href="">cart</a>
              </p>
            </div>
          </Col>
        </Row>
      </div>
      {/* The main Navbar */}
      <div className="navbar">
        <Row style={{ width: "100%" }} className="row">
          <Col
            xl={3}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            className="brnd"
          >
            <Navbar.Brand href="/">
              <img src={Logo} alt="BOW" width="70px" height="70px" />
            </Navbar.Brand>

            <NavbarToggle onClick={handleShow} className=" d-xl-none" />
          </Col>
          <Col
            xl={5}
            style={{
              alignItems: "center",
              paddingLeft: "30px",
            }}
            className="hideSml"
          >
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "500px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>

              <NavDropdown title="Services" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/#masge">Massage</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/#nils">Nails</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/#mnicure">Manicure</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/#pdicure">Pedicure</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/#mkup">Makeup</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/blog">Blog</Nav.Link>

              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="/payment"> Payments </Nav.Link>
            </Nav>
          </Col>
          <Col
            xl={4}
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              paddingRight: "50px",
            }}
            className="hideSml"
          >
            <div className="num">
              <FaPhone
                size={20}
                style={{
                  margin: "7px",
                }}
              />
              <a href="tel:+234-456-46545"> +234-456-46545</a>
            </div>
            <div className="BN BNC">
              <Link to="/bookASession">
                <Button style={{ alignItems: "center" }}>
                  Book Now <FaArrowRight />
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      {/* End */}

      <Offacnvas
        Heading={
          <div style={{ textAlign: "center" }}>
            {/* <img src={Logo} alt="myLogo" width="150px" height="150px" /> */}
          </div>
        }
        Body={
          <div>
            <Accod
              key="1"
              Topic="Home"
              Body={
                <div>
                  <ul>
                    <a href="#">
                      <li>Nail Fashion</li>
                    </a>
                    <a href="#">
                      <li>Nail Bar</li>
                    </a>
                  </ul>
                </div>
              }
            />
            <Accod
              key="2"
              Topic="About Us"
              Body={
                <div>
                  <ul>
                    <a href="#">
                      <li> About Us</li>
                    </a>
                    <a href="#">
                      <li> Testimonials</li>
                    </a>
                    <a href="#">
                      <li>FAQ</li>
                    </a>
                    <a href="#">
                      <li>Gallery</li>
                    </a>
                  </ul>
                </div>
              }
            />
            <Accod
              key="4"
              Topic="Products"
              Body={
                <div>
                  <ul>
                    <a href="#">
                      <li> Shop</li>
                    </a>
                    <a href="#">
                      <li> Wishlist</li>
                    </a>
                    <a href="#">
                      <li>Cart</li>
                    </a>
                    <a href="#">
                      <li>Checkout</li>
                    </a>
                    <a href="#">
                      <li>My Account</li>
                    </a>
                  </ul>
                </div>
              }
            />
            <Accod
              key="3"
              Topic="Blog"
              Body={
                <div>
                  <ul>
                    <a href="#">
                      <li>Our Blog</li>
                    </a>
                  </ul>
                </div>
              }
            />
            <a href="#" className="parC">
              <p style={{ marginLeft: "20px" }}>Contacts</p>
            </a>
            <div
              className="other mt-4"
              style={{
                margin: "20px",
                display: "flex",
                alignItems: "center",

                justifyContent: "space-between",
              }}
            >
              <div>
                <FaShoppingBag size={20} color="orange" />
              </div>
              <div>
                <FaUser size={20} color="orange" />
              </div>
            </div>
          </div>
        }
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}

export default NavBar;
