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
                We deliver premium makeup Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
              </i>
            </p>
            <div className="BN serv">
              <Button>
                ViewAll {"  "}
                <FaArrowRight className="arr" />
              </Button>
            </div>
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
                {" "}
                We deliver premium makeup Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
              </i>
            </p>
            <div className="BN serv">
              <Button>
                ViewAll {"  "}
                <FaArrowRight className="arr" />
              </Button>
            </div>
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
                We deliver premium makeup Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
              </i>
            </p>
            <div className="BN serv">
              <Button>
                ViewAll {"  "}
                <FaArrowRight className="arr" />
              </Button>
            </div>
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
                We deliver premium makeup Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
              </i>
            </p>
            <div className="BN serv">
              <Button>
                ViewAll {"  "}
                <FaArrowRight className="arr" />
              </Button>
            </div>
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
                We deliver premium makeup Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
                adipisicing elit. Explicabo nisi quibusdam suscipit nostrum
                facere nemo, ex, necessitatibus ipsa officiis commodi magnam
                odit quia illo voluptate voluptatum dolorum fuga, esse ratione.
              </i>
            </p>
            <div className="BN serv">
              <Button>
                ViewAll {"  "}
                <FaArrowRight className="arr" />
              </Button>
            </div>
          </div>
        }
        SecT={<span id="mkup">Makeup</span>}
      />
    </div>
  );
}

export default AllServices;
