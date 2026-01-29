// import NavBar from "./NavB";

import "./App.css";
import "./Styles/mediaquery.css";
import AllHome from "./components/AllHome";
import { ChatProvider } from "./context/ChatContext.jsx";
import ChatConfig from "./config/ChatConfig.jsx";
import { ChatWidget } from "./components/ChatWidget.jsx";
import Pay from "./components/Pay";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Blog from "./components/Blog";
import Admin from "./components/Admin";
import User from "./components/User";
import NewNav from "./components/NewNav";
import Payment from "./components/Payment";
import About from "./components/About";
import Footer from "./components/Footer";
import Fq from "./components/Fq";
import Terms from "./components/Terms";
import Gallery from "./components/Gallery";
import BeauticianProfile from "./components/BeauticianProfile";
import Plan from "./components/Plan";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  return (
    <>
      <ChatProvider config={ChatConfig}>
        {/* <NavBar /> */}
        <NewNav />
        <Routes>
          <Route path="/" element={<AllHome />} />
          <Route path="/bookASession" element={<Pay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/adminDashboard" element={<Admin />} />
          <Route path="/user-dashboard" element={<User />} />
          <Route path="/pay" element={<Payment />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/faq" element={<Fq />} />
          <Route path="/termsandconditions" element={<Terms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/myBeauticianProfile" element={<BeauticianProfile />} />
        </Routes>{" "}
        <Footer />
        <ChatWidget />
      </ChatProvider>
    </>
  );
}
export default App;
