import React from "react";
import { Row, Col } from "react-bootstrap";

import Atura1 from "../assets/massage.jpg";
import Atura2 from "../assets/nil.jpg";
import "../Styles/next.css";

function NextSection() {
  return (
    <div className="next">
      <Row style={{ margin: "40px" }} className="nextR">
        <Col style={{ padding: "20px" }}>
          <div>
            <h3>Beauty on Wheel: Luxury That Comes to You</h3>
            <p>
              Experience the luxury of a full-service beauty studio that comes
              directly to you. Beauty on Wheel brings masterful beauty services
              to your doorstep, transforming any space into your personal
              sanctuary of self-care and style. Each service is delivered with
              precision, creativity, and an unwavering commitment to excellence.
              <br />
              <b>Your beauty. Your space. Our expertise.</b>
            </p>
            <div className="d-flex">
              <div className="d-flex amt">
                <h1>18</h1>
                <p>
                  Professional
                  <br /> masters
                </p>
              </div>

              <div className="d-flex amt">
                <h1>265</h1>
                <p>
                  Nail polish
                  <br /> colors
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div>
            <Row>
              <Col style={{ padding: "20px" }}>
                <img src={Atura1} alt="image" width="100%" />
              </Col>
              <Col style={{ padding: "20px" }}>
                <img src={Atura2} alt="image" width="100%" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default NextSection;
