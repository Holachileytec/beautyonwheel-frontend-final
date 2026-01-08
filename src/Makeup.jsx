import React from "react";
import Content from "./Content";
import make from "./assets/atura1.jpg";
import { Button, ListGroup } from "react-bootstrap";
import "./Styles/content.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Makeup() {
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
            <p>
              Simple, neat, and beautiful - no luxry or complex detailing makeup
            </p>
            <p>
              {" "}
              <strong>Products:</strong> Quality but non-luxury brands.
            </p>
            <p>
              {" "}
              <strong>Bonus:</strong> Basic skin prep, Simple lashes or brow
              touch, Light setting spray.
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
            <ListGroup.Item>
              <strong>Everyday/Natural Makeup:</strong> (Light and Simple look
              to daily wear.)
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <strong>No Makeup Makeup:</strong> (Soft, skin-like, very minimal.
              )
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <strong>Casual Makeup:</strong> (For errands, outings, or
              meetups.)
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <strong>Office / Professional Makeup:</strong> (Neutral tones,
              polished but simple)
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Matte Makeup:</strong> (For oil control and clean finish)
            </ListGroup.Item>
          </>
        }
      />
      <Content
        myImage={make}
        b4Bdy={
          <div>
            <p>Flawless, loglasting glam with comfort and detail</p>
            <p>
              {" "}
              <strong>Products:</strong> Premium brands like MAC, Fenty, Huda
              Beauty etc.
            </p>
            <p>
              {" "}
              <strong>Bonus:</strong> Mini skincare treatment (facial
              massage,serum prep),Custom lashes,Priority booking, Retouch or
              short on-site service, Complementary mini skincare kit.
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
              <strong>Glam Makeup:</strong> (Bold eyes, contour, shimmer, and
              highlight.)
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <strong>Bridal Makeup (Regular):</strong> (For wedding guests or
              simple brides. )
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <strong>Dewy / Glowy Makeup:</strong> (Fresh and radiant finish.)
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <strong>HD/ Camera Makeup:</strong> (For photography or video)
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Matte / Satin Makeup(enhanced):</strong> (Smooth,
              photo-friendly)
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Traditional / Cultural Makeup(simple):</strong> (For
              cultural events)
            </ListGroup.Item>
          </>
        }
      />
      <Content
        myImage={make}
        b4Bdy={
          <div>
            <p>
              Celebrity-grade, luxury finish with full pampering and extra
              detail.
            </p>
            <p>
              {" "}
              <strong>Products:</strong> Luxury / Designer brands (Dior, Pat
              McGrath, Charlotte Tilbury)
            </p>
            <p>
              {" "}
              <strong>Bonus:</strong> Mini skincare treatment (facial
              massage,serum prep),Custom lashes,Priority booking, Retouch or
              short on-site service, Complementary mini skincare kit.
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
              <strong>Airbrush Makeup:</strong> (Smooth, Weightless,
              camera-perfect.)
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <strong>Bridal Makeup (Luxury):</strong> (Flawless, waterproof,
              long-lasting for brides )
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <strong>HD/ Ultra-Glam Makeup:</strong> (Perfect for
              high-defination photography or red carpets)
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Editorial / Creative Makeup:</strong> (Artistic or
              magazine-quality looks)
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Traditional Bridal Makeup:</strong> ( Complete cultural
              glamwith luxury touch)
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Fantasy / SFX Makeup:</strong> ( For shoots, movies or
              luxury themed events)
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Runaway / Performance Makeup:</strong> ( Stage and
              spotlight ready)
            </ListGroup.Item>
          </>
        }
      />
    </div>
  );
}

export default Makeup;
