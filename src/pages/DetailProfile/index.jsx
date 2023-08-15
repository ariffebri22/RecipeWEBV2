/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/DetailProfile.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { updateProfile } from "../../store/action/auth";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import BtnDeleting from "../../components/BtnDeleting";
import { ToastContainer } from "react-toastify";

const DetailProfile = () => {
    const [photo, setPhoto] = useState(null);
    const tokenn = localStorage.getItem("token");
    const decodedToken = tokenn ? jwt_decode(tokenn) : null;
    const { photo: decodedPhoto, username, users_Id } = decodedToken || {};
    const dispatch = useDispatch();
    const { detailProfile } = useSelector((state) => state);
    const { isLoading, data } = detailProfile;
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        username: username,
        photo: null,
    });

    useEffect(() => {
        setInputData((prevData) => ({
            ...prevData,
            username: username,
        }));

        setPhoto(decodedPhoto);
    }, [username, decodedPhoto]);

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

        setInputData({
            ...inputData,
            username: username,
        });
        setPhoto(fileInput.files[0]);
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", inputData.username);

        if (photo) {
            formData.append("photo", photo);
        }

        dispatch(updateProfile(formData, users_Id, navigate));
    };

    return (
        <>
            <Navbar />
            <section id="home">
                <div className="container">
                    <div className="row editProPage">
                        <div className="col">
                            <div className="upload-container-profile rounded-circle bg-body-secondary">
                                <div className="image-preview-profile" id="imagePreview">
                                    <img src={photo || decodedPhoto} alt="Image Profile" />
                                </div>
                            </div>
                            <label htmlFor="imageUpload" className="custom-file-upload-profile text-dark" id="uploadLabel">
                                Change Photo
                            </label>
                            <input type="file" className="form-control visually-hidden" id="imageUpload" accept="image/*" onChange={previewImage} name="photo" />
                            <form onSubmit={handleUpdateProfile}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName1" className="form-label text-secondary">
                                        Change Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-secondary"
                                        id="exampleInputName1"
                                        placeholder="New Name"
                                        required
                                        value={inputData.username}
                                        onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                                    />
                                </div>
                                <BtnDeleting type="submit" className="btn me-2 btn-warning text-light btnDelete" isLoading={isLoading}>
                                    Update Profile
                                </BtnDeleting>
                                <div className="have">
                                    <p className="mt-4">
                                        Change Password?{" "}
                                        <a href="/changepass" className="text-warning">
                                            Click Here
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default DetailProfile;
