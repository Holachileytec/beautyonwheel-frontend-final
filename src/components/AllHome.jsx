import React from "react";
import NextSection from "./NextSection";
import AllServices from "./AllServices";
import Footer from "./Footer";
import Carousel from "./Carousel";
function AllHome() {
  return (
    <div>
      {" "}
      <Carousel />
      <NextSection />
      <AllServices />
 
    </div>
  );
}

export default AllHome;
