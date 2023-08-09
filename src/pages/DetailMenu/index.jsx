/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/DetailMenu.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import imageProfile from "../../assets/img/profile.png";

let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaWVsQGdtYWlsLmNvbSIsInVzZXJzX0lkIjoyOSwidHlwZSI6InVzZXIiLCJ1c2VybmFtZSI6IkFyaWVsIiwicGhvdG8iOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9ka2lmdGphYmwvaW1hZ2UvdXBsb2FkL3YxNjkxNDk1NTQ0L1JlY2lwZUFQSVYyL3Bob3RvLTE2OTE0OTU1NDE2NjktNDc5NTYxMzMxX25xMzByeS5qcGciLCJpYXQiOjE2OTE0OTc4Nzl9.4Av67CtTEaTONK5rojiARa9IWrynZS1drdcN3RRuFbs";

const DetailMenu = () => {
    const { id } = useParams();
    const [recipes, setRecipes] = useState({
        title: "",
        ingredients: [],
        category_id: "",
        photo: "",
    });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_SERVER}/recipe/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                setRecipes({
                    title: res.data.data.title,
                    ingredients: res.data.data.ingredients,
                    category_id: res.data.data.category_id,
                    photo: res.data.data.photo,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

    return (
        <>
            <Navbar />
            <section id="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 headUser">
                            <div className="user d-flex align-items-center ps-5">
                                <div className="photo me-4">
                                    <img src={imageProfile} alt="Search" width="40" />
                                </div>
                                <div className="text">
                                    <p className="mb-0 text-dark">Ayudia</p>
                                    <p className="mb-0">
                                        <a href="#" className="text-dark">
                                            <strong>10 Recipes</strong>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 date">
                            <div className="d-flex align-items-center pe-5">
                                <div className="text ps-5">
                                    <p className="mb-0 text-dark">{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center mt-5 homedetail">
                            <h1 className="mt-5">{recipes.title}</h1>
                            <img src={recipes.photo} alt="Search" className="mt-5 rounded-3" width="10rem" height="6rem" />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                            <div className="listingre">
                                <h5>Ingredients</h5>
                                <p className="text-dark">{recipes.ingredients}</p>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-1"></div>
                    </div>
                    <div className="row btnSL">
                        <div className="col-md-4">
                            <button type="button" className="btn btnsave"></button>
                            <button type="button" className="btn btnlike ms-2"></button>
                        </div>
                    </div>
                    <div className="row mt-5 tagComment">
                        <hr className="border border-warning border-2 opacity-100 mb-5" />
                        <div className="col-sm-4 comment d-flex align-items-center">
                            <div className="user1 d-flex justify-content-center align-items-center">
                                <div className="photo me-4">
                                    <img src={imageProfile} alt="Search" width="40" />
                                </div>
                                <div className="text">
                                    <p className="mb-0 text-dark">Ayudia</p>
                                    <p className="mb-0">
                                        <a href="#" className="text-dark" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                            <strong>20 Recipes</strong>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col fillComment">
                            <p className="mt-3 text-dark">Wow, I just made this and it was delicious! Thanks for sharing!</p>
                        </div>
                    </div>
                    <div className="row mt-5 tagComment">
                        <div className="col-sm-4 comment d-flex align-items-center">
                            <div className="user1 d-flex justify-content-center align-items-center">
                                <div className="photo me-4">
                                    <img src={imageProfile} alt="Search" width="40" />
                                </div>
                                <div className="text">
                                    <p className="mb-0 text-dark">Ariel</p>
                                    <p className="mb-0">
                                        <a href="#" className="text-dark" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                            <strong>20 Recipes</strong>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col fillComment">
                            <p className="mt-3 text-dark">So simple and delicious!</p>
                        </div>
                        <hr className="border border-warning border-2 opacity-100 mt-5" />
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10 mt-5">
                            <form action="#">
                                <div className="form-floating text-center">
                                    <textarea className="form-control" placeholder="Leave a comment here" style={{ height: "200px" }} required></textarea>
                                    <label>Your comment here!</label>
                                    <button type="submit" className="btn btn-warning mt-4 w-50 text-light btncomment">
                                        Send a comment
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default DetailMenu;
