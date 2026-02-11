import React, { useState, useEffect, useMemo } from 'react';
import api from '../config/api';
import "../Styles/payment.css";
import { useLocation } from 'react-router-dom';

const Payment = () => { 
  const location = useLocation();
  const [categorize, setCategorize] = useState({id:"", name: "", price: "" });
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const getAllSubServices = async () => {
      try {
        const res = await api.get("/api/subservices/allService");
        // Ensure we are setting an array even if data is missing
        setSubServices(res?.data?.allService || []);
        console.log(res.data.allService)
      } catch (err) {
        setSubServices([]);
        console.error("Fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    getAllSubServices();
  }, []);
  const bookingService = location.state?.selectedService || "";
  console.log("Booking Service from Location State:", bookingService);
console.log(subServices,"hey here i am")
  const filtered = useMemo(() => {
    
    return subServices.filter((item) => {
      return item?.category?.toLowerCase() === bookingService?.toLowerCase();
      
    });
  }, [subServices, bookingService]);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const fullService = filtered.find((item) => item._id === selectedId);

    if (fullService) {
      setCategorize({id:fullService._id, name: fullService.name, price: fullService.price });
    } else {
      setCategorize({ name: "", price: "" });
    }
  };


  const stored = localStorage.getItem("user")
  let user = JSON.parse(stored) || null;

  const paymentInfo ={
  amount:categorize.price,
  email:user.email,
}

 const initializePaymentData = {
    amount: categorize.price,
    email: user.email,
    userId:user.id || user._id,
     bookingId:categorize.id,
    paymentType:"booking"
  }
 const handleSubmitAndPay = async () => {
    try {
      const res = await api.post("/api/paystack/initialize", initializePaymentData)
      const { authorization_url } = res.data.data
      if (authorization_url) {
        window.location.href = authorization_url;
      } else {
        alert("Could not get payment link. Please try again.");
      }
    } catch (err) {
      console.log("Payment Initialization Error:", err)
      alert("Payment Initialization Failed")
    }
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Secure Checkout</h2>

        <div className="order-summary">
          <span>Total Amount Due:</span>
          {categorize.price && (
            <span className="service-name"> NGN{categorize.price}</span>
          )}
        </div>

        <div className="payment-form">
          <div className="card-input-group">
            <select className="payment-input" onChange={handleSelect} disabled={loading}>
              <option value="">
                {loading ? "Loading services..." : "-- Choose a preferred service --"}
              </option>
              {filtered.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button className="pay-button" disabled={!categorize.price} onClick={handleSubmitAndPay}>
            PAY NOW
          </button>

          <p className="security-note">
            Your payment details are secure.{" "}
            <span className="secure-badge">SSL Secured & PCI Compliant.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
