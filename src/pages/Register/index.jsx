/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/Auth.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import image from "../../assets/img/icon.png";

const Register = () => {
    return (
        <>
            <div className="container mt-2">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 ps-5 pe-5 pageMain">
                        <div className="head text-center">
                            <img src={image} alt="Mama Recipe" width="80" className="mb-2" />
                            <h4 className="text-warning">Lets Get Started !</h4>
                            <p className="mt-2">Create new account to access all features</p>
                            <hr />
                        </div>
                        <form onSubmit="return validateFormRegis()">
                            <div className="mb-3">
                                <label htmlFor="exampleInputName1" className="form-label text-secondary">
                                    Name
                                </label>
                                <input type="text" className="form-control text-secondary" id="exampleInputName1" placeholder="Name" required />
                            </div>
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
                                Register Account
                            </button>
                        </form>
                        <div className="have text-center">
                            <p className="mt-4">
                                Already have account?{" "}
                                <a href="/login" className="text-warning">
                                    Log in Here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
