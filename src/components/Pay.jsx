import React, { useEffect, useState } from "react";
import "../Styles/pay.css";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

export default function Pay() {
const navigate = useNavigate()
const [service,setService]=useState([])
  const [beauticians,setBeauticians]=useState([])
  const [loading,setLoading]= useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    service: "",
    date: "",
    note: "",
    beautician:"",
    paymentMethod: "card",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const bookingData={
    
      beautician:form.beautician,
      service:form.service,
      address:form.address,
      note:form.note || form.phone,
      date:form.date,
      status:"pending"
    }
  console.log("Booking Details:", bookingData);
    try{
    const response = await api.post(`/api/bookings/create`, bookingData)
    alert("Booking Successful")
    const selected = service.find((item)=>{
     return item._id === bookingData.service
    })
    console.log("Selected Service for Payment:", selected);
    navigate("/pay",{state:{selectedService: selected.name}} )
    }catch(err){
    alert(err.response?.data?.message || "booking failed")
}finally{
setLoading(false)
}

  };
   useEffect(()=>{
    const fetchBeauticians=async()=>{
      try{
        const res = await api.get(`/api/beauticians/allbeauticians`)
        setBeauticians(res.data.beauticians)
      }catch(err){
      console.log("Failed to fetch beauticians", err)
      }
    }


    const fetchServices= async()=>{
      try{
        const res = await api.get(`/api/services/all`)
        setService(res?.data)
        console.log(res.data,"the console info")
      }catch(err){
        console.log("An error occured", err)
        setService([])
      }
    }
    fetchBeauticians()
    fetchServices()
   },[])

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Beauty Service Checkout</h2>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
<label htmlFor="beautician">Beautician</label>
<select name="beautician" value={form.beautician} onChange={handleChange} required>
<option value=""> Choose a Beautician </option>
{beauticians?.map((b)=>(
  <option value={b._id} key={b._id}>
  {b?.user?.name} ({b?.user?.specialties})
  </option>
))}

</select>

        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Street address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          placeholder="Your city"
          value={form.city}
          onChange={handleChange}
          required
        />

        <label>Choose Service</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
        >
          <option value="">Select a service</option>
         {service.map((serv)=>(
          <option value={serv._id} key={serv._id}>{serv.name}</option>
         ))}
        </select>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
<label htmlFor="note">Note</label>
<textarea name="note" value={form.note} onChange={handleChange} placeholder="Any Specific requests?" required></textarea>
      

        <button type="submit" disabled={loading}>
        {loading? "Booking....":"Confirm & Pay"}
        </button>
      </form>
    </div>
  );
}
