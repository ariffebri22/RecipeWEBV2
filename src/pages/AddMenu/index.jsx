/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";
import LoadingButton from "../../components/BtnLoading";
import "../../styles/AddMenu.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postMenu } from "../../store/action/menu";
import { useDispatch, useSelector } from "react-redux";

const AddMenu = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const { errorMessage, isError, isLoading } = useSelector((state) => state.postMenu);
    const [inputData, setInputData] = useState({
        title: "",
        ingredients: "",
        category_id: "",
        photo: "",
    });

    useEffect(() => {
        if (isError && errorMessage) {
            toast.warn(errorMessage, {
                hideProgressBar: true,
                autoClose: 2000,
            });
        } else if (isError && !errorMessage) {
            toast.error("Something wrong");
        }
    }, [isError, errorMessage]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!inputData.title || !inputData.ingredients || !inputData.category_id || !photo) {
            toast.warn("Please fill in all the required fields and add a photo.", {
                hideProgressBar: true,
                autoClose: 2000,
            });
            return;
        }

        let bodyFormData = new FormData();
        bodyFormData.append("title", inputData.title);
        bodyFormData.append("ingredients", inputData.ingredients);
        bodyFormData.append("category_id", inputData.category_id);
        bodyFormData.append("photo", photo);

        dispatch(postMenu(bodyFormData, navigate));
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
