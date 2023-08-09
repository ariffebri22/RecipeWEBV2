/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/DetailProfile.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import imageProfile from "../../assets/img/profile.png";

const ChangePassword = () => {
    return (
        <>
            <Navbar />
            <section id="home">
                <div className="container">
                    <div className="row editProPage">
                        <div className="col ps-5 pe-5">
                            <div className="text-center headForm">
                                <h6 className="text-warning mb-5">Change Your Password Here!</h6>
                            </div>
                            <form onSubmit="return validateFormChange()">
                                <div className="mb-3">
                                    <label htmlFor="oldpassword" className="form-label text-secondary">
                                        Old Password
                                    </label>
                                    <input type="password" className="form-control text-secondary" id="oldpassword" placeholder="Enter Old Password" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newpassword" className="form-label text-secondary">
                                        New Password
                                    </label>
                                    <input type="password" className="form-control text-secondary" id="newpassword" aria-describedby="emailHelp" placeholder="Enter New Password" required />
                                </div>
                                <button type="submit" className="btn btn-warning text-light">
                                    Change Password
                                </button>
                                <div className="have">
                                    <p className="mt-4">
                                        Back to edit profile?{" "}
                                        <a href="/detprofile" className="text-warning">
                                            Click Here
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChangePassword;
