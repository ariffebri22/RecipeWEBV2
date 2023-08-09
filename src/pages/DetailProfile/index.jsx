/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/DetailProfile.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import imageProfile from "../../assets/img/profile.png";

const DetailProfile = () => {
    const [photo, setPhoto] = useState(null);
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
    return (
        <>
            <Navbar />
            <section id="home">
                <div className="container">
                    <div className="row editProPage">
                        <div className="col">
                            <div className="upload-container-profile rounded-circle bg-body-secondary">
                                <div className="image-preview-profile" id="imagePreview">
                                    <img src={imageProfile} alt="Image Profile" />
                                </div>
                            </div>
                            <label htmlFor="imageUpload" className="custom-file-upload-profile text-dark" id="uploadLabel">
                                Change Photo
                            </label>
                            <input type="file" className="form-control visually-hidden" id="imageUpload" accept="image/*" onChange={previewImage} name="photo" />
                            <form>
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
                                <button type="submit" className="btn btn-warning text-light">
                                    Save
                                </button>
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
        </>
    );
};

export default DetailProfile;
