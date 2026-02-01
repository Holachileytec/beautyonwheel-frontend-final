// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";
import makeupH from "../assets/makeupH.jpg";
import maniH from "../assets/maniH.jpg";
import pedicH from "../assets/pedicH.jpg";
import imageE from "../assets/imageE.jpg";
import braid from "../assets/braid.jpg";
import massage from "../assets/massH.jpg";
import "../Styles/carousel.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import SwipeContent from "./SwipeContent";
// const delay = { delay: 1000 };

function Carousel() {
  return (
    <>
      <Swiper
        direction={"horizontal"}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <SwipeContent
            Testing={imageE}
            bigTxt={<span className="bigT"> Our Team</span>}
            smllTxt={
              <p>
                BeautyOnWheel is powered by a dynamic team focused on delivering
                convenient, high-quality beauty services directly to our clients{" "}
                <br />
                Founder & CEO Provides overall vision, business strategy,
                partnerships, and brand direction. Oversees growth and ensures
                the company stays aligned with its mission.
                <br />
                Project Manager Coordinates daily operations, manages timelines,
                and ensures smooth execution of services and projects from
                planning to delivery.
                <br />
                Operations Manager Handles service logistics, supervises
                customer support team, vendor management, and quality control to
                ensure seamless on-the-go service delivery.
                <br />
                Marketing & Sales Team Develops marketing strategies, manages
                social media, drives customer acquisition, and builds brand
                awareness.
                <br />
                Director of creativity Oversees all creative aspects including
                beauty shows and events to ensure brand consistency and high
                standards.
                <br />
                Technical / IT Support (Web & App) Manages the booking platform,
                website, backend systems, integrations (e.g., Google sign-in,
                notifications), and data security <br />
                legal & Compliance Advisor Ensures all operations comply with
                local regulations, handles contracts, and manages liability
                issues.
              </p>
            }
            btnTxt="About Us "
            goSomewhere="/about.jsx"
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={massage}
            bigTxt={<span className="bigT"> Massage</span>}
            smllTxt={
              <p>
                Massage Therapy Our professional massage service is designed to
                relieve stress, reduce muscle tension,
                <br /> and promote total body relaxation. Delivered by trained
                therapists in the comfort of your chosen location,
                <br /> BeautyOnWheel massages help improve circulation, ease
                body aches, and restore balance—leaving you refreshed,
                <br /> relaxed, and re-energized.
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={braid}
            bigTxt={<span className="bigT"> Hair Styling</span>}
            smllTxt={
              <p>
                Transform your look with stylish, neatly done hairstyles suited
                for any occasion. <br />
                We create looks that complement your features and reflect your
                unique personality, tailored to your preference.
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={maniH}
            bigTxt={<span className="bigT"> Manicure</span>}
            smllTxt={
              <p>
                Keep your hands looking polished and elegant with our manicure
                services, <br />
                combining nail care and shaping for a neat, refined look
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={pedicH}
            bigTxt={<span className="bigT">Pedicure</span>}
            smllTxt={
              <p>
                Treat your feet to expert care with our refreshing pedicure
                services designed to cleanse, <br /> nourish, and leave your
                feet smooth, healthy, and beautifully finished.
              </p>
            }
            btnTxt="Shop Now "
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeContent
            Testing={makeupH}
            bigTxt={<span className="bigT"> MakeUp</span>}
            smllTxt={
              <p>
                Enhance your natural beauty with professional makeup tailored to
                your skin tone, occasion, <br />
                and personal style. From soft everyday looks to full glam, we
                deliver flawless results.
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
