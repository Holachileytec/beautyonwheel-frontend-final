import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import "./Styles/payment.css";
import { useLocation } from 'react-router-dom';

const Payment = () => { 
  const location = useLocation();
  const [categorize, setCategorize] = useState({ name: "", price: "" });
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllSubServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/subservices/allService");
        // Ensure we are setting an array even if data is missing
        setSubServices(res?.data?.allService || []);
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

  const filtered = useMemo(() => {
    return subServices.filter((item) => {
      return item?.category?.toLowerCase() === bookingService?.toLowerCase();
    });
  }, [subServices, bookingService]);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const fullService = filtered.find((item) => item._id === selectedId);

    if (fullService) {
      setCategorize({ name: fullService.name, price: fullService.price });
    } else {
      setCategorize({ name: "", price: "" });
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Secure Checkout</h2>

        <div className="order-summary">
          <span>Total Amount Due:</span>
          {categorize.price && (
            <span className="service-name"> ${categorize.price}</span>
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

          <button className="pay-button" disabled={!categorize.price}>
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