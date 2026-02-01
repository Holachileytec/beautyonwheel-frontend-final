import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "../Styles/carousel.css";

function SwipeContent({ Testing, bigTxt, smllTxt, btnTxt, goSomewhere }) {
  return (
    <div className="theSlide" style={{ background: "red" }}>
      <img src={Testing} alt="myImage" />
      <h1
        style={{
          position: "absolute",
          top: "10%",
          color: "white",
          textAlign: "center",
          fontSize: "80px",
          width: "100%",
        }}
        className="BiT"
      >
        {bigTxt}
      </h1>

      <i
        style={{
          position: "absolute",
          top: "25% ",
          color: "white",
          width: "100%",
          textAlign: "center",
          fontSize: "25px",
          
        }}
        className="biS"
      >
        {smllTxt}
      </i>

      <div className="BN">
        <a href={goSomewhere}>
          <Button
            style={{
              position: "absolute",
              top: "65%",

              left: "45%",
            }}
            className="biB"
          >
            {btnTxt}
            <FaArrowRight />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default SwipeContent;
