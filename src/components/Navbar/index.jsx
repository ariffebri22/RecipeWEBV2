/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import Modal from "../../components/Modal";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useSelector((state) => state.auth.data);
    const [activePage, setActivePage] = useState("");
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwt_decode(token) : null;
    const { photo, username } = decodedToken || {};
    const [openModal, setOpenModal] = useState(false);
    const [isLoadingLogout, setIsLoadingLogout] = useState(false);

    const handleLogout = async () => {
        setOpenModal(true);
    };

    const handleConfirmLogout = () => {
        setIsLoadingLogout(true);
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {
        toast.warn("For more complete features, please login first.", {
            hideProgressBar: true,
            autoClose: 2000,
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector(".navbar");
            if (window.scrollY > 0) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleActivePage = (pageName) => {
        setActivePage(pageName);
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const navbarBack = () => {
        let navbar = document.querySelector(".navbar");
        navbar.classList.toggle("navbar-scrolled");
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-light --bs-light-text-emphasis fixed-top ${activePage === "" ? "navbar-scrolled" : ""}`}>
            <div className="container mt-3">
                <div className="burger">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={navbarBack}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mt-2 mb-lg-0">
                            {token ? (
                                <li className={`nav-item me-5 ${location.pathname === "/" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/" onClick={() => handleActivePage("Home")}>
                                        Home
                                    </Link>
                                </li>
                            ) : (
                                <li className={`nav-item me-5 ${location.pathname === "/regis" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/regis" onClick={() => handleActivePage("Register")}>
                                        Register
                                    </Link>
                                </li>
                            )}
                            {token ? (
                                <li className={`nav-item me-5 ${location.pathname === "/add" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/add" onClick={() => handleActivePage("AddMenu")}>
                                        Add Menu
                                    </Link>
                                </li>
                            ) : (
                                <li className={`nav-item me-5 ${location.pathname === "/login" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/login" onClick={() => handleActivePage("Login")}>
                                        Login
                                    </Link>
                                </li>
                            )}
                            {token ? (
                                <li className={`nav-item ${location.pathname === "/search" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/search" onClick={() => handleActivePage("SearchMenu")}>
                                        Search Menu
                                    </Link>
                                </li>
                            ) : (
                                <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/" onClick={handleSearch}>
                                        Search Menu
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {token ? (
                    <div className="user d-flex justify-content-center align-items-center">
                        <div className="photo me-4">
                            <img src={photo} alt="Search" width="40" className="rounded-circle" onClick={handleProfileClick} />
                        </div>
                        <div className="text">
                            <p className="mb-0 text-dark">{username}</p>
                            <p className="mb-0">
                                <p onClick={handleLogout} className="text-dark textLogout" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                    <strong>Logout</strong>
                                </p>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="user d-flex justify-content-center align-items-center  visually-hidden">
                        <div className="photo me-4">
                            <img src={auth?.photo} alt="Search" width="40" onClick={handleProfileClick} />
                        </div>
                        <div className="text">
                            <p className="mb-0 text-dark">{auth?.username}</p>
                            <p className="mb-0">
                                <p onClick={logout} className="text-dark" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                    <strong>Logout</strong>
                                </p>
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
            {openModal && <Modal open={openModal} onClose={() => setOpenModal(false)} onDelete={handleConfirmLogout} isMessage="Are you sure you want to logout?" isTitle={`CONFIRM`} />}
        </nav>
    );
};

export default Navbar;
