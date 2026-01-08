import React, { useState } from "react";
import "./Styles/fq.css";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const fqs = [
  {
    index: 1,
    title: "What is BeautyOnWheel?",
    answer:
      "is a mobile beauty service platform that brings expertly trained beauty professionals to your doorstep.",
  },
  {
    index: 2,
    title: " What services does BeautyOnWheel offer?",
    answer:
      "offers the following services: Makeup, Massage,Pedicure and Manicure",
  },
  {
    index: 3,
    title: "  How do I book an appointment?",
    answer:
      "www.beautyonwheel.com use our online booking system to select your service, date, and time.Reach out to us directly at +2347089986222 to book your appointment over the phone or via text message",
  },
  {
    index: 4,
    title: "What if my beauty professional is late?",
    answer:
      "We strive to respect your time and schedule. If your beauty professional is late, we'll work with you to find a solution that meets your needs",
  },
  {
    index: 5,
    title: " How do I contact BeautyOnWheel?",
    answer:
      "Phone: Call us at [07089986222] to speak with our customer support team.Send us an email at [insert email address] and we'll respond promptly",
  },
  {
    index: 7,
    title: " How far in advance can I book an appointment?",
    answer: "",
  },
  {
    index: 8,
    title: "What is the cancellation policy? ",
    answer:
      "BeautyOnWheel's cancellation policy requires a minimum of 24 hours' notice for cancellations or rescheduling. If you cancel or reschedule within 24 hours of your appointment, you may be charged a fee... To cancel or reschedule, please contact us directly via phone or email.",
  },
  {
    index: 9,
    title: " Can I reschedule my appointment?",
    answer:
      "To reschedule your appointment with BeautyOnWheel, you'll need to provide at least 24 hours' notice",
  },
  {
    index: 10,
    title: "  What qualifications do your beauty have?",
    answer:
      "Our beauty professionals hold esteemed qualifications that equip them with the skills and knowledge necessary to deliver exceptional services",
  },
  {
    index: 11,
    title: "  Can I choose my beauty professional?",
    answer: "",
  },
  {
    index: 12,
    title: "What products do you use?",
    answer: "",
  },
  {
    index: 13,
    title: " How much do your services cost?",
    answer:
      "visit our website and subscription page you will see all the packages",
  },
  {
    index: 14,
    title: "  Can I get a refund if I'm not satisfied?",
    answer: " check our terms and conditions of the company",
  },
  {
    index: 15,
    title: " Do your professionals follow proper sanitation?",
    answer:
      "yes,Our professionals strictly follow proper sanitation procedures to ensure a safe and healthy environment for clients",
  },
  {
    index: 16,
    title: "  What if I have a skin condition or allergy?",
    answer:
      "If you have a skin condition or allergy, it's essential to inform your beauty professional before any treatment,they will Access your Skin chouce suitable product and take necessary precautions",
  },

  {
    index: 18,
    title: "Can I request a specific environment or setup?",
    answer: "yes,You can definitely request a specific environment",
  },
];
function Fq() {
  const [current, setCurrent] = useState(null);

  function handleToggleChange(index) {
    setCurrent(current === index ? null : index);
  }

  return (
    <div className="fq_container">
     
      <div>
        <div className="userInforText">
          <p>Welcome to BeautyOnWheel Frequent Question</p>
        </div>
        <div className="fq_items">
          {fqs.map((fq) => (
            <div key={fq.index}>
              <div className="acordion_items">
                <div className="items">
                  <h2 className="header">{fq.title}</h2>
                  <button
                    onClick={() => handleToggleChange(fq.index)}
                    style={{
                      backgroundColor: "white",
                      border: "none",
                    }}
                  >
                    {current !== fq.index ? (
                      <FaChevronDown size="20" />
                    ) : (
                      <FaChevronUp size="20" />
                    )}
                  </button>
                </div>
                <div
                  className={`accordion_answer ${
                    current === fq.index ? "show" : "hide"
                  }`}
                >
                  <p className="answer">{fq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fq;
