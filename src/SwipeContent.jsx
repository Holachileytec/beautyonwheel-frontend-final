import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "./Styles/carousel.css";

function SwipeContent({ Testing, bigTxt, smllTxt, btnTxt }) {
  return (
    <div>
      <img src={Testing} alt="myImage" />
      <h1
        style={{
          position: "absolute",
          top: "28%",
          color: "white",
          left: "25%",
          fontSize: "80px",
        }}
        className="BiT"
      >
        {bigTxt}
      </h1>
      <div style={{ width: "100%", textAlign: "center" }}>
        <i
          style={{
            position: "absolute",
            top: "48% ",
            color: "white",
            left: "25%",
          }}
          className="biS"
        >
          {smllTxt}
        </i>
      </div>

      <div className="BN">
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
      </div>
    </div>
  );
}

export default SwipeContent;
