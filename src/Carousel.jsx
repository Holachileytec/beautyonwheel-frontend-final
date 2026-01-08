// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";
import makeupH from "./assets/makeupH.jpg";
import maniH from "./assets/maniH.jpg";
import pedicH from "./assets/pedicH.jpg";
import Testing from "./assets/myTest.png";
import massage from "./assets/massH.jpg";
import "./Styles/carousel.css";

// import required modules
import { Pagination } from "swiper/modules";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import SwipeContent from "./SwipeContent";

function Carousel() {
  return (
    <>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <SwipeContent
            Testing={Testing}
            bigTxt={
              <span style={{ marginLeft: "150px" }} className="bigT">
                {" "}
                Our Team
              </span>
            }
            smllTxt={
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda a laboriosam, dignissimos <br /> officia accusamus quo
                distinctio facilis quam
              </p>
            }
            btnTxt="About Us "
            goSomewhere="/aboutus"
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={massage}
            bigTxt={
              <span style={{ marginLeft: "150px" }} className="bigT">
                {" "}
                Massage
              </span>
            }
            smllTxt={
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda a laboriosam, dignissimos <br /> officia accusamus quo
                distinctio facilis quam
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={Testing}
            bigTxt={
              <span style={{ marginLeft: "220px" }} className="bigT">
                {" "}
                Nails
              </span>
            }
            smllTxt={
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda a laboriosam, dignissimos <br /> officia accusamus quo
                distinctio facilis quam
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={maniH}
            bigTxt={
              <span style={{ marginLeft: "150px" }} className="bigT">
                {" "}
                Manicure
              </span>
            }
            smllTxt={
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda a laboriosam, dignissimos <br /> officia accusamus quo
                distinctio facilis quam
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={pedicH}
            bigTxt={
              <span style={{ marginLeft: "150px" }} className="bigT">
                Pedicure
              </span>
            }
            smllTxt={
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda a laboriosam, dignissimos <br /> officia accusamus quo
                distinctio facilis quam
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={makeupH}
            bigTxt={
              <span style={{ marginLeft: "150px" }} className="bigT">
                {" "}
                MakeUp
              </span>
            }
            smllTxt={
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda a laboriosam, dignissimos <br /> officia accusamus quo
                distinctio facilis quam
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Carousel;
