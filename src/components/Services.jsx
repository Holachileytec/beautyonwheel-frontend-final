import React from "react";
import "../Styles/services.css";
import { Row, Col, Button } from "react-bootstrap";

function Services({ SecT, Col1, Col2, styleRsec }) {
  return (
    <div>
      <div className=" container d-flex align-items-center mb-3 mt-5 justify-content-center ">
        <hr
          style={{
            width: "300px",
            margin: "10px",
          }}
        />
        <h2 style={{ margin: "10px" }}> {SecT}</h2>
        <hr
          style={{
            width: "300px",
            margin: "10px",
          }}
        />
      </div>
      <div className="container srvbdy">
        <Row
          style={{ padding: "10px", marginBottom: "30px" }}
          className={styleRsec}
        >
          <Col style={{ textAlign: "CENTER" }} className="col1">
            {Col1}
          </Col>
          <Col style={{ textAlign: "CENTER" }} className="col2">
            <div> {Col2}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Services;
