import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./Components/Home";
import PublicNavbar from "./Components/PublicNavbar";
import PrivateNavbar from "./Components/PrivateNavbar";
import AdminDashboard from "./Components/Admin";
import UserProfile from "./Components/UserProfile";
import Register from "./Components/Register";
import AddEmployee from "./Components/AddEmployee";
import Login from "./Components/Login";

import Profile from "./Components/Update";

function App() {
  const userData = useSelector((state) => state?.auth?.user);

  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
        {userData ? <PrivateNavbar /> : <PublicNavbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/addemployee" element={<AddEmployee />} />
          <Route path="/admin/updateemployee/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
