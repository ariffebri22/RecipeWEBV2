/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/Auth.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import image from "../../assets/img/icon.png";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/");
    };

    return (
        <>
            <div className="container mt-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 ps-5 pe-5 pageMain">
                        <div className="head text-center">
                            <img src={image} alt="Mama Recipe" width="80" className="mb-2" />
                            <h4 className="text-warning">Welcome</h4>
                            <p className="mt-2">Log in into your exiting account</p>
                            <hr />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label text-secondary">
                                    Email
                                </label>
                                <input type="email" className="form-control text-secondary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email address" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label text-secondary">
                                    Password
                                </label>
                                <input type="password" className="form-control text-secondary" id="exampleInputPassword1" placeholder="Password" required />
                            </div>
                            <div className="mb-3 form-check custom-checkbox">
                                <input type="checkbox" className="form-check-input custom-control-input" id="exampleCheck1" required />
                                <label className="form-check-label text-secondary custom-control-label" htmlFor="exampleCheck1">
                                    I agree to terms & conditions
                                </label>
                            </div>
                            <button type="submit" className="btn btn-warning text-light">
                                Login
                            </button>
                        </form>
                        <div className="forgot text-end">
                            <p className="mt-3 mb-5">
                                Forgot your Password?{" "}
                                <a href="/forgot" className="text-warning">
                                    Click here
                                </a>
                            </p>
                        </div>
                        <div className="have text-center">
                            <p className="mt-4">
                                Don’t have an account?{" "}
                                <a href="/regis" className="text-warning">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
