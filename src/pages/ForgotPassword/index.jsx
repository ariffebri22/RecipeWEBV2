/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/Auth.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import image from "../../assets/img/icon.png";

const ForgotPassword = () => {
    return (
        <>
            <div className="container">
                <div className="row mt-5 d-flex justify-content-center">
                    <div className="col-md-5 ps-5 pe-5 pageMain">
                        <div className="head text-center">
                            <img src={image} alt="Mama Recipe" width="80" className="mb-2" />
                            <h4 className="text-warning">Forgot Password</h4>
                            <p className="mt-2">Send OTP to your email!</p>
                            <hr />
                        </div>
                        <form onSubmit="return validateFormForgot()">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label text-secondary">
                                    Email
                                </label>
                                <input type="email" className="form-control text-secondary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email address" required />
                                <div className="invalid-feedback">Please enter a valid email address.</div>
                            </div>
                            <button type="submit" className="btn btn-warning text-light">
                                Send OTP
                            </button>
                        </form>
                        <div className="forgot text-start">
                            <p className="mt-3 mb-5">
                                Login instead?{" "}
                                <a href="/login" className="text-warning">
                                    Click here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
