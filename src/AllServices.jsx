import { useRef, useEffect } from "react";
import Services from "./Services";
import { FaArrowRight } from "react-icons/fa";
import manic from "./assets/manic.jpg";
import makeup from "./assets/hero.jpg";
import nail from "./assets/nails.jpg";
import pedic from "./assets/pedic.jpg";
import massage from "./assets/masge.jpg";
import { Button } from "react-bootstrap";
import "./Styles/services.css";
import { Link } from "react-router-dom";

function AllServices() {
  return (
    <div>
      <Services
        Col1={
          <div>
            <img src={massage} alt="myImg" width="90%" height="30%" />
          </div>
        }
        Col2={
          <div>
            <p className="desc">
              <i>
                {" "}
                Relax and unwind with our soothing massage service,
                designed to melt away stress and rejuvenate your body.
                Our skilled therapists use tailored techniques to
                ease tension, leaving you feeling refreshed and
                revitalized.
              </i>
            </p>
            <Link to="/massage" style={{ textDecoration: "none" }}>
              {" "}
              <div className="BN serv">
                <Button>
                  ViewAll {"  "}
                  <FaArrowRight className="arr" />
                </Button>
              </div>
            </Link>
          </div>
        }
        SecT={<span id="masge">Massage</span>}
      />
      <Services
        styleRsec="otherSide"
        Col1={
          <div>
            <p className="desc">
              <i>
                Treat your nails to expert care with our manicure and
                pedicure services. From classic to creative designs,
                we provide detailed,
                long-lasting results that keep your nails looking perfect.
              </i>
            </p>
            <Link to="/nail-service" style={{ textDecoration: "none" }}>
              {" "}
              <div className="BN serv">
                <Button>
                  ViewAll {"  "}
                  <FaArrowRight className="arr" />
                </Button>
              </div>
            </Link>
          </div>
        }
        Col2={
          <div>
            <img src={nail} alt="myImg" width="90%" height="30%" />
          </div>
        }
        SecT={<span id="nils">Nails</span>}
      />
      <Services
        Col1={
          <div>
            <img src={manic} alt="myImg" width="90%" height="30%" />
          </div>
        }
        Col2={
          <div>
            <p className="desc">
              <i>
                {" "}
               Indulge in a professional manicure that ensures your hands
                and nails look stunning. Whether you prefer a timeless
                 polish or a trendy design, our technicians 
               provide meticulous attention to detail for a polished,
                perfect look.
              </i>
            </p>
            <Link to="/manicure" style={{ textDecoration: "none" }}>
              {" "}
              <div className="BN serv">
                <Button>
                  ViewAll {"  "}
                  <FaArrowRight className="arr" />
                </Button>
              </div>
            </Link>
          </div>
        }
        SecT={<span id="mnicure">Manicure</span>}
      />
      <Services
        styleRsec="otherSide"
        Col1={
          <div>
            <p className="desc">
              <i>
                {" "}
                Give your feet the pampering they deserve
                 with our luxurious pedicure service. We 
                 focus on relaxation and care,
                 leaving your feet soft, smooth, and beautifully polished.
              </i>
            </p>
            <Link to="/pedicure" style={{ textDecoration: "none" }}>
              {" "}
              <div className="BN serv">
                <Button>
                  ViewAll {"  "}
                  <FaArrowRight className="arr" />
                </Button>
              </div>
            </Link>
          </div>
        }
        Col2={
          <div>
            <img src={pedic} alt="myImg" width="90%" height="30%" />
          </div>
        }
        SecT={<span id="pdicure">Pedicure</span>}
      />
      <Services
        Col1={
          <div>
            <img src={makeup} alt="myImg" width="90%" height="30%" />
          </div>
        }
        Col2={
          <div>
            <p className="desc">
              <i>
                {" "}
           Enhance your natural beauty with our professional
            makeup service. Whether it's for a special occasion
             or a fresh everyday look, our makeup artists use
              high-quality products 
           to create a flawless finish that boosts your confidence.
              </i>
            </p>
            <Link to="/makeup" style={{ textDecoration: "none" }}>
              {" "}
              <div className="BN serv">
                <Button>
                  ViewAll {"  "}
                  <FaArrowRight className="arr" />
                </Button>
              </div>
            </Link>
          </div>
        }
        SecT={<span id="mkup">Makeup</span>}
      />
    </div>
  );
}

export default AllServices;
