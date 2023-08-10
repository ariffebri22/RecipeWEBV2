/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";
import LoadingButton from "../../components/BtnLoading";
import "../../styles/AddMenu.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaWVsQGdtYWlsLmNvbSIsInVzZXJzX0lkIjoyOSwidHlwZSI6InVzZXIiLCJ1c2VybmFtZSI6IkFyaWVsIiwicGhvdG8iOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9ka2lmdGphYmwvaW1hZ2UvdXBsb2FkL3YxNjkxNDk1NTQ0L1JlY2lwZUFQSVYyL3Bob3RvLTE2OTE0OTU1NDE2NjktNDc5NTYxMzMxX25xMzByeS5qcGciLCJpYXQiOjE2OTE0OTc4Nzl9.4Av67CtTEaTONK5rojiARa9IWrynZS1drdcN3RRuFbs";

const AddMenu = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputData, setInputData] = useState({
        title: "",
        ingredients: "",
        category_id: "",
        photo: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState({
        type: "",
        message: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!inputData.title || !inputData.ingredients || !inputData.category_id || !photo) {
            toast.warn("Please fill in all the required fields and add a photo.", {
                hideProgressBar: true,
                autoClose: 2000,
            });
            return;
        }

        setIsLoading(true);

        let bodyFormData = new FormData();
        bodyFormData.append("title", inputData.title);
        bodyFormData.append("ingredients", inputData.ingredients);
        bodyFormData.append("category_id", inputData.category_id);
        bodyFormData.append("photo", photo);

        axios
            .post(`${import.meta.env.VITE_REACT_APP_SERVER}/recipe`, bodyFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
                setInputData({ title: "", ingredients: "", category_id: "", photo: "" });
                setPhoto(null);
                toast.success("Recipe Succesfully Added!", {
                    autoClose: 1500,
                });
                setTimeout(() => {
                    navigate("/search");
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                toast.warn(err.response.data.message, {
                    hideProgressBar: true,
                    autoClose: 2000,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function previewImage(event) {
        const fileInput = event.target;
        const imagePreview = document.getElementById("imagePreview");

        while (imagePreview.firstChild) {
            imagePreview.removeChild(imagePreview.firstChild);
        }

        const image = document.createElement("img");
        image.src = URL.createObjectURL(fileInput.files[0]);
        imagePreview.appendChild(image);
        imagePreview.style.display = "block";

        const uploadLabel = document.getElementById("uploadLabel");
        uploadLabel.innerText = "Change Photo";

        setPhoto(fileInput.files[0]);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        const intValue = name === "category_id" ? parseInt(value, 10) : value;
        setInputData((prevData) => ({
            ...prevData,
            [name]: intValue,
        }));
    };

    return (
        <>
            <Navbar />
            <section id="home text" className="text-center d-flex justify-content-center">
                {showAlert && <Alert type={alertData.type} message={alertData.message} />}
                <div className="container text-center">
                    <div className="row mt-3">
                        <div className="col-md-2"></div>
                        <div className="col-md-8 text-center">
                            <form onSubmit={handleSubmit}>
                                <div className="upload-container rounded-3 bg-body-secondary">
                                    <label htmlFor="imageUpload" className="custom-file-upload bg-warning" id="uploadLabel">
                                        Add Photo
                                    </label>
                                    <div className="image-preview" id="imagePreview"></div>
                                </div>
                                <input type="file" className="form-control visually-hidden" id="imageUpload" accept="image/*" onChange={previewImage} name="photo" />
                                <div className="mb-3 mt-3">
                                    <input type="text" className="form-control bg-body-secondary" id="title" placeholder="Title" value={inputData.title} onChange={handleChange} name="title" />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control bg-body-secondary" id="description" rows="5" cols="40" placeholder="Ingredients" value={inputData.ingredients} onChange={handleChange} name="ingredients"></textarea>
                                </div>
                                <div className="mb-3">
                                    <select className="form-select bg-body-secondary w-25" id="category" value={inputData.category_id} onChange={handleChange} name="category_id">
                                        <option value="" className="text-secondary" disabled>
                                            Category
                                        </option>
                                        <option value="1">Appetizers</option>
                                        <option value="2">Main Course</option>
                                        <option value="3">Dessert</option>
                                    </select>
                                </div>
                                <LoadingButton type="submit" className="btn btn-warning text-light btnpost mt-5" isLoading={isLoading}>
                                    Post
                                </LoadingButton>
                            </form>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </section>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default AddMenu;
