/* eslint-disable no-unused-vars */
import React from "react";
import "./style.css";

const Footer = () => {
    return (
        <>
            <footer className="bg-warning d-flex align-items-center justify-content-center">
                <div className="text-center text">
                    <p className="eat">Eat, Cook, Repeat</p>
                    <h6>Share Your Best Recipe By Uploading Here !</h6>
                    <ul className="list d-flex align-items-center justify-content-center">
                        <li className="list-group-item me-4 mt-5">Product</li>
                        <li className="list-group-item me-4 mt-5">Company</li>
                        <li className="list-group-item me-4 mt-5">Learn More</li>
                        <li className="list-group-item me-4 mt-5">Get In Touch</li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default Footer;
