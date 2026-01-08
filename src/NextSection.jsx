import React from "react";
import { Row, Col } from "react-bootstrap";

import Atura1 from "./assets/massage.jpg";
import Atura2 from "./assets/nil.jpg";
import "./Styles/next.css";

function NextSection() {
  return (
    <div className="next">
      <Row style={{ margin: "40px" }} className="nextR">
        <Col style={{ padding: "20px" }}>
          <div>
            <h3>
              Creative manicure and pedicure studio with masterly performance of
              services for the beauty of your nails
            </h3>
            <p>
              Step into our creative manicure and pedicure studio, where artistry
               and precision come together to transform your nails into a
                masterpiece. With expert technicians dedicated to delivering top-tier
               services. From stunning designs to flawless finishes
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
