/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from "../../components/BtnLoading";
import { login } from "../../store/action/auth";
import "../../styles/Auth.css";
import image from "../../assets/img/icon.png";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errorMessage, isError, isLoading } = useSelector((state) => state.auth);
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isError && errorMessage) {
            toast.error(errorMessage);
        } else if (isError && !errorMessage) {
            toast.error("Something wrong");
        }
    }, [isError, errorMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(inputData, navigate));
    };

    const onChange = (e) => {
        setInputData((prevInputData) => ({
            ...prevInputData,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <div className="container mt-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 ps-5 pe-5 pageMain">
                        <div className="head text-center">
                            <img src={image} alt="Mama Recipe" width="80" className="mb-2" />
                            <h4 className="text-warning">Welcome</h4>
                            <p className="mt-2">Log in into your existing account</p>
                            <hr />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label text-secondary">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={inputData.email}
                                    onChange={onChange}
                                    className="form-control text-secondary"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label text-secondary">
                                    Password
                                </label>
                                <input type="password" name="password" value={inputData.password} onChange={onChange} className="form-control text-secondary" id="exampleInputPassword1" placeholder="Password" required />
                            </div>
                            <div className="mb-3 form-check custom-checkbox">
                                <input type="checkbox" className="form-check-input custom-control-input" id="exampleCheck1" required />
                                <label className="form-check-label text-secondary custom-control-label" htmlFor="exampleCheck1">
                                    I agree to terms & conditions
                                </label>
                            </div>
                            <LoadingButton type="submit" className="btn btn-warning text-light btnRegis" isLoading={isLoading}>
                                Login
                            </LoadingButton>
                        </form>
                        <div className="forgot text-end">
                            <p className="mt-3 mb-5">
                                Forgot your Password?{" "}
                                <Link to="/forgot" className="text-warning">
                                    Click here
                                </Link>
                            </p>
                        </div>
                        <div className="have text-center">
                            <p className="mt-4">
                                Don’t have an account?{" "}
                                <Link to="/regis" className="text-warning">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
