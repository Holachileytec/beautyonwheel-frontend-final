import React, { useState,useEffect } from "react";
import "./Styles/admin.css";
import axios from "axios"
const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [bookings,setBookings]= useState([])
  const [users,setUsers]=useState([])
  const [beauticians, setBeauticians] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/getAllUsers");
      setUsers(res.data.users);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

const fetchBookings = async ()=>{
  try{
    const res= await axios.get("http://localhost:8000/api/bookings/all");
    setBookings(res.data.bookings)
  }catch(error){
    console.log("An error occured", error);
  }
}

const fetchBeauticians = async ()=>{
  try{
    const res=await axios.get("http://localhost:8000/api/beauticians/allbeauticians")
    setBeauticians(res.data.beauticians)
  }catch(err){
    console.log("An Error Occured",err)
  }
}


  if (activeTab === "users") {
    fetchUsers();
  }else if(activeTab ==="bookings"){
    fetchBookings()
  }else if(activeTab ==="beauticians"){
    fetchBeauticians()
  }
}, [activeTab]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

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

  // Add new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      ...newProduct,
      date: new Date().toLocaleDateString(),
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", category: "", description: "" });
  };

  // Stats data
  const stats = [
    { title: "Total Users", value: "1,234", change: "+12%" },
    { title: "VIP Members", value: "89", change: "+5%" },
    { title: "Total Revenue", value: "$12,456", change: "+18%" },
    { title: "Services Booked", value: "345", change: "+8%" },
  ];

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
            "dashboard",
            "users",
            "blogs",
            "products",
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

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="tab-content">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-change positive">{stat.change}</div>
                </div>
              ))}
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <span>New VIP member registered</span>
                  <span className="activity-time">2 hours ago</span>
                </div>
                <div className="activity-item">
                  <span>Massage service booked</span>
                  <span className="activity-time">4 hours ago</span>
                </div>
                <div className="activity-item">
                  <span>New blog post published</span>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
                          className={`subscription-badge ${user.subscription}`}
                        >
                          {user.subscription}
                        </span>
                      </td>
                      
                      <td>
                        <button className="action-btn edit">Edit</button>
                        <button className="action-btn delete">Delete</button>
                      </td>
                    </tr>
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

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="tab-content">
            <h2>Product Management</h2>
            <div className="form-section">
              <h3>Add New Product</h3>
              <form onSubmit={handleAddProduct} className="product-form">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  required
                />
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
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
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  required
                />
                <button type="submit" className="submit-btn">
                  Add Product
                </button>
              </form>
            </div>

            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <h4>{product.name}</h4>
                  <p className="product-price">${product.price}</p>
                  <p className="product-category">{product.category}</p>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-actions">
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="tab-content">
            <h2>Service Management</h2>
            <div className="services-grid">
              {serviceCategories.map((service) => (
                <div key={service} className="service-card">
                  <h3>{service}</h3>
                  <div className="price-input">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Set price" />
                    <button className="update-btn">Update</button>
                  </div>
                 
                </div>
              ))}
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
