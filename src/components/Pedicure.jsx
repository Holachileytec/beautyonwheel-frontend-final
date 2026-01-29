import React from "react";
import Content from "./Content";
import make from "../assets/atura1.jpg";
import { Button, ListGroup } from "react-bootstrap";
import "../Styles/content.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Pedicure() {
  return (
    <>
    <h1 className="text-center">Become a Member</h1>
    <hr />
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
            <p>For everyday client, students, casual grooming</p>
            <p>
              {" "}
              <strong>Products:</strong> Quality but non-luxury brands.
            </p>
            <p>
              {" "}
              <strong>Bonus:</strong> Free quick-dry top coat, 3-day polish fix
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
            <ListGroup.Item>Nail trimming and shaping</ListGroup.Item>{" "}
            <ListGroup.Item>Cuticle care</ListGroup.Item>{" "}
            <ListGroup.Item>Hand soak & scrub</ListGroup.Item>{" "}
            <ListGroup.Item>Polish (1 color)</ListGroup.Item>
          </>
        }
      />
      <Content
        myImage={make}
        b4Bdy={
          <div>
            <p>
              {" "}
              <strong>Ideal For:</strong>Clients attending events, photo
              sessions,or date nights
            </p>
            <p>
              {" "}
              <strong>Products:</strong> Premium brands
            </p>
            <p>
              {" "}
              <strong>Bonus:</strong> Mini hand cream gift. Priority booking.
              Free repair within 5days
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
            <ListGroup.Item>
              <strong>Full spa manicure:</strong> (exfoliation, mask, massage)
            </ListGroup.Item>{" "}
            <ListGroup.Item>Gel or French polish</ListGroup.Item>{" "}
            <ListGroup.Item>Cuticle softening and care</ListGroup.Item>{" "}
            <ListGroup.Item>Moisturizing hand cream</ListGroup.Item>
          </>
        }
      />
      <Content
        myImage={make}
        b4Bdy={
          <div>
            <p>
              <strong>Ideal For: </strong> Celebrites, Bride or Elite clients.
            </p>
            <p>
              {" "}
              <strong>Products:</strong> Luxury / Designer brands
            </p>
            <p>
              <strong>Bonus:</strong> Complimentary drink & aromatherapy.
              Take-home hand kit(cream + oil + file). Free repair within 7days
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
              <strong>Luxury Manicure:</strong> (hot oil treatment + paraffin
              wax.)
            </ListGroup.Item>{" "}
            <ListGroup.Item>Custom nail design or chrome finish</ListGroup.Item>{" "}
            <ListGroup.Item>Premium hand exfoliation & serum</ListGroup.Item>
            <ListGroup.Item>Heated towel wrap and full massage</ListGroup.Item>
          </>
        }
      />
    </div>
    </>
  );
}

export default Pedicure;
