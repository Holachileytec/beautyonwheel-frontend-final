import React, { useState, useEffect } from "react";
import "../Styles/admin.css";
import api from "../config/api";
import AModal from "./AModal";
import axios from "axios";
import AdminChat from "./AdminChat";
import AdminLogout from "./AdminLogout";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(true);

  // User State
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [show1, setShow1] = useState(false);
  const [userUpdate, setUserUpdate] = useState({ name: "", membership: "" });

  // Plan State
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({ name: "", price: "" });
  const [planUpdate, setPlanUpdate] = useState({ name: "", price: "" });
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [show2, setShow2] = useState(false);
  const [planMessage, setPlanMessage] = useState("");

  // Service State (Main)
  const [service, setService] = useState([]);
  const [createServiceFormData, setCreateServiceFormData] = useState({
    name: "",
    price: "",
  });
  const [serviceUpdate, setServiceUpdate] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [show3, setShow3] = useState(false);
  const [createServiceMessage, setCreateServiceMessage] = useState("");

  // Sub-Service State
  const [subServices, setSubServices] = useState([]);
  const [serviceTypeFormData, setServiceTypeFormData] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [serviceTUpdate, setServiceTUpdate] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [selectedSubServiceId, setSelectedSubServiceId] = useState(null);
  const [show4, setShow4] = useState(false);
  const [addServiceTypeMessage, setAddServiceTypeMessage] = useState("");

  // Beautician & Gallery State
  const [beauticians, setBeauticians] = useState([]);
  const [images, setImages] = useState([]);
  // Admin Img
  const [AImages, setAImages] = useState([]);
  const [gallery, setGallery] = useState({ imageUrl: null, description: "" });

  // Miscellaneous (Blogs, Bookings)
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [bookings, setBookings] = useState([]);

  // --- 2. FETCHING LOGIC (useEffect) ---

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "users") await fetchUsers();
        else if (activeTab === "bookings") await fetchBookings();
        else if (activeTab === "beauticians") await fetchBeauticians();
        else if (activeTab === "services") {
          await fetchServices();
          await getAllSubServices();
        } else if (activeTab === "plan") await fetchPlans();
        else if (activeTab === "gallery") {
          await getAllImages();
          await AgetAllImages();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  //  Gallery

  const getAllImages = async () => {
    try {
      const res = await api.get("/api/beauticians/getAllGallery");
      const data = res.data.galleryItems || res.data;
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  // getAllImages();
  const AgetAllImages = async () => {
    try {
      const res = await api.get("/api/admin/getAdminImg");
      const data = res.data.galleryItems || res.data;
      setAImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  // AgetAllImages();

  // --- 3. PLAN FUNCTIONS ---

  const fetchPlans = async () => {
    try {
      const res = await api.get("/api/plan/allPlans");
      setPlans(res.data.plans);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  const addPlan = async () => {
    try {
      const addPData = { name: plan.name, price: plan.price };
      await api.post("/api/plan/addplan", addPData);
      setPlanMessage("Plan added successfully");
      fetchPlans(); // Refresh
      setPlan({ name: "", price: "" });
    } catch (err) {
      setPlanMessage("Plan was not successfully added");
    }
  };

  const UpdatePlan = async ({ id }) => {
    try {
      const updateData = { name: planUpdate.name, price: planUpdate.price };
      await api.put(`/api/plan/update/${id}`, updateData);
      setPlanUpdate({ name: "", price: "" });
      alert("Plan Updated Successfully");
      handleClose2();
      fetchPlans();
    } catch (error) {
      alert("Plan not updated!");
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await api.delete(`/api/plan/${id}`);
      setPlans(plans.filter((p) => p._id !== id));
      alert("Plan Deleted Successfully");
    } catch (err) {
      alert("Plan not Deleted Successfully");
    }
  };

  // --- 4. SERVICE & SUB-SERVICE FUNCTIONS ---

  const fetchServices = async () => {
    try {
      const res = await api.get(`/api/services/all`);
      setService(res?.data || []);
    } catch (err) {
      setService([]);
    }
  };

  const addService = async () => {
    try {
      const createServiceData = {
        name: createServiceFormData.name,
        price: Number(createServiceFormData.price),
      };
      await api.post("/api/services/create", createServiceData);
      setCreateServiceMessage("Service Added Successfully");
      fetchServices();
      setCreateServiceFormData({ name: "", price: "" });
    } catch (err) {
      setCreateServiceMessage("Creating Service Failed");
    }
  };

  const updateService = async ({ id }) => {
    try {
      const updateData = {
        name: serviceUpdate.name,
        price: serviceUpdate.price,
        description: serviceUpdate.description,
      };
      await api.put(`/api/services/updateServ/${id}`, updateData);
      setServiceUpdate({ name: "", price: "", description: "" });
      alert("Service updated successfully!");
      handleClose3();
      fetchServices();
    } catch (error) {
      alert("Service could not be updated");
    }
  };

  const deleteServ = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await api.delete(`/api/services/delete/${id}`);
      fetchServices();
      alert("Service Deleted Successfully");
    } catch (err) {
      alert("Service not Deleted Successfully");
    }
  };

  const getAllSubServices = async () => {
    try {
      const res = await api.get("/api/subservices/allService");
      setSubServices(res?.data?.allService || []);
    } catch (err) {
      setSubServices([]);
    }
  };

  const addServiceType = async () => {
    try {
      await api.post(`/api/subservices/addService`, serviceTypeFormData);
      setAddServiceTypeMessage("Subservice Added Successfully");
      getAllSubServices();
      setServiceTypeFormData({ name: "", price: "", category: "" });
    } catch (error) {
      setAddServiceTypeMessage("An Error occurred");
    }
  };

  const updateServiceType = async ({ id }) => {
    try {
      await api.put(`/api/subservices/update/${id}`, serviceTUpdate);
      setServiceTUpdate({ name: "", price: "", category: "" });
      alert("Service Type updated successfully!");
      handleClose4();
      getAllSubServices();
    } catch (err) {
      alert("Service type not updated");
    }
  };

  const deleteSubServ = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subservice?"))
      return;
    try {
      await api.delete(`/api/subservices/delete/${id}`);
      getAllSubServices();
      alert("SubService Deleted Successfully");
    } catch (err) {
      alert("SubService not Deleted Successfully");
    }
  };

  // --- 5. USER FUNCTIONS ---

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users/all");
      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateUser = async ({ id }) => {
    try {
      await api.put(`/api/users/userUpdate/${id}`, userUpdate);
      setUserUpdate({ name: "", membership: "" });
      alert("User Updated Successfully");
      handleClose1();
      fetchUsers();
    } catch (error) {
      alert("User not updated!");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/api/users/delete/${id}`);
      alert("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      alert("User could not be deleted");
    }
  };

  // --- 6. BEAUTICIAN & GALLERY FUNCTIONS ---

  const fetchBeauticians = async () => {
    try {
      const res = await api.get("/api/beauticians/allbeauticians");
      setBeauticians(res.data.beauticians);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBeautician = async (id) => {
    if (!window.confirm("Are you sure you want to delete this beautician?"))
      return;
    try {
      await api.delete(`/api/beauticians/delete/${id}`);
      alert("Beautician Deleted Successfully!");
      fetchBeauticians();
    } catch (error) {
      alert("Beautician not deleted!");
    }
  };

  const uploadImage = async () => {
    if (!gallery.imageUrl) return alert("Please select a file first");
    try {
      const formdata = new FormData();
      formdata.append("AImage", gallery.imageUrl);
      formdata.append("description", gallery.description);
      await api.post("/api/admin/uploadAJob", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(" Admin Image uploaded successfully!");
      setGallery({ imageUrl: null, description: "" });
    } catch (error) {
      alert("Failed to upload image");
    }
  };

  const deleteGalleryItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Item?")) return;
    try {
      await api.delete(`/api/beauticians/deleteImg/${id}`);
      alert("Gallery Item Deleted Successfully!");
      // getAllImages();
    } catch (error) {
      alert("Gallery Item not deleted!");
      console.log("an error accured when deleting image", error);
    }
  };
  const AdeleteGalleryItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Item?")) return;
    try {
      await api.delete(`/api/admin/deletAJob/${id}`);
      alert(" Admin Gallery Item Deleted Successfully!");
      AgetAllImages();
    } catch (error) {
      alert(" Admin Gallery Item not deleted!");
      console.log("an error accured when deleting image", error);
    }
  };

  // --- 7. MODAL HANDLERS ---

  const handleClose1 = () => {
    setShow1(false);
    setSelectedUserId(null);
  };
  const handleShow1 = (userId) => {
    setSelectedUserId(userId);
    setShow1(true);
  };

  const handleClose2 = () => setShow2(false);
  const handleShow2 = (id) => {
    setSelectedPlanId(id);
    setShow2(true);
  };

  const handleClose3 = () => setShow3(false);
  const handleShow3 = (id) => {
    setSelectedServiceId(id);
    setShow3(true);
  };

  const handleClose4 = () => setShow4(false);
  const handleShow4 = (id) => {
    setSelectedSubServiceId(id);
    setShow4(true);
  };

  // --- 8. FORM CHANGE HANDLERS ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateServiceFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeG = (e) => {
    const { name, value, type, checked, files } = e.target;
    setGallery((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleChange4 = (e) => {
    const { name, value, type, checked } = e.target;
    setUserUpdate((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange5 = (e) => {
    const { name, value, type, checked } = e.target;
    setPlanUpdate((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange6 = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceUpdate((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange7 = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceTUpdate((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceTypeFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange3 = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    setBlogs([
      ...blogs,
      {
        id: Date.now(),
        ...newBlog,
        date: new Date().toLocaleDateString(),
        status: "Published",
      },
    ]);
    setNewBlog({ title: "", content: "", category: "" });
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings/all");
      setBookings(res.data.bookings);
    } catch (error) {
      console.error(error);
    }
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
            "chat",
            "gallery",
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
                    <tr key={user._id}>
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
                          onClick={() => handleShow1(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            ;{/* ✅ FIXED: User Update Modal */}
            <AModal
              show={show1}
              handleClose={handleClose1}
              handleClose1={() => UpdateUser({ id: selectedUserId })} // ✅ Wrapped in arrow function
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
        {activeTab === "gallery" && (
          <div className="tab-content">
            <h1>Gallery</h1>
            <div className="gallery">
              <input
                type="file"
                name="imageUrl"
                placeholder="Paste image URL here"
                onChange={handleChangeG}
              />
              <textarea
                rows="3"
                value={gallery.description}
                name="description"
                placeholder="Input the image url"
                onChange={handleChangeG}
              />
              <button
                onClick={() => {
                  uploadImage();
                }}
              >
                Add Image
              </button>
            </div>
            <div className="table-container">
              <h1>Admin Gallery</h1>
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {AImages.map((i) => (
                    <tr key={i._id}>
                      <td className="images">
                        <img
                          src={`${import.meta.env.VITE_API_URL || "https://beautyplug.com.ng"}${i.imageUrl}`}
                          alt={i.description || "Gallery Item"}
                          key={i._id || i.id}
                        />
                      </td>
                      <td> {i.description}</td>
                      <td>
                        <a
                          href={`${import.meta.env.VITE_API_URL || "https://beautyplug.com.ng"}${i.imageUrl}`}
                        >
                          <button className="action-btn edit">
                            View Image
                          </button>
                        </a>
                        <button
                          className="action-btn delete"
                          onClick={() => AdeleteGalleryItem(i._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-container mt-4">
              <h1>Beauticians Job Upload</h1>
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((i) => (
                    <tr key={i._id}>
                      <td className="images">
                        <img
                          src={`${import.meta.env.VITE_API_URL || "https://beautyplug.com.ng"}${i.imageUrl}`}
                          alt={i.description || "Gallery Item"}
                          key={i._id || i.id}
                        />
                      </td>
                      <td>{i.description}</td>
                      <td>
                        <a
                          href={`${import.meta.env.VITE_API_URL || "https://beautyplug.com.ng"}${i.imageUrl}`}
                        >
                          <button className="action-btn edit">
                            View Image
                          </button>
                        </a>
                        <button
                          className="action-btn delete"
                          onClick={() => deleteGalleryItem(i._id)}
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

        {/* chat tab*/}
        {activeTab === "chat" && (
          <div className="tab-content">
            <h2>Support Chat</h2>
            <AdminChat />
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
                            onClick={() => handleShow3(serv._Id)}
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
                // ✅ Fixed — uses the state variable
                handleClose1={() => updateService({ id: selectedServiceId })}
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
              <div>
                <AdminLogout />
              </div>
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
