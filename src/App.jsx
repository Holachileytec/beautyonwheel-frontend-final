// import NavBar from "./NavB";

import "./App.css";
import "./Styles/mediaquery.css";
import AllHome from "./AllHome";
import Makeup from "./Makeup";
import Nails from "./Nails";
import Pay from "./Pay";
import { Route, Routes } from "react-router-dom";
import Manicure from "./Manicure";
import Pedicure from "./Pedicure";
import Massage from "./Massage";
import Login from "./Login";
import SignUp from "./SignUp";
import Blog from "./Blog";
import Admin from "./Admin";
import User from "./User";
import NewNav from "./NewNav";
import Payment from "./Payment";
import About from "./About";
import Footer from "./Footer";
import Fq from "./Fq";
import Terms from "./Terms"
import Gallery from "./Gallery";
import BeauticianProfile from "./BeauticianProfile";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <NewNav />

      <Routes>
        <Route path="/" element={<AllHome />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/nail-service" element={<Nails />} />
        <Route path="/manicure" element={<Manicure />} />
        <Route path="/pedicure" element={<Pedicure />} />
        <Route path="/bookASession" element={<Pay />} />
        <Route path="/massage" element={<Massage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/adminDashboard" element={<Admin />} />
        <Route path="/user-dashboard" element={<User />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/faq" element={<Fq />} />
        <Route path="/termsandconditions" element={<Terms />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/myBeauticianProfile" element={<BeauticianProfile />} />

      </Routes> <Footer />
    </>

  );
}

export default App;
