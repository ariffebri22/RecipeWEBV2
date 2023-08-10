/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/img/icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../../components/BtnLoading";
import icon from "../../assets/img/iconuser.png";

const Register = () => {
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        type: "",
        username: "",
        email: "",
        password: "",
        photo: null,
    });

    async function fetchFileFromUrl(url, fileName, fileType) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], fileName, { type: fileType });
    }

    useEffect(() => {
        fetchFileFromUrl(icon, "default-photo.png", "image/png")
            .then((file) => {
                setInputData((prevData) => ({
                    ...prevData,
                    photo: file,
                }));
            })
            .catch((error) => {
                console.error("Error fetching default photo:", error);
            });
    }, []);

    const checkPasswordStrength = (password) => {
        if (password.length < 4) {
            setPasswordStrength("weak");
        } else if (password.length < 8) {
            setPasswordStrength("medium");
        } else {
            setPasswordStrength("strong");
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (passwordStrength !== "strong") {
            toast.error("Password is not strong enough");
            return;
        }

        setLoading(true);

        let bodyFormData = new FormData();
        bodyFormData.append("type", "user");
        bodyFormData.append("username", inputData.username);
        bodyFormData.append("email", inputData.email);
        bodyFormData.append("password", inputData.password);

        if (inputData.photo instanceof File) {
            bodyFormData.append("photo", inputData.photo);
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER}users`, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
            setInputData((prevData) => ({ ...prevData, username: "", email: "", password: "" }));
            toast.success("Registration Successful!", {
                autoClose: 1000,
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            console.log(inputData.photo);
            toast.error(err.response?.data?.message || "An error occurred", {
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === "password") {
            checkPasswordStrength(value);
        }
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setInputData((prevData) => ({
            ...prevData,
            photo: file,
        }));
    };

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
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputName1" className="form-label text-secondary">
                                    Name
                                </label>
                                <input type="text" className="form-control text-secondary" id="exampleInputName1" placeholder="Name" value={inputData.username} name="username" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label text-secondary">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control text-secondary"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email address"
                                    value={inputData.email}
                                    name="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label text-secondary">
                                    Password
                                </label>
                                <input type="password" className="form-control text-secondary" id="exampleInputPassword1" placeholder="Password" value={inputData.password} name="password" onChange={handleChange} required />
                                <div className="password-strength">
                                    <p className="strength-text mt-2">{passwordStrength}</p>
                                </div>
                            </div>
                            <div className="mb-3 d-none">
                                <label htmlFor="exampleInputPhoto" className="form-label text-secondary">
                                    Photo
                                </label>
                                <input type="file" className="form-control text-secondary" id="exampleInputPhoto" accept="image/*" onChange={handlePhotoChange} />
                            </div>
                            <div className="mb-3 form-check custom-checkbox">
                                <input type="checkbox" className="form-check-input custom-control-input" id="exampleCheck1" required />
                                <label className="form-check-label text-secondary custom-control-label" htmlFor="exampleCheck1">
                                    I agree to terms & conditions
                                </label>
                            </div>
                            <LoadingButton type="submit" className="btn btn-warning text-light" isLoading={loading}>
                                Register
                            </LoadingButton>
                        </form>
                        <div className="have text-center">
                            <p className="mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="text-warning">
                                    Log in Here
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

export default Register;
