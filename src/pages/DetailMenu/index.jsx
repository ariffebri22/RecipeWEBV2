/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/DetailMenu.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import imageProfile from "../../assets/img/profile.png";
import { useSelector, useDispatch } from "react-redux";
import { getMenuDetail, getMenuByUsers } from "../../store/action/menu";
import { toast } from "react-toastify";

const DetailMenu = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [formattedDate, setFormattedDate] = useState("");
    const { data, isLoading, isError, errorMessage } = useSelector((state) => state.detMenu);
    const { data: menuList } = useSelector((state) => state.usersMenu);
    const [recipes, setRecipes] = useState({
        title: "",
        ingredients: [],
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

    useEffect(() => {
        dispatch(getMenuDetail(id, navigate));
    }, [dispatch, id, navigate]);

    useEffect(() => {
        if (data) {
            setRecipes({
                title: data.title,
                ingredients: data.ingredients,
                category_id: data.category_id,
                photo: data.photo,
            });

            const dateString = data.created_at;
            const date = new Date(dateString);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = date.toLocaleDateString("en-US", options);
            setFormattedDate(formattedDate);

            if (data.users_id) {
                dispatch(getMenuByUsers(data.users_id));
            }
        }
    }, [data, dispatch]);

    // const numberOfRecipes = menuList.filter((menu) => menu.creator === data.creator).length;

    console.log(menuList);

    // const numberOfRecipes = menuList.filter((menu) => menu.creator === data.creator).length;

    return (
        <>
            <Navbar />
            <section id="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 headUser">
                            {data && (
                                <div className="user d-flex align-items-center ps-5">
                                    <div className="photo me-4">
                                        <img src={data.creator_photo || imageProfile} alt="Profile" width="40" className="rounded-circle" />
                                    </div>
                                    <div className="text">
                                        <p className="mb-0 text-dark">{data.creator || "Unknown"}</p>
                                        <p className="mb-0">
                                            <a href="#" className="text-dark">
                                                <strong>{menuList ? `${menuList.length} Recipe` : "Loading..."}</strong>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 date">
                            <div className="text ps-5">{formattedDate && <p className="mb-0 text-dark">{formattedDate}</p>}</div>
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
