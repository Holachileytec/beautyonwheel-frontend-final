import React, { useState, useEffect } from "react";
import "../Styles/admin.css";
import api from "../config/api";
import AModal from "./AModal";

const Admin = () => {
  const [createServiceFormData, setCreateServiceFormData] = useState({
    name: "",
    price: "",
  });
  const [createServiceMessage, setCreateServiceMessage] = useState("");

  const [serviceTypeFormData, setServiceTypeFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [userUpdate, setUserUpdate] = useState({
    name: "",
    membership: "",
  });

  const [serviceUpdate, setServiceUpdate] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [serviceTUpdate, setServiceTUpdate] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [planUpdate, setPlanUpdate] = useState({
    name: "",
    price: "",
  });

  // ✅ FIX 1: Update User Function
  const UpdateUser = async ({ id }) => {
    try {
      const updateData = {
        name: userUpdate.name,
        membership: userUpdate.membership,
      };

      const res = await api.put(`/api/users/userUpdate/${id}`, updateData);
      setUserUpdate(res.data);
      alert("User Updated Successfully");
      handleClose1(); // Close modal after success
      return res.data;
    } catch (error) {
      console.error("Error updating user:", error);
      alert("User not updated!");
      return null;
    }
  };

  // ✅ FIX 2: Update Plan Function
  const UpdatePlan = async ({ id }) => {
    try {
      const updateData = {
        name: planUpdate.name,
        price: planUpdate.price,
      };

      const res = await api.put(`/api/plan/update/${id}`, updateData);
      setPlanUpdate(res.data);
      alert("Plan Updated Successfully");
      handleClose2(); // Close modal after success

      // Refresh plans list
      const plansRes = await api.get("/api/plan/allPlans");
      setPlans(plansRes.data.plans);

      return res.data;
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Plan not updated!");
      return null;
    }
  };

  // ✅ FIX 3: Update Service Function
  const updateService = async ({ id }) => {
    try {
      const updateData = {
        name: serviceUpdate.name,
        price: serviceUpdate.price,
        description: serviceUpdate.description,
      };

      const res = await api.put(`/api/services/updateServ/${id}`, updateData);
      setServiceUpdate(res.data);
      alert("Service updated successfully!");
      handleClose3(); // Close modal after success

      // Refresh services list
      const servRes = await api.get(`/api/services/all`);
      setService(servRes.data);

      return res.data;
    } catch (error) {
      console.error("Service update error:", error);
      alert("Service could not be updated");
      return null;
    }
  };

  // ✅ FIX 4: Update Service Type Function
  const updateServiceType = async ({ id }) => {
    try {
      const updateData = {
        name: serviceTUpdate.name,
        price: serviceTUpdate.price,
        category: serviceTUpdate.category,
      };

      const res = await api.put(`/api/subservices/update/${id}`, updateData);
      setServiceTUpdate(res.data);
      alert("Service Type updated successfully!");
      handleClose4(); // Close modal after success

      // Refresh subservices list
      const subRes = await api.get("/api/subservices/allService");
      setSubServices(subRes.data.allService || []);

      return res.data;
    } catch (err) {
      console.error("Service type update error:", err);
      alert("Service type not updated");
      return null;
    }
  };

  const [addServiceTypeMessage, setAddServiceTypeMessage] = useState("");
  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [blogs, setBlogs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [service, setService] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [beauticians, setBeauticians] = useState([]);
  const [plan, setPlan] = useState({
    name: "",
    price: "",
  });

  // User Modal
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // Plan Modal
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // Service Modal
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // Sub service Modal
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [planMessage, setPlanMessage] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/api/plan/allPlans");
        setPlans(res.data.plans);
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };

    const fetchServices = async () => {
      try {
        const res = await api.get(`/api/services/all`);
        setService(res?.data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setService([]);
      }
    };

    const getAllSubServices = async () => {
      try {
        const res = await api.get("/api/subservices/allService");
        setSubServices(res?.data?.allService || []);
      } catch (err) {
        setSubServices([]);
        console.error("Fetch error:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/users/getAllUsers");
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await api.get("/api/bookings/all");
        setBookings(res.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    const fetchBeauticians = async () => {
      try {
        const res = await api.get("/api/beauticians/allbeauticians");
        setBeauticians(res.data.beauticians);
      } catch (err) {
        console.error("Error fetching beauticians:", err);
      }
    };

    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "bookings") {
      fetchBookings();
    } else if (activeTab === "beauticians") {
      fetchBeauticians();
    } else if (activeTab === "services") {
      fetchServices();
      getAllSubServices();
    } else if (activeTab === "plan") {
      fetchPlans();
    }
  }, [activeTab]);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
  });

  // ✅ FIX 5: Add Service
  const addService = async () => {
    try {
      const createServiceData = {
        name: createServiceFormData.name,
        price: Number(createServiceFormData.price),
      };

      const res = await api.post("/api/services/create", createServiceData);
      setCreateServiceMessage("Service Added Successfully");

      // Refresh services
      const servRes = await api.get(`/api/services/all`);
      setService(servRes.data);

      // Clear form
      setCreateServiceFormData({ name: "", price: "" });
    } catch (err) {
      console.error("Error creating service:", err);
      setCreateServiceMessage("Creating Service Failed");
    }
  };

  // ✅ FIX 6: Add Plan
  const addPlan = async () => {
    try {
      const addPData = {
        name: plan.name,
        price: plan.price,
      };

      const res = await api.post("/api/plan/addplan", addPData);
      setPlanMessage("Plan added successfully");

      // Refresh plans
      const plansRes = await api.get("/api/plan/allPlans");
      setPlans(plansRes.data.plans);

      // Clear form
      setPlan({ name: "", price: "" });
    } catch (err) {
      setPlanMessage("Plan was not successfully added");
      console.error("Error adding plan:", err);
    }
  };

  // ✅ FIX 7: Delete Plan
  const deletePlan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      const res = await api.delete(`/api/plan/${id}`);
      setPlans(plans.filter((p) => p._id !== id));
      alert(res?.data?.message || "Plan Deleted Successfully");
    } catch (err) {
      console.error("Error deleting plan:", err);
      alert("Plan not Deleted Successfully");
    }
  };

  // ✅ FIX 8: Delete Service
  const deleteServ = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      const res = await api.delete(`/api/services/delete/${id}`);
      alert(res?.data?.message || "Service Deleted Successfully");

      // Refresh services
      const servRes = await api.get(`/api/services/all`);
      setService(servRes.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Service not Deleted Successfully");
      console.error("Error deleting service:", err);
    }
  };

  // ✅ FIX 9: Delete SubService
  const deleteSubServ = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subservice?"))
      return;

    try {
      const res = await api.delete(`/api/subservices/delete/${id}`);
      alert(res?.data?.message || "SubService Deleted Successfully");

      // Refresh subservices
      const subRes = await api.get("/api/subservices/allService");
      setSubServices(subRes.data.allService || []);
    } catch (err) {
      alert(
        err?.response?.data?.message || "SubService not Deleted Successfully",
      );
      console.error("Error deleting subservice:", err);
    }
  };

  // ✅ FIX 10: Delete Beautician
  const deleteBeautician = async (id) => {
    if (!window.confirm("Are you sure you want to delete this beautician?"))
      return;

    try {
      const res = await api.delete(`/api/beauticians/delete/${id}`);
      alert(res?.data?.message || "Beautician Deleted Successfully!");

      // Refresh beauticians
      const beauRes = await api.get("/api/beauticians/allbeauticians");
      setBeauticians(beauRes.data.beauticians);
    } catch (error) {
      alert("Beautician not deleted! An error occurred.");
      console.error("Error:", error);
    }
  };

  // ✅ FIX 11: Delete User
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await api.delete(`/api/users/delete/${id}`);
      alert(res?.data?.message || "User Deleted Successfully");

      // Refresh users
      const userRes = await api.get("/api/users/getAllUsers");
      setUsers(userRes.data.users);
    } catch (err) {
      alert(err?.response?.data?.message || "User could not be deleted");
      console.error("Error:", err);
    }
  };

  // ✅ FIX 12: Add Service Type
  const addServiceType = async () => {
    try {
      const serviceTypeData = {
        name: serviceTypeFormData.name,
        price: serviceTypeFormData.price,
        category: serviceTypeFormData.category,
      };

      const res = await api.post(
        `/api/subservices/addService`,
        serviceTypeData,
      );
      setAddServiceTypeMessage("Subservice Added Successfully");

      // Refresh subservices
      const subRes = await api.get("/api/subservices/allService");
      setSubServices(subRes.data.allService || []);

      // Clear form
      setServiceTypeFormData({ name: "", price: "", category: "" });
    } catch (error) {
      setAddServiceTypeMessage("An Error occurred while Adding Subservice");
      console.error("Error:", error);
    }
  };

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateServiceFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange4 = (e) => {
    const { name, value, type, checked } = e.target;
    setUserUpdate((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange5 = (e) => {
    const { name, value, type, checked } = e.target;
    setPlanUpdate((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange6 = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceUpdate((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange7 = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceTUpdate((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceTypeFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange3 = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
                        <button
                          className="action-btn edit"
                          onClick={handleShow1}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ FIXED: User Update Modal */}
            <AModal
              show={show1}
              handleClose={handleClose1}
              handleClose1={() => UpdateUser({ id: users[0]?.id })} // ✅ Wrapped in arrow function
              head={<h1>Update User</h1>}
              body={
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={userUpdate.name}
                    name="name"
                    onChange={handleChange4}
                  />
                  <input
                    type="text"
                    placeholder="Membership"
                    value={userUpdate.membership}
                    name="membership"
                    onChange={handleChange4}
                  />
                </>
              }
            />
          </div>
        )}

        {/* Beauticians Tab */}
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
                    <tr key={b._id}>
                      <td>{b?.user?.name}</td>
                      <td>{b?.user?.email}</td>
                      <td>{b?.specialties}</td>
                      <td>{b?.experienceYears}</td>
                      <td>{b?.rating}</td>
                      <td>
                        <button className="action-btn edit">Edit</button>
                        <button
                          className="action-btn delete"
                          onClick={() => deleteBeautician(b._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
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

        {/* Plan Tab */}
        {activeTab === "plan" && (
          <div className="tab-content">
            <h2>Plan Management</h2>
            <p style={{ color: planMessage.includes("not") ? "red" : "green" }}>
              {planMessage}
            </p>
            <div className="price-input">
              <input
                type="text"
                placeholder="Name"
                value={plan.name}
                name="name"
                onChange={handleChange3}
              />
              <input
                type="text"
                placeholder="Set price"
                value={plan.price}
                name="price"
                onChange={handleChange3}
              />
              <button className="update-btn" onClick={addPlan}>
                Add
              </button>
            </div>
            <h2>All Plans</h2>

            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((planed) => (
                    <tr key={planed._id}>
                      <td>{planed.name}</td>
                      <td>{planed.price}</td>
                      <td>
                        <button
                          className="action-btn edit"
                          onClick={handleShow2}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => deletePlan(planed._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ FIXED: Plan Update Modal - MOVED OUTSIDE MAP */}
            <AModal
              show={show2}
              handleClose={handleClose2}
              handleClose1={() => {
                // Get the selected plan ID from state or pass it differently
                const selectedPlanId = plans.find((p) => show2)?._id;
                if (selectedPlanId) {
                  UpdatePlan({ id: selectedPlanId });
                }
              }}
              head={<h1>Update Plan</h1>}
              body={
                <>
                  <input
                    type="text"
                    placeholder="Plan Name"
                    value={planUpdate.name}
                    name="name"
                    onChange={handleChange5}
                  />
                  <input
                    type="text"
                    placeholder="Plan Price"
                    value={planUpdate.price}
                    name="price"
                    onChange={handleChange5}
                  />
                </>
              }
            />
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="tab-content">
            <h2>Service Management</h2>
            <hr />
            <div className="services-grid">
              <h2>Add a service</h2>
              <p
                style={{
                  color: createServiceMessage.includes("Failed")
                    ? "red"
                    : "green",
                }}
              >
                {createServiceMessage}
              </p>

              <div className="price-input">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={createServiceFormData.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Set price"
                  name="price"
                  value={createServiceFormData.price}
                  onChange={handleChange}
                />
                <button className="update-btn" onClick={addService}>
                  Add
                </button>
              </div>
              <h2>All Services</h2>

              <div className="table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.map((serv) => (
                      <tr key={serv._id}>
                        <td>{serv.name}</td>
                        <td>{serv.price}</td>
                        <td>
                          <button
                            className="action-btn edit"
                            onClick={handleShow3}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => deleteServ(serv._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ✅ FIXED: Service Update Modal - MOVED OUTSIDE MAP */}
              <AModal
                show={show3}
                handleClose={handleClose3}
                handleClose1={() => {
                  const selectedServiceId = service.find((s) => show3)?._id;
                  if (selectedServiceId) {
                    updateService({ id: selectedServiceId });
                  }
                }}
                head={<h1>Update Service</h1>}
                body={
                  <>
                    <input
                      type="text"
                      placeholder="Service Name"
                      value={serviceUpdate.name}
                      name="name"
                      onChange={handleChange6}
                    />
                    <input
                      type="text"
                      placeholder="Service Price"
                      value={serviceUpdate.price}
                      name="price"
                      onChange={handleChange6}
                    />
                    <input
                      type="text"
                      placeholder="Service description"
                      value={serviceUpdate.description}
                      name="description"
                      onChange={handleChange6}
                    />
                  </>
                }
              />

              <hr />
              <h2>Add a Service Type</h2>
              <pre>
                eg: Service= Makeup. Service Type= Normal Makeup + price
              </pre>
              <p
                style={{
                  color: addServiceTypeMessage.includes("Error")
                    ? "red"
                    : "green",
                }}
              >
                {addServiceTypeMessage}
              </p>
              <div className="price-input">
                <input
                  type="text"
                  placeholder="Name"
                  value={serviceTypeFormData.name}
                  name="name"
                  onChange={handleChange2}
                />
                <input
                  type="text"
                  placeholder="Set price"
                  value={serviceTypeFormData.price}
                  name="price"
                  onChange={handleChange2}
                />
                <input
                  type="text"
                  placeholder="Set Category"
                  value={serviceTypeFormData.category}
                  name="category"
                  onChange={handleChange2}
                />
                <button className="update-btn" onClick={addServiceType}>
                  Add
                </button>
              </div>

              <h2>All Service Types</h2>

              <div className="table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subServices.map((subserv) => (
                      <tr key={subserv._id}>
                        <td>{subserv.name}</td>
                        <td>{subserv.price}</td>
                        <td>{subserv.category}</td>
                        <td>
                          <button
                            className="action-btn edit"
                            onClick={handleShow4}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => deleteSubServ(subserv._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ✅ FIXED: SubService Update Modal - MOVED OUTSIDE MAP */}
              <AModal
                show={show4}
                handleClose={handleClose4}
                handleClose1={() => {
                  const selectedSubServiceId = subServices.find(
                    (s) => show4,
                  )?._id;
                  if (selectedSubServiceId) {
                    updateServiceType({ id: selectedSubServiceId });
                  }
                }}
                head={<h1>Update Service Type</h1>}
                body={
                  <>
                    <input
                      type="text"
                      placeholder="Service Type Name"
                      value={serviceTUpdate.name}
                      name="name"
                      onChange={handleChange7}
                    />
                    <input
                      type="text"
                      placeholder="Service Type Price"
                      value={serviceTUpdate.price}
                      name="price"
                      onChange={handleChange7}
                    />
                    <input
                      type="text"
                      placeholder="Service Type category"
                      value={serviceTUpdate.category}
                      name="category"
                      onChange={handleChange7}
                    />
                  </>
                }
              />
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
                  <p>
                    <b>Service:</b> {book.service}
                  </p>
                  <p>
                    <b>Day:</b> {book.date}
                  </p>
                  <p>
                    <b>Address:</b> {book.address}
                  </p>
                  <p>
                    <b>Preferred Specialist:</b> {book.beautician}
                  </p>
                  <p>
                    <b>Specific Wants:</b> {book.note}
                  </p>
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
