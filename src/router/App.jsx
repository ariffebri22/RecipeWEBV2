/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "../pages/Home";
import AddMenu from "../pages/AddMenu";
import SearchMenu from "../pages/SearchMenu";
import Profile from "../pages/Profile";
import EditMenu from "../pages/EditMenu";
import DetailMenu from "../pages/DetailMenu";
import DetailProfile from "../pages/DetailProfile";
import ChangePassword from "../pages/ChangePassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forgot from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import Auth from "../components/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AOS from "aos";
import "aos/dist/aos.css";

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
                <Route path="/login" element={<Login />} />
                <Route path="/regis" element={<Register />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route
                    path="/add"
                    element={
                        <Auth>
                            <AddMenu />
                        </Auth>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <Auth>
                            <SearchMenu />
                        </Auth>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Auth>
                            <Profile />
                        </Auth>
                    }
                />
                <Route
                    path="/detprofile"
                    element={
                        <Auth>
                            <DetailProfile />
                        </Auth>
                    }
                />
                <Route
                    path="/changepass"
                    element={
                        <Auth>
                            <ChangePassword />
                        </Auth>
                    }
                />

                <Route
                    path="/edit/:id"
                    element={
                        <Auth>
                            <EditMenu />
                        </Auth>
                    }
                />
                <Route
                    path="/detail/:id"
                    element={
                        <Auth>
                            <DetailMenu />
                        </Auth>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
