import React, { useState, useEffect } from "react";
import "../Styles/admin.css";
import Content from "./Content";
import make1 from "../assets/imageM.jpg";
import make2 from "../assets/imageK.jpg";
import make3 from "../assets/imageE.jpg";
import make4 from "../assets/imageMA.jpg";
import make5 from "../assets/imageS.jpg";
import make6 from "../assets/imageG.jpg";
import make7 from "../assets/ped.jpg"; // for manicure
import make8 from "../assets/ped1.jpg";
import make9 from "../assets/ped2.jpg"; //end for manicure
import make10 from "../assets/imageN.jpg";
import make11 from "../assets/imageIL.jpg";
import make12 from "../assets/imagenil.jpg"; // change for nails
import { Button, ListGroup } from "react-bootstrap";
import "../Styles/content.css";
import api from "../config/api";

const Plan = () => {
  const [activeTab, setActiveTab] = useState("makeup");
  const [plans, setPlans] = useState([]);
  const [aside, setAside] = useState({ id: "", name: "", price: "" });

  const stored = localStorage.getItem("user");
  let user = JSON.parse(stored) || null;
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/api/plan/allPlans");
        setPlans(res.data.plans);
        console.log("The data is:" + res.data);
      } catch (err) {
        console.log(`an error occured ${err}`);
      }
    };
    fetchPlans();
  }, []);

  const handleSelect = async (e) => {
    const selectedPlan = e.target.value;
    const checkPlan = plans.find((plan) => {
      return plan._id === selectedPlan;
    });
    if (checkPlan) {
      setAside({
        id: checkPlan._id,
        name: checkPlan.name,
        price: checkPlan.price,
      });
    } else {
      setAside({ name: "", price: "" });
    }
  };
  // const token = localStorage.getItem("token")
  const initializePaymentData = {
    amount: aside.price,
    email: user.email,
    userId: user._id || user.id,
    planId: aside.id,
    paymentType: "subscription",
  };
  const initilaizePay = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/api/paystack/initialize",
        initializePaymentData
      );
      const { authorization_url } = res.data.data;
      if (authorization_url) {
        window.location.href = authorization_url;
      } else {
        alert("Could not get payment link. Please try again.");
      }
    } catch (err) {
      console.log("Payment Initialization Error:", err);
      alert("Payment Initialization Failed");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>Membership</h2>
        </div>
        <nav className="nav-menu">
          {[
            "makeup",
            "hair-styling",
            "manicure",
            "pedicure",
            "massage",
            "create-plan",
          ].map((tab) => (
            <button
              key={tab}
              className={`nav-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* For Beauticians */}
        {activeTab === "makeup" && (
          <div className="tabcontent">
            <h1>MakeUp</h1>
            <hr />

            <div className="content mt-4">
              <Content
                myImage={make1}
                b4Bdy={
                  <div>
                    <p>
                      Simple, neat, and beautiful - no luxry or complex
                      detailing makeup
                    </p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Quality but non-luxury brands.
                    </p>
                    <p>
                      {" "}
                      <strong>Bonus:</strong> Basic skin prep, Simple lashes or
                      brow touch, Light setting spray.
                    </p>
                  </div>
                }
                Title="Basic Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Everyday/Natural Makeup:</strong> (Light and
                      Simple look to daily wear.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      {" "}
                      <strong>No Makeup Makeup:</strong> (Soft, skin-like, very
                      minimal. )
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      {" "}
                      <strong>Casual Makeup:</strong> (For errands, outings, or
                      meetups.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      {" "}
                      <strong>Office / Professional Makeup:</strong> (Neutral
                      tones, polished but simple)
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>Matte Makeup:</strong> (For oil control and clean
                      finish)
                    </ListGroup.Item>
                  </>
                }
              />
              <Content
                myImage={make2}
                b4Bdy={
                  <div>
                    <p>Flawless, loglasting glam with comfort and detail</p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Premium brands like MAC, Fenty,
                      Huda Beauty etc.
                    </p>
                    <p>
                      {" "}
                      <strong>Bonus:</strong> Mini skincare treatment (facial
                      massage,serum prep),Custom lashes,Priority booking,
                      Retouch or short on-site service, Complementary mini
                      skincare kit.
                    </p>
                  </div>
                }
                Title="Premium Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Glam Makeup:</strong> (Bold eyes, contour,
                      shimmer, and highlight.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      {" "}
                      <strong>Bridal Makeup (Regular):</strong> (For wedding
                      guests or simple brides. )
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      {" "}
                      <strong>Dewy / Glowy Makeup:</strong> (Fresh and radiant
                      finish.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      {" "}
                      <strong>HD/ Camera Makeup:</strong> (For photography or
                      video)
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>Matte / Satin Makeup(enhanced):</strong> (Smooth,
                      photo-friendly)
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>
                        Traditional / Cultural Makeup(simple):
                      </strong>{" "}
                      (For cultural events)
                    </ListGroup.Item>
                  </>
                }
              />
              <Content
                myImage={make3}
                b4Bdy={
                  <div>
                    <p>
                      Celebrity-grade, luxury finish with full pampering and
                      extra detail.
                    </p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Luxury / Designer brands (Dior,
                      Pat McGrath, Charlotte Tilbury)
                    </p>
                    <p>
                      {" "}
                      <strong>Bonus:</strong> Mini skincare treatment (facial
                      massage,serum prep),Custom lashes,Priority booking,
                      Retouch or short on-site service, Complementary mini
                      skincare kit.
                    </p>
                  </div>
                }
                Title="Luxury Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Airbrush Makeup:</strong> (Smooth, Weightless,
                      camera-perfect.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      {" "}
                      <strong>Bridal Makeup (Luxury):</strong> (Flawless,
                      waterproof, long-lasting for brides )
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
                      <strong>Traditional Bridal Makeup:</strong> ( Complete
                      cultural glamwith luxury touch)
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>Fantasy / SFX Makeup:</strong> ( For shoots,
                      movies or luxury themed events)
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
          </div>
        )}

        {/* Massage Tab */}
        {activeTab === "massage" && (
          <div className="tabcontent">
            <h1>Massage</h1>
            <hr />

            <div className="content mt-4">
              <Content
                myImage={make4}
                b4Bdy={
                  <div>
                    <p>For everyday client, students, casual grooming</p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Quality but non-luxury brands.
                    </p>
                    <p>
                      {" "}
                      <strong>Bonus:</strong> Free quick-dry top coat, 3-day
                      polish fix
                    </p>
                  </div>
                }
                Title="Basic Plan"
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
                myImage={make5}
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
                      <strong>Bonus:</strong> Mini hand cream gift. Priority
                      booking. Free repair within 5days
                    </p>
                  </div>
                }
                Title="Premium Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Full spa manicure:</strong> (exfoliation, mask,
                      massage)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>Gel or French polish</ListGroup.Item>{" "}
                    <ListGroup.Item>Cuticle softening and care</ListGroup.Item>{" "}
                    <ListGroup.Item>Moisturizing hand cream</ListGroup.Item>
                  </>
                }
              />
              <Content
                myImage={make6}
                b4Bdy={
                  <div>
                    <p>
                      <strong>Ideal For: </strong> Celebrites, Bride or Elite
                      clients.
                    </p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Luxury / Designer brands
                    </p>
                    <p>
                      <strong>Bonus:</strong> Complimentary drink &
                      aromatherapy. Take-home hand kit(cream + oil + file). Free
                      repair within 7days
                    </p>
                  </div>
                }
                Title="Luxury Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Luxury Manicure:</strong> (hot oil treatment +
                      paraffin wax.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      Custom nail design or chrome finish
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      Premium hand exfoliation & serum
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Heated towel wrap and full massage
                    </ListGroup.Item>
                  </>
                }
              />
            </div>
          </div>
        )}

        {/* Pedicure Tab */}
        {activeTab === "pedicure" && (
          <div className="tabcontent">
            <h1>Pedicure</h1>
            <hr />

            <div className="content mt-4">
              <Content
                myImage={make7}
                b4Bdy={
                  <div>
                    <p>For everyday client, students, casual grooming</p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Quality but non-luxury brands.
                    </p>
                    <p>
                      {" "}
                      <strong>Bonus:</strong> Free quick-dry top coat, 3-day
                      polish fix
                    </p>
                  </div>
                }
                Title="Basic Plan"
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
                myImage={make8}
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
                      <strong>Bonus:</strong> Mini hand cream gift. Priority
                      booking. Free repair within 5days
                    </p>
                  </div>
                }
                Title="Premium Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Full spa manicure:</strong> (exfoliation, mask,
                      massage)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>Gel or French polish</ListGroup.Item>{" "}
                    <ListGroup.Item>Cuticle softening and care</ListGroup.Item>{" "}
                    <ListGroup.Item>Moisturizing hand cream</ListGroup.Item>
                  </>
                }
              />
              <Content
                myImage={make9}
                b4Bdy={
                  <div>
                    <p>
                      <strong>Ideal For: </strong> Celebrites, Bride or Elite
                      clients.
                    </p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Luxury / Designer brands
                    </p>
                    <p>
                      <strong>Bonus:</strong> Complimentary drink &
                      aromatherapy. Take-home hand kit(cream + oil + file). Free
                      repair within 7days
                    </p>
                  </div>
                }
                Title="Luxury Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Luxury Manicure:</strong> (hot oil treatment +
                      paraffin wax.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      Custom nail design or chrome finish
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      Premium hand exfoliation & serum
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Heated towel wrap and full massage
                    </ListGroup.Item>
                  </>
                }
              />
            </div>
          </div>
        )}

        {/* Manicure Tab */}
        {activeTab === "manicure" && (
          <div className="tabcontent">
            <h1>Manicure</h1>
            <hr />

            <div className="content mt-4">
              <Content
                myImage={make10}
                b4Bdy={
                  <div>
                    <p>For everyday client, students, casual grooming</p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Quality but non-luxury brands.
                    </p>
                    <p>
                      {" "}
                      <strong>Bonus:</strong> Free quick-dry top coat, 3-day
                      polish fix
                    </p>
                  </div>
                }
                Title="Basic Plan"
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
                myImage={make11}
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
                      <strong>Bonus:</strong> Mini hand cream gift. Priority
                      booking. Free repair within 5days
                    </p>
                  </div>
                }
                Title="Premium Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Full spa manicure:</strong> (exfoliation, mask,
                      massage)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>Gel or French polish</ListGroup.Item>{" "}
                    <ListGroup.Item>Cuticle softening and care</ListGroup.Item>{" "}
                    <ListGroup.Item>Moisturizing hand cream</ListGroup.Item>
                  </>
                }
              />
              <Content
                myImage={make12}
                b4Bdy={
                  <div>
                    <p>
                      <strong>Ideal For: </strong> Celebrites, Bride or Elite
                      clients.
                    </p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Luxury / Designer brands
                    </p>
                    <p>
                      <strong>Bonus:</strong> Complimentary drink &
                      aromatherapy. Take-home hand kit(cream + oil + file). Free
                      repair within 7days
                    </p>
                  </div>
                }
                Title="Luxury Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Luxury Manicure:</strong> (hot oil treatment +
                      paraffin wax.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      Custom nail design or chrome finish
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      Premium hand exfoliation & serum
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Heated towel wrap and full massage
                    </ListGroup.Item>
                  </>
                }
              />
            </div>
          </div>
        )}
        {/* Bookings Tab */}
        {activeTab === "hair-styling" && (
          <div className="tab-content">
            <h1>Hair Styling</h1>
            <hr />
            <div className="content mt-4">
              <Content
                myImage={make10}
                b4Bdy={
                  <div>
                    <p>For everyday client, students, casual grooming</p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Quality but non-luxury brands.
                    </p>
                    <p>
                      {" "}
                      <strong>Bonus:</strong> Free quick-dry top coat, 3-day
                      polish fix
                    </p>
                  </div>
                }
                Title="Basic Plan"
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
                myImage={make11}
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
                      <strong>Bonus:</strong> Mini hand cream gift. Priority
                      booking. Free repair within 5days
                    </p>
                  </div>
                }
                Title="Premium Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Full spa manicure:</strong> (exfoliation, mask,
                      massage)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>Gel or French polish</ListGroup.Item>{" "}
                    <ListGroup.Item>Cuticle softening and care</ListGroup.Item>{" "}
                    <ListGroup.Item>Moisturizing hand cream</ListGroup.Item>
                  </>
                }
              />
              <Content
                myImage={make12}
                b4Bdy={
                  <div>
                    <p>
                      <strong>Ideal For: </strong> Celebrites, Bride or Elite
                      clients.
                    </p>
                    <p>
                      {" "}
                      <strong>Products:</strong> Luxury / Designer brands
                    </p>
                    <p>
                      <strong>Bonus:</strong> Complimentary drink &
                      aromatherapy. Take-home hand kit(cream + oil + file). Free
                      repair within 7days
                    </p>
                  </div>
                }
                Title="Luxury Plan"
                item={
                  <>
                    <ListGroup.Item>
                      <strong>Luxury Manicure:</strong> (hot oil treatment +
                      paraffin wax.)
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      Custom nail design or chrome finish
                    </ListGroup.Item>{" "}
                    <ListGroup.Item>
                      Premium hand exfoliation & serum
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Heated towel wrap and full massage
                    </ListGroup.Item>
                  </>
                }
              />
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "create-plan" && (
          <div className="tab-content">
            <h1>Add Your Membership Plan</h1>
            <hr />

            <div className="allP p-5">
              <div className="price justify-content-end me-5 d-flex align-items-center">
                {aside.price && <h1> ${aside.price}</h1>}

                {"  "}
                <span style={{ color: "#ffd700" }}> / Month</span>
              </div>
              <hr />
            </div>

            <div className="all">
              <h3>Select A Plan</h3>

              <form className="frm" onSubmit={initilaizePay}>
                {plans.map((plan) => (
                  <div className="e">
                    <input
                      type="radio"
                      name="plan"
                      value={plan._id}
                      onClick={handleSelect}
                    />
                    <label htmlFor={plan.name}>{plan.name}</label>
                  </div>
                ))}
                <Button className="mt-4" type="submit">
                  Create Plan
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
