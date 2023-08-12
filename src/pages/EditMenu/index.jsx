/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMenuDetail, updateMenu } from "../../store/action/menu";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoadingButton from "../../components/BtnLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/EditMenu.css";

const EditMenu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { detailMenu, putMenu } = useSelector((state) => state);
    const { data } = detailMenu;
    const { isLoading, isError, errorMessage } = putMenu;

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

    const [photo, setPhoto] = useState(null);
    const [inputData, setInputData] = useState({
        title: "",
        ingredients: "",
        category_id: "",
        photo: "",
    });

    useEffect(() => {
        dispatch(getMenuDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (data) {
            setInputData({
                title: data.title,
                ingredients: data.ingredients,
                category_id: data.category_id,
                photo: data.photo,
            });
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!inputData.title || !inputData.ingredients || !inputData.category_id || !photo) {
            toast.warn("Please fill in all the required fields and add a photo.", {
                hideProgressBar: true,
            });
            return;
        }

        let formData = new FormData();
        formData.append("title", inputData.title);
        formData.append("ingredients", inputData.ingredients);
        formData.append("category_id", inputData.category_id);

        if (photo) {
            formData.append("photo", photo);
        }

        dispatch(updateMenu(formData, id, navigate));
    };

    const previewImage = (event) => {
        const fileInput = event.target;
        setPhoto(fileInput.files[0]);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <Navbar />
            <section id="home text" className="text-center d-flex justify-content-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8 text-center">
                            <form onSubmit={handleSubmit}>
                                <div className="upload-container rounded-3 bg-body-secondary ">
                                    <label htmlFor="imageUpload" className="custom-file-upload bg-warning" id="uploadLabel">
                                        Change Photo
                                    </label>
                                    <div className="image-preview " id="imagePreview">
                                        {photo ? <img src={URL.createObjectURL(photo)} alt="Preview" /> : inputData.photo && <img src={inputData.photo} alt="Preview" />}
                                    </div>
                                </div>
                                <input type="file" className="form-control visually-hidden" id="imageUpload" accept="image/*" onChange={previewImage} name="photo" />
                                <div className="mb-3 mt-3">
                                    <input type="text" className="form-control bg-body-secondary" id="title" placeholder="Title" value={inputData.title} onChange={handleChange} name="title" />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control bg-body-secondary" id="description" rows="5" placeholder="Ingredients" value={inputData.ingredients} onChange={handleChange} name="ingredients"></textarea>
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
                                    Update
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

export default EditMenu;
