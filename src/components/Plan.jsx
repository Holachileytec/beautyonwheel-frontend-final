import React, { useState, useEffect } from "react";
import "../Styles/admin.css";
import Content from "./Content";
import make1 from "../assets/imageM.jpg";
import make2 from "../assets/imageK.jpg";
import make3 from "../assets/imageE.jpg";
import make3a from "../assets/makeuptm.jpg";
import make3b from "../assets/makeupn.jpg";

import make4 from "../assets/imageMA.jpg";
import make5 from "../assets/imageS.jpg";
import make6 from "../assets/imageG.jpg";
import make6a from "../assets/massagen.jpg";
import make6b from "../assets/massageHead.jpg";

// for pedicure
import make7 from "../assets/ped.jpg";
import make8 from "../assets/ped1.jpg";
import make9 from "../assets/ped2.jpg";
// For manicure
import make10 from "../assets/imageN.jpg";
import make12 from "../assets/imagenil.jpg";
// For hair sty
import make13 from "../assets/menB.jpg";
import make14 from "../assets/kinkB.jpg";
import make15 from "../assets/fulB.jpg";
import make16 from "../assets/bB.jpg";
import make17 from "../assets/download.jpg";
// for nails
import nail1 from "../assets/imagenil.jpg";
import nail2 from "../assets/imagenil.jpg";
import nail3 from "../assets/imagenil.jpg";
import nail4 from "../assets/imagenil.jpg";
import nail5 from "../assets/imagenil.jpg";

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
      } catch (err) {
        console.log(`An error occurred: ${err}`);
      }
    };
    fetchPlans();
  }, []);

  const handleSelect = async (e) => {
    const selectedPlan = e.target.value;
    const checkPlan = plans.find((plan) => plan._id === selectedPlan);
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

  const initializePaymentData = {
    amount: aside.price,
    email: user?.email,
    userId: user?._id || user?.id,
    planId: aside.id,
    paymentType: "subscription",
  };

  const initilaizePay = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/api/paystack/initialize",
        initializePaymentData,
      );
      const { authorization_url } = res.data.data;
      if (authorization_url) {
        window.location.href = authorization_url;
      } else {
        alert("Could not get payment link. Please try again.");
      }
    } catch (err) {
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
            "Pedicure & Manicure",
            "massage",
            "nails",
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
      <div className="main-content tab-content">
        {/* MAKEUP TAB */}
        {activeTab === "nails" && (
          <div className="tab-content">
            <h1>Nail Services</h1>
            <hr />
            <div className="content mt-4">
              <Content
                myImage={nail1}
                Title="Basic Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Essential grooming and clean,
                      classic finishes.
                    </p>
                    <p>
                      <strong>Duration:</strong> 3x session.
                    </p>
                    <p>
                      <strong>Products:</strong> Essie, OPI, Sally Hansen.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Premium.
                    </p>
                    <p>
                      <strong>Price:</strong> 150,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Classic Manicures, Shape & Buff, and Standard Polish.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={nail2}
                Title="Premium Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Long-lasting wear with
                      enhanced durability and shine.
                    </p>
                    <p>
                      <strong>Duration:</strong> 3x session.
                    </p>
                    <p>
                      <strong>Products:</strong> CND Shellac, Gelish, Kiara Sky.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Luxury.
                    </p>
                    <p>
                      <strong>Price:</strong> 200,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Gel Manicures, Hard Gel Overlays, and Basic Nail Art.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={nail3}
                Title="Luxury Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Custom lengths and intricate
                      hand-painted designs.
                    </p>
                    <p>
                      <strong>Duration:</strong> 3x session.
                    </p>
                    <p>
                      <strong>Products:</strong> Après Gel-X, Young Nails,
                      Swarovski Crystals.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Exclusive.
                    </p>
                    <p>
                      <strong>Price:</strong> 300,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Gel-X Extensions, French Tips, and 3D Accent Nails.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={nail4}
                Title="Exclusive Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> High-fashion structural
                      artistry and maximum strength.
                    </p>
                    <p>
                      <strong>Duration:</strong> 4x session.
                    </p>
                    <p>
                      <strong>Products:</strong> Valentino Beauty Pure, Luxury
                      Acrylics in custom colors, and 3D Embellishments.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 Monthly Giftable
                      Slot.
                    </p>
                    <p>
                      <strong>Price:</strong> undefined.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Full Sculpted Acrylic Sets, Extreme Lengths, and Master Art.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={nail5}
                Title="Combo Plan(Basic, Premium)"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> The ultimate hands-and-feet
                      refresh. Complete nail care.
                    </p>

                    <p>
                      <strong>Products:</strong> Premium Spa & Professional Nail
                      Systems.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off first trial.
                    </p>
                    <p>
                      <strong>Price:</strong> 180,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Elite Suite: Access to all Manicure, Pedicure, and Nail
                    Enhancement services.
                  </ListGroup.Item>
                }
              />
            </div>
          </div>
        )}
        {activeTab === "makeup" && (
          <div className="tabcontent">
            <h1>Makeup Artistry</h1>
            <hr />
            <div className="content mt-4">
              <Content
                myImage={make1}
                Title="Basic Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Cleansing the face, Light
                      moisturizing, Primer application (to smooth skin),Minimal
                      foundation or BB cream Even skin tone without heavy
                      coverage, Light eyebrow filling Brushing and shaping, Lip
                      gloss or simple lipstick, Light blush for a natural glow
                    </p>
                    <p>
                      <strong>Products:</strong> Primer , Foundation/BB Cream
                      Powder(Zikel, House of Tara) Lip gloss/lipstick Mascara
                      Basic brushes or sponges (Real Techniques, EcoTools).
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Premium plan.
                    </p>
                    <p>
                      <strong>Duration:</strong> 2x/month.
                    </p>
                    <p>
                      <strong>Price:</strong> 150,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Simple Everyday Look (Skin tint, mascara, and balm).
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make2}
                Title="Premium Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Basic Service + Deep cleansing,
                      Moisturizing based on skin, type Primer + pore filling,
                      Medium to full coverage foundation, Concealer for
                      under-eye + blemishes, Highlighting and brightening,
                      Enhanced Eye Makeup, Lip Perfection.
                    </p>
                    <p>
                      <strong>Products:</strong> Long-wear foundations
                      (Maybelline, L’Oréal, Huda Beauty FauxFilter) Setting
                      sprays (NYX, Milani, etc.) Highlighter palettes Quality
                      lashes Better, brush techniques & blending tools.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to luxury plan
                    </p>
                    <p>
                      <strong>Duration:</strong> 2x/month.
                    </p>
                    <p>
                      <strong>Price:</strong> 350,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Soft Glam or Evening Glow (Full coverage, eyes, and
                    highlight).
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make3}
                Title="Luxury Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Basic Services + Premium
                      Services, Skin type analysis (oily, dry, combination)
                      Product selection tailored to client Mini skincare prep
                      routine, High-end foundation (Huda Beauty, Fenty, MAC,
                      etc.) Color correction (dark spots,
                      hyperpigmentation),Advanced Eye Glam.
                    </p>
                    <p>
                      <strong>Products:</strong> Fenty Beauty, MAC, Huda Beauty,
                      NARS Luxury setting sprays (Urban Decay, Charlotte
                      Tilbury) Professional palettes & tools High-quality lashes
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Exclusive plan.
                    </p>
                    <p>
                      <strong>Duration:</strong> 3x/month.
                    </p>
                    <p>
                      <strong>Price:</strong> 500,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Airbrush & Celebrity Finish (Weightless, camera-perfect
                    skin).
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make3b}
                Title="Exclusive Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Basic Service + Premium
                      Services + Luxury Services, Personal consultation to
                      customize looks based on preferences and occasions,
                      On-demand appointments with same-day service, Personal
                      makeup artist assigned to you, Unlimited makeup sessions
                      per month, Access to exclusive products and techniques,
                      Priority booking for special events.
                    </p>
                    <p>
                      <strong>Products:</strong> Dior, Charlotte Tilbury, Fenty
                      Beauty, NARS High-end setting sprays (Urban Decay, CT
                      Airbrush) Professional HD products Luxury tools & hygiene
                      standards.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + one free exclusive session.
                    </p>
                    <p>
                      <strong>Duration:</strong> Unlimited sessions.
                    </p>

                    <p>
                      <strong>Price:</strong> undefined.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    All-Access: Enjoy benefits from Basic, Premium, and Luxury
                    tiers.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make3a}
                Title="Combo Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> The ultimate beauty arsenal.
                      Everything we offer, whenever you need it.
                    </p>
                    <p>
                      <strong>Products:</strong> Top-tier Artisan & Designer
                      brands.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% discount on your first trial
                      session.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    The Master Suite: Full access to all Makeup services and
                    styles.
                  </ListGroup.Item>
                }
              />
            </div>
          </div>
        )}

        {/* MASSAGE TAB */}
        {activeTab === "massage" && (
          <div className="tab-content">
            <h1>Wellness & Massage</h1>
            <hr />
            <div className="content mt-4">
              <Content
                myImage={make4}
                Title="Basic Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Quick tension relief and
                      stress-busting recovery.
                    </p>
                    <p>
                      <strong>Products:</strong> Essential calming oils (Dr.
                      Teal's, Aura Cacia).
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to the Luxury Plan.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Relaxation Massage (Focused on neck, back, and shoulders).
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make5}
                Title="Premium Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Targeted muscle repair and
                      deep therapeutic pressure.
                    </p>
                    <p>
                      <strong>Products:</strong> High-performance oils (Weleda,
                      Bio-Oil).
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to the Luxury Plan.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Deep Tissue Therapy (Full body circulation and muscle
                    relief).
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make6}
                Title="Luxury Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> A sensory journey with
                      premium heat and aromatics.
                    </p>
                    <p>
                      <strong>Products:</strong> Spa-exclusive brands (Elemis,
                      L'Occitane).
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to the Exclusive Plan.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Hot Stone & Aromatherapy (Ultimate pampering and
                    relaxation).
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make6b}
                Title="Exclusive Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Elite holistic bodywork and
                      restorative rituals.
                    </p>
                    <p>
                      <strong>Products:</strong> Custom organic essential oil
                      blends.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off first trial + 1 Monthly
                      Giftable Slot to any plan.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    All-In-One Ritual: Includes Swedish, Deep Tissue, and
                    Stones.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make6a}
                Title="Combo Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Total Body Rejuvenation. The
                      complete spa ecosystem.
                    </p>
                    <p>
                      <strong>Products:</strong> Top-notch Botanical & Luxury
                      brands.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% discount on your first trial
                      session.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Wellness Suite: Full access to all Massage therapy types.
                  </ListGroup.Item>
                }
              />
            </div>
          </div>
        )}

        {/* PEDICURE & MANICURE TAB */}
        {activeTab === "Pedicure & Manicure" && (
          <div className="tabcontent">
            <h1>Hand & Foot Care</h1>
            <hr />
            <div className="content mt-4">
              <Content
                myImage={make7}
                Title="Basic Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Essential grooming for clean,
                      healthy, and neat nails.
                    </p>
                    <p>
                      <strong>Products:</strong> Sally Hansen, standard lacquer.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Luxury.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Trimming, Shaping, Cuticle Care, and 1-Color Polish.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make8}
                Title="Premium Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Long-lasting shine and
                      skin-softening exfoliation.
                    </p>
                    <p>
                      <strong>Products:</strong> Professional brands (OPI,
                      Essie, CND).
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Luxury.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Full Spa Experience: Scrub, Mask, Massage, and Gel Polish.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make9}
                Title="Luxury Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Anti-aging hand and foot
                      therapy with a high-fashion finish.
                    </p>
                    <p>
                      <strong>Products:</strong> Designer care (Dior, Chanel Le
                      Vernis).
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Exclusive.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Paraffin Wax, Serum Treatment, and Custom Chrome Finish.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make12}
                Title="Exclusive Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Bespoke nail architecture and
                      elite skin repair.
                    </p>
                    <p>
                      <strong>Products:</strong> Medical-grade and Designer
                      products.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 Monthly Giftable
                      Slot.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Full Rejuvenation + Custom Art + 1-on-1 Artist Consultation.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make10}
                Title="Combo Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Experience:</strong> Complete hand and foot luxury
                      without limits.
                    </p>
                    <p>
                      <strong>Products:</strong> Top-tier Professional & Luxury
                      brands.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% discount on first trial.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Unlimited Suite: Full access to all Manicure & Pedicure
                    tiers.
                  </ListGroup.Item>
                }
              />
            </div>
          </div>
        )}

        {/* HAIR STYLING TAB */}
        {activeTab === "hair-styling" && (
          <div className="tab-content">
            <h1>Hair Styling</h1>
            <hr />
            <div className="content mt-4">
              <Content
                myImage={make13}
                Title="Basic Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Hair washing with shampoo &
                      conditioner, Blow-drying or stretching for natural hair,
                      Simple styling braids, cornrows, or wig installation.
                    </p>
                    <p>
                      <strong>Products:</strong> Dark & Lovely Moisture
                      Conditioner,Castor oil, Hair mousse.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Luxury.
                    </p>
                    <p>
                      <strong>Duration:</strong> 2x/month.
                    </p>
                    <p>
                      <strong>Price:</strong> 150,000. Slot.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Slick Backs, Ponytails, and Basic Trims.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make14}
                Title="Premium Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Deep hair washing + luxury
                      conditioning, Advanced treatments protein, hydration,
                      scalp detox,Wig installation, Advance Braiding,Scalp
                      massage / spa treatment
                    </p>
                    <p>
                      <strong>Products:</strong> DShea Moisture / Cantu, Keratin
                      treatment kits, Essential oils + scalp serums.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Luxury.
                    </p>
                    <p>
                      <strong>Duration:</strong> 2x/month.
                    </p>
                    <p>
                      <strong>Price:</strong> 300,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Silk Press, Beachy Waves, and Advanced Blowouts.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make15}
                Title="Luxury Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Basic Service + Premium
                      Services, High-end wig installation HD lace, custom wigs,
                      Hair coloring balayage, highlights, custom tones Hair
                      extensions 100% human hair, installed professionally.
                    </p>
                    <p>
                      <strong>Products:</strong> DShea Moisture / Cantu, Keratin
                      treatment kits, Essential oils + scalp serums.
                    </p>
                    <p>
                      <strong>Bonus:</strong> 10% off trial + 1 monthly upgrade
                      to Luxury.
                    </p>
                    <p>
                      <strong>Duration:</strong> 3x/month.
                    </p>
                    <p>
                      <strong>Price:</strong> 500,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Hollywood Waves, Bridal Prep, and Scalp Revitalization.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make17}
                Title="Exclusive Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Basic Service + Premium
                      Services + Luxury Services, Luxury Service, Unlimited hair
                      styling per month , On-demand appointments same-day
                      service, Personal stylist assigned to you.
                    </p>
                    <p>
                      <strong>Products:</strong> DShea Moisture / Cantu, Keratin
                      treatment kits, Essential oils + scalp serums.
                    </p>

                    <p>
                      <strong>Price:</strong> undefined.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Custom Color + Extension Install + Precision Couture Cut.
                  </ListGroup.Item>
                }
              />
              <Content
                myImage={make16}
                Title="Combo Plan"
                b4Bdy={
                  <div>
                    <p>
                      <strong>Services:</strong> Basic Service + Premium
                      Services, High-end wig installation HD lace, custom wigs,
                      Hair coloring balayage, highlights, custom tones Hair
                      extensions 100% human hair, installed professionally.
                    </p>
                    <p>
                      <strong>Products:</strong> DShea Moisture / Cantu, Keratin
                      treatment kits, Essential oils + scalp serums.
                    </p>

                    <p>
                      <strong>Duration:</strong> 2x/month.
                    </p>
                    <p>
                      <strong>Price:</strong> 350,000.
                    </p>
                  </div>
                }
                item={
                  <ListGroup.Item>
                    Artistry Suite: Access to all Hair Styling and Color
                    services.
                  </ListGroup.Item>
                }
              />
            </div>
          </div>
        )}

        {/* CREATE PLAN / SUBSCRIPTION TAB */}
        {activeTab === "create-plan" && (
          <div className="tab-content">
            <h1>Membership Subscription</h1>
            <hr />
            <div className="allP p-5">
              <div className="price justify-content-end me-5 d-flex align-items-center">
                {aside.price && <h1> {aside.price} NGN</h1>}
                <span style={{ color: "#ffd700", marginLeft: "10px" }}>
                  {" "}
                  / Month
                </span>
              </div>
              <hr />
            </div>

            <div className="all">
              <h3>Select Your Desired Tier</h3>
              <form className="frm" onSubmit={initilaizePay}>
                {plans.map((plan) => (
                  <div className="e" key={plan._id}>
                    <input
                      type="radio"
                      id={plan.name}
                      name="plan"
                      value={plan._id}
                      onClick={handleSelect}
                    />
                    <label htmlFor={plan.name}>{plan.name}</label>
                  </div>
                ))}
                <Button className="mt-4" type="submit" disabled={!aside.id}>
                  Proceed to Payment
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
