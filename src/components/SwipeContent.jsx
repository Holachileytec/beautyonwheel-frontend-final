import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "../Styles/carousel.css";

function SwipeContent({ Testing, bigTxt, smllTxt }) {
  return (
    <div className="theSlide">
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
          fontSize: "20px",
        }}
        className="biS"
      >
        {smllTxt}
      </i>
    </div>
  );
}

export default SwipeContent;
