/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/img/icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../../components/BtnLoading";
import icon from "../../assets/img/iconuser.png";
import openEye from "../../assets/img/view.png";
import closedEye from "../../assets/img/close-eye.png";
import { register } from "../../store/action/auth";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.register);
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
        if (password.length == 0) {
            setPasswordStrength("start");
        } else if (password.length < 4) {
            setPasswordStrength("weak");
        } else if (password.length < 8) {
            setPasswordStrength("medium");
        } else {
            setPasswordStrength("strong");
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (passwordStrength === "weak") {
            toast.error("Enter a password of at least 8 characters", {
                hideProgressBar: true,
                autoClose: 2000,
            });
            return;
        } else if (passwordStrength === "medium") {
            toast.warn("A little bit more", {
                hideProgressBar: true,
                autoClose: 2000,
            });
            return;
        }

        let bodyFormData = new FormData();
        bodyFormData.append("type", "user");
        bodyFormData.append("username", inputData.username);
        bodyFormData.append("email", inputData.email);
        bodyFormData.append("password", inputData.password);

        if (inputData.photo instanceof File) {
            bodyFormData.append("photo", inputData.photo);
        }

        dispatch(register(bodyFormData, navigate)); 
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="container mt-2">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 ps-5 pe-5 pageMain">
                        <div className="head text-center">
                            <img src={image} alt="Mama Recipe" width="80" className="mb-2" />
                            <h4 className="text-warning mb-0">Lets Get Started !</h4>
                            <p className="mt-0">Create new account to access all features</p>
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
                                <div className="input-group mb-3">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control text-secondary"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        value={inputData.password}
                                        name="password"
                                        onChange={handleChange}
                                        required
                                    />
                                    <button className="btn border border-start-0" type="button" id="button-addon2" onClick={togglePasswordVisibility}>
                                        {showPassword ? <img src={closedEye} alt="Closed Eye" width="24" /> : <img src={openEye} alt="Open Eye" width="24" />}
                                    </button>
                                </div>
                                <div className={`password-strength-bar ${passwordStrength}`}>
                                    <div className="password-strength-bar-inner" />
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
                            <LoadingButton type="submit" className="btn btn-warning text-light btnRegis" isLoading={isLoading}>
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
