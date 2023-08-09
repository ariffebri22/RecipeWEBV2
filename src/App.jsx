/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/Home";
import AddMenu from "./pages/AddMenu";
import SearchMenu from "./pages/SearchMenu";
import Profile from "./pages/Profile";
import EditMenu from "./pages/EditMenu";
import DetailMenu from "./pages/DetailMenu";
import DetailProfile from "./pages/DetailProfile";
import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
    useEffect(() => {
        AOS.init({
            once: true,
        });
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddMenu />} />
                <Route path="/search" element={<SearchMenu />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/detprofile" element={<DetailProfile />} />
                <Route path="/changepass" element={<ChangePassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/regis" element={<Register />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/edit/:id" element={<EditMenu />} />
                <Route path="/detail/:id" element={<DetailMenu />} />
            </Routes>
        </Router>
    );
};

export default App;
