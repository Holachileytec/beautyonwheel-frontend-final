import React, { useState } from "react";
import "../Styles/fq.css";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const fqs = [
  {
    index: 1,
    title: "What is BeautyOnWheel?",
    answer:
      "BeautyOnWheel is a mobile beauty and entertainment service platform that connects clients with certified beauty professionals and creative production teams. We deliver salon-quality beauty services and beauty-related entertainment experiences at your home, office, event venue, or preferred location.",
  },
  {
    index: 2,
    title: " What services does BeautyOnWheel offer?",
    answer:
      "BeautyOnWheel offers a wide range of beauty and entertainment services, including: Beauty & Wellness Services: Hair styling and hair treatments, Makeup services (bridal, party, casual, editorial), Manicure and pedicure, Skincare and facial treatments, Massage and spa services, Grooming services for men, Entertainment & Events Services: Beauty Game Reality Shows,Beauty Fashion Shows and Runway Events,Beauty Talent Competitions,Live beauty demonstrations and workshops,Corporate and private beauty-themed entertainment events,Service availability may vary by location",
  },
  {
    index: 3,
    title: "  How do I book an appointment?",
    answer:
      "You can book a service through our website www.beautyonwheel.com.ng, or call our customer support team on +2348164267868, +2347083878594, you an also reach us through our email & social media handlers Email: @beautyonwheel012@gmail.com, Facebook: @beautyonwheel012@gmail.com, Instagram: @beautyonwheel012, TikTok: @beautyonwheel. Select your service type, preferred date, time, and location, then confirm your booking",
  },
  {
    index: 4,
    title:
      "What if my beauty professional is late and how far in advance can I book an appointment?",
    answer:
      "We value punctuality and professionalism. If a beauty professional is delayed, you will be notified in advance. If the delay exceeds our service standards, you may reschedule or request compensation according to our policy. Appointments and events can be booked up to 30 days in advance. For large entertainment productions, we recommend booking at least 2–4 weeks in advance for proper planning",
  },

  {
    index: 6,
    title: "What is the cancellation policy & Reschedule an Appointment? ",
    answer:
      "Cancellations made at least 24 hours before the appointment are free of charge. Late cancellations or no-shows may attract a cancellation fee. Event bookings may require a non-refundable deposit You can reschedule up to 24 hours before the scheduled time without additional charges. Event rescheduling is subject to availability and contractual terms",
  },

  {
    index: 7,
    title:
      "  What qualifications do your beauty have allow to choose Beauty Professional?",
    answer:
      "All BeautyOnWheel professionals are:Certified and licensed beauty practitioners,Trained in hygiene, safety, and customer service,Experienced in their respective fields,Background-checked and vetted for professionalism and Yes. You may request a specific beauty professional when booking, subject to availability.",
  },

  {
    index: 8,
    title: "What products do you use & services cost?",
    answer:
      "We use premium, professional-grade, and dermatologically tested products. Organic and hypoallergenic options are available upon request. Pricing depends on the service type, location, professional level, and event scale. A detailed price list and event quotation are available upon request or on our website",
  },

  {
    index: 9,
    title:
      "  Can I get a refund if I'm not satisfied what about skin condition or allergy?",
    answer:
      " Customer satisfaction is our priority. If you are not satisfied, contact us within 24 hours after the service. Refunds or service corrections will be handled according to our quality assurance policy. Concerning the skin condition please inform us during booking, We will tailor products and procedures to your needs also A patch test may be recommended for sensitive skin.",
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
