import React from "react";
import Content from "./Content";
import make from "./assets/atura1.jpg";
import { Button, ListGroup } from "react-bootstrap";
import "./Styles/content.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function Nails() {
  return (
    <div className="content mt-4">
      <div>
        <Link to={-1}>
          <FaArrowLeft size={20} color="black" />
        </Link>
      </div>
      <Content
        myImage={make}
        b4Bdy={
          <div>
            <p>Simple, neat, and affordable.</p>
            <p>
              {" "}
              <strong>Products:</strong> Quality but non-luxury brands.
            </p>
            <p>
              {" "}
              <strong>Bonus:</strong> Free nail oil application, 3-5 days polish
              retouch (if nearby)
            </p>
          </div>
        }
        Title="Basic Plan"
        forBtn={
          <Button
            style={{ width: "100%", background: "black", border: "none" }}
          >
            1 $ / Month + Service Cost{" "}
          </Button>
        }
        item={
          <>
            <ListGroup.Item>Basic nail trimming & shaping</ListGroup.Item>{" "}
            <ListGroup.Item>Standard polish (single color)</ListGroup.Item>{" "}
            <ListGroup.Item>Quick cuticle care</ListGroup.Item>{" "}
            <ListGroup.Item>Hand Lotion</ListGroup.Item>
          </>
        }
      />
      <Content
        myImage={make}
        b4Bdy={
          <div>
            <p>Long lasting beauty with style</p>
            <p>
              {" "}
              <strong>Products:</strong> Premium brands like MAC, Fenty, Huda
              Beauty etc.
            </p>
            <p>
              {" "}
              <strong>Bonus:</strong> Nail care kit(file,oil,mini cream)Priority
              booking Free repair within 3 days
            </p>
          </div>
        }
        Title="Premium Plan"
        forBtn={
          <Button
            style={{ width: "100%", background: "black", border: "none" }}
          >
            8 $ / Month + Service Cost{" "}
          </Button>
        }
        item={
          <>
            <ListGroup.Item>Gel or acryic nails</ListGroup.Item>{" "}
            <ListGroup.Item>Nail art (1-2 fingers)</ListGroup.Item>{" "}
            <ListGroup.Item>Full cuticle treatment</ListGroup.Item>{" "}
            <ListGroup.Item>Hand scrub and hydrating mask</ListGroup.Item>
            <ListGroup.Item>Quick hand massage</ListGroup.Item>
          </>
        }
      />
      <Content
        myImage={make}
        b4Bdy={
          <div>
            <p>Luxury, perfection, and lasting elegance</p>
            <p>
              {" "}
              <strong>Products:</strong> Luxury / Designer brands
            </p>
            <p>
              {" "}
              <strong>Bonus:</strong> Complimentary glass of champagne or juice,
              Take-home mini luxury hand cream, Personalized nail colsultation &
              custom designs, Free repair/ retouch within 5 days
            </p>
          </div>
        }
        Title="Luxury Plan"
        forBtn={
          <Button
            style={{ width: "100%", background: "black", border: "none" }}
          >
            15 $ / Month + Service Cost{" "}
          </Button>
        }
        item={
          <>
            <ListGroup.Item>
              Luxury gel extensions / 3D designs / encapsulated art
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              Full spa hand treatment (scrub, mask, paraffin wax)
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              Personalized nail consultation & custom designs
            </ListGroup.Item>
            <ListGroup.Item>Long wear top coat & finish</ListGroup.Item>
          </>
        }
      />
    </div>
  );
}

export default Nails;
