import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Styles/content.css";

function Content({ myImage, b4Bdy, forBtn, item, Title }) {
  return (
    <div className="crd">
      <Card style={{ width: "20rem" }} className="Card">
        <Card.Img variant="top" src={myImage} />
        <Card.Body>
          <Card.Title>{Title}</Card.Title>
          <Card.Text>{b4Bdy}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">{item}</ListGroup>
        <Card.Body>
          <Card.Link href="#">{forBtn}</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Content;
