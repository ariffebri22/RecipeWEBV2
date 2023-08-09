/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import myImage from "../../assets/img/profile.png";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePage, setActivePage] = useState("");

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
        console.log("Profile clicked!");
        navigate("/profile");
    };

    const navbarBack = () => {
        let navbar = document.querySelector(".navbar");
        navbar.classList.toggle("navbar-scrolled");
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
                            <li className={`nav-item me-5 ${location.pathname === "/" ? "active" : ""}`}>
                                <Link className="nav-link" to="/" onClick={() => handleActivePage("home")}>
                                    Home
                                </Link>
                            </li>
                            <li className={`nav-item me-5 ${location.pathname === "/add" ? "active" : ""}`}>
                                <Link className="nav-link" to="/add" onClick={() => handleActivePage("AddMenu")}>
                                    Add Menu
                                </Link>
                            </li>
                            <li className={`nav-item ${location.pathname === "/search" ? "active" : ""}`}>
                                <Link className="nav-link" to="/search" onClick={() => handleActivePage("SearchMenu")}>
                                    Search Menu
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user d-flex justify-content-center align-items-center">
                    <div className="photo me-4">
                        <img src={myImage} alt="Search" width="40" onClick={handleProfileClick} />
                    </div>
                    <div className="text">
                        <p className="mb-0 text-dark">Ayudia</p>
                        <p className="mb-0">
                            <a href="#" className="text-dark" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                <strong>Logout</strong>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
