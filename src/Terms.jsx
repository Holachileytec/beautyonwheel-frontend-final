import React from "react"

import "./Styles/terms.css"

function Terms (){
  return(
      <>
    <div className="terms-container">
        <div className="terms-Wrapper">
          <h1 className="tc">Terms and Conditions </h1>
          <div className="ourService">
            <p>
              Welcome to BeautyOnWheel (“we,” “our,” or “us”). These Terms and
              Conditions (“Terms”) govern your use of our services, website, and
              mobile application (collectively, the “Platform”). By accessing or
              using BeautyOnWheel, you agree to be bound by these Terms. If you
              do not agree, please do not use our services.
            </p>
          </div>
          <div className="ourService">
            <h2>User Eligibility </h2>
            <p>
              You must: Be at least 18 years old to book or use our services.
              Provide accurate personal information when registering or booking.
              Not use our platform for fraudulent or illegal purposes.
            </p>
          </div>
          <div className="ourService">
            <h2>Booking and Payments </h2>
            <p>
              All bookings must be made through our official platform or
              verified channels. Prices for services are clearly listed before
              confirming a booking. Payments can be made online (via card,
              transfer, or wallet) or on delivery (if available). Once payment
              is made, a booking confirmation will be sent to your email or
              dashboard.
            </p>
          </div>
          <div className="ourService">
            <h2>Cancellations and Refunds </h2>
            <p>
              You may cancel a booking at least 2 hours before the scheduled
              time for a full refund. Cancellations made less than 2 hours
              before your appointment may attract a fee or partial refund. If a
              service provider cancels, you will receive a full refund or be
              offered to reschedule
            </p>
          </div>
          <div className="ourService">
            <h2>Service Delivery </h2>
            <p>
              Service providers will arrive at the location you specified during
              booking. Ensure that your environment is clean, safe, and suitable
              for service delivery. BeautyOnWheel reserves the right to decline
              or discontinue service if the environment is unsafe or
              inappropriate.
            </p>
          </div>
          <div className="ourService">
            <h2>User Responsibilities </h2>
            <p>
              You agree to: Treat service providers with respect and
              professionalism. Avoid any form of harassment, abuse, or
              misconduct. Provide accurate feedback after each service.
            </p>
          </div>
          <div className="ourService">
            <h2>Privacy Policy </h2>
            <p>
              Your privacy is important to us. We collect and use your data in
              accordance with our Privacy Policy, which explains how your
              personal information is stored and protected. Please review it
              carefully before using our services.
            </p>
          </div>
          <div className="ourService">
            <h2>Governing Law </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of [Insert Country/State, e.g., Nigeria]. Any disputes will
              be settled in the appropriate courts within [Insert jurisdiction]
            </p>
          </div>
          <div className="ourService">
            <h2>Acceptance </h2>
            <p>
              By using BeautyOnWheel, you confirm that you have read,
              understood, and agreed to these Terms and Conditions
            </p>
          </div>
        </div>
      </div>
      </>
  )

}
export default Terms;