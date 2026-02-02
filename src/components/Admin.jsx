import React, { useState, useEffect } from "react";
import "../Styles/admin.css";
import api from "../config/api";
import AModal from "./AModal";
const Admin = () => {
  const [createServiceFormData, setCreateServiceFormData] = useState({
    name: "",
    price: "",
  })
  const [createServiceMessage, setCreateServiceMessage] = useState([])  
  // Create Subservice
  const [serviceTypeFormData, setServiceTypeFormData] = useState({
    name: "",
    price: "",
    category: ""
  })
  const [userUpdate,setUserUpdate]= useState({
    name:"",
    membership:""
  })
  const [serviceUpdate,setServiceUpdate]= useState({
    name:"",
    price:"",
    description:""
  })
  const [serviceTUpdate,setServiceTUpdate]= useState({
    name:"",
    price:"",
    category:""
  })
  const [planUpdate,setPlanUpdate]= useState({
    name:"",
    price:""
  })
  const updateData1={
    name:userUpdate.name,
    membership:userUpdate.membership,
  }
  const token = localStorage.getItem("token")
// Update User
const UpdateUser= async({id})=>{
  try{
    const res= await api.put(`/api/users/userUpdate/${id}`,updateData1)
    setUserUpdate(res.data)
    console.log("checking:",res.data)
    alert("User Updated Successfully")
  }catch(error){
    console.error("An error occured while updating user", error)
    alert("User not updated!")
  }
}
const updateData2 ={
  name:planUpdate.name,
  price:planUpdate.price,
}
const UpdatePlan= async({id})=>{
  try{
    const res= await api.put(`/api/plan/update/${id}`,updateData2)
    setPlanUpdate(res.data)
    console.log("checking:",res.data)
    alert("Plan Updated Successfully")
  }catch(error){
    console.error("An error occured while updating plan", error)
    alert("Plan not updated!")
  }
}
const updateData3 ={
  name:serviceUpdate.name,
  price:serviceUpdate.price,
  description:serviceUpdate.description
}
const updateService = async({id})=>{
  try{
    const res = await api.put(`/api/services/updateServ/${id}`,updateData3)
    setServiceUpdate(res.data)
    alert("Service updated successfully!")

  }catch(error){
alert("Service could not be updated")
console.error('Service problem:',error)
  }
}
const updateData4={
  name:serviceTUpdate.name,
  price:serviceTUpdate.price,
  category:serviceTUpdate.category
}
const updateServiceType = async ({id})=>{
  try{
    const res = await api.put(`/api/subservices/update/${id}`,updateData4)
    setServiceTUpdate(res.data)
    alert("Service Type updated successfully!")

  }catch(err){
    console.error("service type not updated:",err)
   alert("Service type not updated, an error occured")
  }

}
  const [addServiceTypeMessage, setAddServiceTypeMessage] = useState([])
  const [plans, setPlans] = useState([])
  const [activeTab, setActiveTab] = useState("users");
  const [blogs, setBlogs] = useState([]);
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [service, setService] = useState([])
  const [subServices, setSubServices] = useState([])
  const [beauticians, setBeauticians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({
    name: "",
    price: ""
  })
  // User
   const [show1, setShow1] = useState(false);
  
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    // Plan
   const [show2, setShow2] = useState(false);
  
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    // service
   const [show3, setShow3] = useState(false);
  
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    // Sub service
   const [show4, setShow4] = useState(false);
  
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

  const [planMessage, setPlanMessage] = useState([])
  useEffect(() => {
    const fetchPlans = async () => {

      try {
        const res = await api.get("/api/plan/allPlans")
        setPlans(res.data.plans)
        console.log("The data is:" + res.data)
      } catch (err) {
        console.log(`an error occured ${err}`)
      }
    }
    const fetchServices = async () => {
      try {
        const res = await api.get(`/api/services/all`)
        setService(res?.data)
      } catch (err) {
        console.log("An error occured", err)
        setService([])
      }
    }
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
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/users/getAllUsers");
        setUsers(res.data.users);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await api.get("/api/bookings/all");
        setBookings(res.data.bookings)
      } catch (error) {
        console.log("An error occured", error);
      }
    }

    const fetchBeauticians = async () => {
      try {
        const res = await api.get("/api/beauticians/allbeauticians")
        setBeauticians(res.data.beauticians)
      } catch (err) {
        console.log("An Error Occured", err)
      }
    }


    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "bookings") {
      fetchBookings()
    } else if (activeTab === "beauticians") {
      fetchBeauticians()
    } else if (activeTab === "services") {
      fetchServices()
      getAllSubServices()
    } else if (activeTab === "plan") {
      fetchPlans()
    }
  }, [activeTab]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
  });
  const createServiceData = {
    name: createServiceFormData.name,
    price: Number(createServiceFormData.price)
  }
  // adding a new service
  const addService = async () => {
    try {
      const res = await api.post("/api/services/create", createServiceData

      )
      setCreateServiceMessage(res?.data?.message || "Service Added Successfully")
    } catch (err) {
      console.log(`An error occured: ${err}`)
      setCreateServiceMessage(err.response?.data?.message || "Creating Service Failed")
    }
  }

  const addPData = {
    name: plan.name,
    price: plan.price
  }

  const addPlan = async () => {
    try {
      const res = await api.post("/api/plan/addplan", addPData)
      setPlan(res?.data?.savedPlan)
      setPlanMessage("Plan added successfully" || res?.data?.message)
      console.log('for debugs:' + res?.data)
    } catch (err) {
      setPlanMessage("Plan was not successfully added" || err?.response?.data?.message)
      console.log(err)
    }
  }
  const deletePlan = async (id) => {
    try {
      const res = await api.delete(`/api/plan/${id}`)
      setPlans(plans.filter(p => p._id !== id));
      alert("Plan Deleted Successfully" || res?.data?.messsage)
    } catch (err) {
      alert("Plan not Deleted Successfully" || err?.response?.data?.message)
      console.log("Error deleting plan", err)
    }
  }
  const deleteServ = async (id) => {
    try {
      const res = await api.delete(`/api/services/delete/${id}`)
      alert("Service Deleted Successfully" || res?.data?.messsage)
    } catch (err) {
      alert("Service not Deleted Successfully" || err?.response?.data?.message)
      console.log("Error deleting service", err)
    }
  }
  const deleteSubServ = async (id) => {
    try {
      const res = await api.delete(`/api/subservices/delete/${id}`)
      alert("SubService Deleted Successfully" || res?.data?.messsage)
    } catch (err) {
      alert("SubService not Deleted Successfully" || err?.response?.data?.message)
      console.log("Error deleting Subservice", err)
    }
  }

  const deleteBeautician = async (id)=>{
    try{
      const res = await api.delete(`/api/beauticians/delete/${id}`)
      alert("Beautician Deleted Successfully!")
    }catch(error){
      alert("Beautician not deleted!, An error occured.")
      console.log("The Error:",error)
    }
  }

  const deleteUser = async(id)=>{
    try{
      const res = await api.delete(`/api/users/delete/${id}`)
      alert('User Deleted Successfully')
    }catch(err){
      alert(err?.response?.data?.message || "User could not be deleted")
      console.log("Error:" ,err)
    }
  }


  // Adding Subservice | serviceType
  const serviceTypeData = {
    name: serviceTypeFormData.name,
    price: serviceTypeFormData.price,
    category: serviceTypeFormData.category
  }
  const addServiceType = async () => {
    try {
      const res = await api.post(`/api/subservices/addService`, serviceTypeData)
      setAddServiceTypeMessage(res?.data?.message || "Subservice Added Sucessfully")
    } catch (error) {
      setAddServiceTypeMessage(error.response?.data?.message || "An Error occured while Adding Subservice")
    }
  }



  // Add new blog
  const handleAddBlog = (e) => {
    e.preventDefault();
    const blog = {
      id: Date.now(),
      ...newBlog,
      date: new Date().toLocaleDateString(),
      status: "Published",
    };
    setBlogs([...blogs, blog]);
    setNewBlog({ title: "", content: "", category: "" });
  };
  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setCreateServiceFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const handleChange4 = async (e) => {
    const { name, value, type, checked } = e.target;
    setUserUpdate((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const handleChange5 = async (e) => {
    const { name, value, type, checked } = e.target;
    setPlanUpdate((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const handleChange6 = async (e) => {
    const { name, value, type, checked } = e.target;
    setServiceUpdate((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const handleChange7 = async (e) => {
    const { name, value, type, checked } = e.target;
    setServiceTUpdate((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const handleChange2 = async (e) => {
    const { name, value, type, checked } = e.target;
    setServiceTypeFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const handleChange3 = async (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }


  const serviceCategories = [
    "Makeup",
    "Nails",
    "Manicure",
    "Pedicure",
    "Massage",
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>BeautyAdmin</h2>
        </div>
        <nav className="nav-menu">
          {[
            "users",
            "blogs",
            "plan",
            "services",
            "bookings",
            "settings",
            "beauticians",
          ].map((tab) => (
            <button
              key={tab}
              className={`nav-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="tab-content">
            <h2>User Management</h2>
            <div className="subscription-filters">
              {["All", "Normal", "VIP", "VVIP"].map((sub) => (
                <button key={sub} className="filter-btn">
                  {sub}
                </button>
              ))}
            </div>
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subscription</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <>
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`subscription-badge ${user.membership.type}`}
                        >
                          {user.membership.type}
                        </span>
                      </td>

                      <td>
                        <button className="action-btn edit" onClick={handleShow1}>Edit</button>
                        <button className="action-btn delete" onClick={()=>{deleteUser(user.id)}}>Delete</button>
                      </td>
                    </tr>
                    {/* update User */}
    
          <AModal show={show1} handleClose={handleClose1} handleClose1={UpdateUser(user.id)} head={<h1>Update User</h1>} body={<>
        <input type="text" placeholder="Name" value={userUpdate.name} name="name" onChange={handleChange4} />{"    "}                <input type="text" placeholder="Set Category" value={serviceTypeFormData.category} name="category" onChange={handleChange2} />{"    "}
        <input type="text" placeholder="Name" value={userUpdate.membership} name="membership" onChange={handleChange4} />{"    "}                <input type="text" placeholder="Set Category" value={serviceTypeFormData.category} name="category" onChange={handleChange2} />{"    "}      
        </>}/>
        </>
     
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* For Beauticians */}
        {activeTab === "beauticians" && (
          <div className="tab-content">
            <h2>Staff Management</h2>

            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Speciality</th>
                    <th>Experience</th>
                    <th>Customer Ratings</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {beauticians.map((b) => (
                    <>
                    <tr key={b._id}>
                      <td>{b?.user?.name}</td>
                      <td>{b?.user?.email}</td>
                      <td>{b?.specialties}</td>
                      <td>{b?.experienceYears}</td>
                      <td>{b?.rating}</td>
                      <td>
                        <button className="action-btn edit">Edit</button>
                        <button className="action-btn delete" onClick={() => {deleteBeautician(b._id) }}>Delete</button>
                      </td>
                    </tr>

                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <div className="tab-content">
            <h2>Blog Management</h2>
            <div className="form-section">
              <h3>Add New Blog Post</h3>
              <form onSubmit={handleAddBlog} className="blog-form">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, title: e.target.value })
                  }
                  required
                />
                <select
                  value={newBlog.category}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Blog Content"
                  value={newBlog.content}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, content: e.target.value })
                  }
                  required
                />
                <button type="submit" className="submit-btn">
                  Publish Blog
                </button>
              </form>
            </div>

            <div className="blogs-list">
              <h3>Published Blogs</h3>
              {blogs.map((blog) => (
                <div key={blog.id} className="blog-item">
                  <h4>{blog.title}</h4>
                  <p>
                    Category: {blog.category} | Date: {blog.date}
                  </p>
                  <div className="blog-actions">
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Gallery tab */}
        {activeTab === "blogs" && (
          <div className="tab-content">
            <h2>Blog Management</h2>
            <div className="form-section">
              <h3>Add New Blog Post</h3>
              <form onSubmit={handleAddBlog} className="blog-form">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, title: e.target.value })
                  }
                  required
                />

                <button type="submit" className="submit-btn">
                  Publish Blog
                </button>
              </form>
            </div>

            <div className="blogs-list">
              <h3>Published Blogs</h3>
              {blogs.map((blog) => (
                <div key={blog.id} className="blog-item">
                  <h4>{blog.title}</h4>
                  <p>
                    Category: {blog.category} | Date: {blog.date}
                  </p>
                  <div className="blog-actions">
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plan Tab */}
        {activeTab === "plan" && (
          <div className="tab-content">
            <h2>Plan Management</h2>
            <p style={{ color: planMessage.includes("error") ? "red" : "green" }}>
              {planMessage}
            </p>
            <div className="price-input">
              <input type="text" placeholder="Name" value={plan.name} name="name" onChange={handleChange3} />{"    "}
              <input type="text" placeholder="Set price" value={plan.price} name="price" onChange={handleChange3} />{"    "}
              <button className="update-btn" onClick={addPlan}>Add</button>
            </div>
            <h2>All Plans</h2>

            <div className="table-container">
              <table className="users-table">
                <thead>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {plans.map((planed) => (
                    <>
                    <tr key={planed._id}>
                      <td>{planed.name}</td>
                      <td>{planed.price}</td>

                      <td>
                        <button className="action-btn edit" onClick={handleShow2}>Edit</button>
                        <button className="action-btn delete" onClick={() => { deletePlan(planed._id) }}>Delete</button>
                      </td>
                    </tr>
                    <AModal show={show2} handleClose={handleClose2} handleClose1={UpdatePlan(planed._id)} 
                    head={<h1>Update Plan</h1>}
                     body={<>
        <input type="text" placeholder="Plan Name" value={planUpdate.name} name="name" onChange={handleChange5} />{"    "}              
        <input type="text" placeholder="Plan Price" value={planUpdate.price } name="price" onChange={handleChange5} />{"    "}                     
        </>}/>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="tab-content">
            <h2>Service Management</h2>
            <hr />
            <div className="services-grid">
              <h2>Add a service</h2>
              <p style={{ color: createServiceMessage.includes("error") ? "red" : "green" }}>
                {createServiceMessage}
              </p>

              <div className="price-input">
                <input type="text" placeholder="Name" name="name" value={createServiceFormData.name} onChange={handleChange} />{"    "}
                <input type="text" placeholder="Set price" name="price" value={createServiceFormData.price} onChange={handleChange} />{"    "}
                <button className="update-btn" onClick={addService}>Add</button>


              </div>
              <h2>All Services</h2>

              <div className="table-container">
                <table className="users-table">
                  <thead>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {service.map((serv) => (
                      <>
                      <tr key={serv._id}>
                        <td>{serv.name}</td>
                        <td>{serv.price}</td>

                        <td>
                          <button className="action-btn edit" onClick={handleShow3}>Edit</button>
                          <button className="action-btn delete" onClick={() => { deleteServ(serv._id) }}>Delete</button>
                        </td>
                      </tr>
                         <AModal show={show3} handleClose={handleClose3} handleClose1={updateService(serv._id)} 
                    head={<h1>Update Service</h1>}
                     body={<>
        <input type="text" placeholder="Service Name" value={serviceUpdate.name} name="name" onChange={handleChange6} />{"    "}              
        <input type="text" placeholder="Service Price" value={serviceUpdate.price } name="price" onChange={handleChange6} />{"    "}                     
        <input type="text" placeholder="Service description" value={serviceUpdate.description } name="Description" onChange={handleChange6} />{"    "}                     
        </>}/>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              <hr />
              <h2>Add a Service Type</h2>
              <pre>eg: Service= Makeup. Service Type= Normal Makeup + price</pre>
              <p style={{ color: addServiceTypeMessage.includes("error") ? "red" : "green" }}>
                {addServiceTypeMessage}
              </p>
              <div className="price-input">
                <input type="text" placeholder="Name" value={serviceTypeFormData.name} name="name" onChange={handleChange2} />{"    "}
                <input type="text" placeholder="Set price" value={serviceTypeFormData.price} name="price" onChange={handleChange2} />{"    "}
                <input type="text" placeholder="Set Category" value={serviceTypeFormData.category} name="category" onChange={handleChange2} />{"    "}
                <button className="update-btn" onClick={addServiceType}>Add</button>


              </div>

              <h2>All Service Types</h2>

              <div className="table-container">
                <table className="users-table">
                  <thead>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {subServices.map((subserv) => (
                      <>
                      <tr key={subserv._id}>
                        <td>{subserv.name}</td>
                        <td>{subserv.price}</td>
                        <td>{subserv.category}</td>

                        <td>
                          <button className="action-btn edit" onClick={handleShow4}>Edit</button>
                          <button className="action-btn delete" onClick={() => { deleteSubServ(subserv._id) }}>Delete</button>
                        </td>
                      </tr>
                          <AModal show={show4} handleClose={handleClose4} handleClose1={updateServiceType(subserv._id)} 
                    head={<h1>Update Service</h1>}
                     body={<>
        <input type="text" placeholder="Service Type Name" value={serviceTUpdate.name} name="name" onChange={handleChange7} />{"    "}              
        <input type="text" placeholder="Service Type Price" value={serviceTUpdate.price } name="price" onChange={handleChange7} />{"    "}                     
        <input type="text" placeholder="Service Type category" value={serviceTUpdate.category } name="category" onChange={handleChange7} />{"    "}                     
        </>}/>
                      </>
                    ))}
                  </tbody>
                </table>

              </div>

            </div>
          </div>
        )}
        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="tab-content">
            <h2>All Bookings</h2>
            <div className="services-grid">
              {bookings.map((book) => (
                <div key={book._id} className="service-card">
                  <h3>{book.client}</h3>
                  <p><b>Service:</b>{book.service}</p>
                  <p><b>Day:</b>{book.date}</p>
                  <p><b>Address:</b>{book.address}</p>
                  <p><b>Preferred Specialist:</b>{book.beautician}</p>
                  <p><b>Specific Wants:</b>{book.note}</p>


                </div>
              ))}
            </div>
          </div>
        )}


        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="tab-content">
            <h2>Settings</h2>
            <div className="settings-form">
              <div className="setting-group">
                <label>Website Name</label>
                <input type="text" defaultValue="Beauty Palace" />
              </div>
              <div className="setting-group">
                <label>Admin Email</label>
                <input type="email" defaultValue="admin@beautypalace.com" />
              </div>
              <div className="setting-group">
                <label>Subscription Prices</label>
                <div className="price-settings">
                  <div>
                    <label>Normal: </label>
                    <input type="number" defaultValue="49" />
                  </div>
                  <div>
                    <label>VIP: </label>
                    <input type="number" defaultValue="99" />
                  </div>
                  <div>
                    <label>VVIP: </label>
                    <input type="number" defaultValue="199" />
                  </div>
                </div>
              </div>
              <button className="save-btn">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  
  );
};

export default Admin;
