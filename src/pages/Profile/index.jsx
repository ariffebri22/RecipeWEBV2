/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BtnDeleting from "../../components/BtnDeleting";
import Modal from "../../components/Modal";
import "../../styles/Profile.css";
import imageProfile from "../../assets/img/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaWVsQGdtYWlsLmNvbSIsInVzZXJzX0lkIjoyOSwidHlwZSI6InVzZXIiLCJ1c2VybmFtZSI6IkFyaWVsIiwicGhvdG8iOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9ka2lmdGphYmwvaW1hZ2UvdXBsb2FkL3YxNjkxNDk1NTQ0L1JlY2lwZUFQSVYyL3Bob3RvLTE2OTE0OTU1NDE2NjktNDc5NTYxMzMxX25xMzByeS5qcGciLCJpYXQiOjE2OTE0OTc4Nzl9.4Av67CtTEaTONK5rojiARa9IWrynZS1drdcN3RRuFbs";

const Profile = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [recipeLoadingStates, setRecipeLoadingStates] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const recipesPerPage = 5;
    const tokenn = localStorage.getItem("token");
    const decodedToken = tokenn ? jwt_decode(tokenn) : null;
    const { photo, username, users_Id } = decodedToken || {};

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_SERVER}/recipe/users/${users_Id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setRecipes(res.data.data);

                const initialRecipeLoadingStates = {};
                res.data.data.forEach((recipe) => {
                    initialRecipeLoadingStates[recipe.id] = false;
                });
                setRecipeLoadingStates(initialRecipeLoadingStates);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [users_Id]);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

    const handleDeleteMenu = (recipeId) => {
        setRecipeLoadingStates((prevStates) => ({
            ...prevStates,
            [recipeId]: true,
        }));

        axios
            .delete(`${import.meta.env.VITE_REACT_APP_SERVER}/recipe/${recipeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("Recipe deleted successfully!");
                axios
                    .get(`${import.meta.env.VITE_REACT_APP_SERVER}/recipe`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        setRecipes(res.data.data);
                        setRecipeLoadingStates((prevStates) => ({
                            ...prevStates,
                            [recipeId]: false,
                        }));
                        toast.success("Delete Success!", {
                            autoClose: 1000,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        setRecipeLoadingStates((prevStates) => ({
                            ...prevStates,
                            [recipeId]: false,
                        }));
                    });
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message, {
                    hideProgressBar: true,
                });
                setRecipeLoadingStates((prevStates) => ({
                    ...prevStates,
                    [recipeId]: false,
                }));
            });
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const truncateDescription = (description) => {
        const words = description.split(" ");
        if (words.length > 10) {
            return words.slice(0, 8).join(" ") + "...";
        }
        return description;
    };

    const handleEditMenu = (recipeId) => {
        navigate(`/edit/${recipeId}`);
    };

    const handleDetailMenu = (recipeId) => {
        navigate(`/detail/${recipeId}`);
    };

    const handleDetailProfile = (recipeId) => {
        navigate(`/detprofile`);
    };

    return (
        <>
            <Navbar />
            <section id="home text" className=" d-flex justify-content-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 headUser">
                            <div className="user d-flex align-items-center ps-5">
                                <div className="photo me-4">
                                    <img src={photo} alt="Search" width="40" onClick={handleDetailProfile} className="rounded-circle" />
                                </div>
                                <div className="text">
                                    <p className="mb-0 text-dark">{username}</p>
                                    <p className="mb-0">
                                        <a href="#" className="text-dark">
                                            <strong>{recipes.length} Recipes</strong>
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
                    <div className="row ms-4 mt-4">
                        <div className="col mt-4 btnHelp">
                            <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active border-0" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">
                                        Recipe
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link border-0" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">
                                        Bookmark
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link border-0" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">
                                        Liked
                                    </button>
                                </li>
                            </ul>

                            <hr className="border ms-3 border-3 border-warning border-solid opacity-100 listMenu" />
                        </div>
                    </div>
                    <div className="tab-content mt-3" id="myTabContent">
                        <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                            {currentRecipes.map((recipe, index) => (
                                <div key={index} className="row ms-1 ps-5">
                                    <div className="col-md-4 mt-5 imgCover rounded-4 p-0 me-5" style={{ width: "18rem" }}>
                                        <img src={recipe.photo} alt="Search" className="rounded-4" style={{ width: "18rem", height: "18rem", objectFit: "cover" }} onClick={() => handleDetailMenu(recipe.id)} />
                                    </div>
                                    <div className="col-md-4 titleDesc">
                                        <p className="fs-5 mt-3" onClick={() => handleDetailMenu(recipe.id)}>
                                            {recipe.title}
                                        </p>
                                        <div className="desc">
                                            <p>
                                                <strong>Ingredients:</strong> <br />
                                                {truncateDescription(recipe.ingredients)}
                                            </p>
                                        </div>
                                        <button type="button" className="btn btn-warning">
                                            {recipe.likes} Likes - {recipe.comments} Comment - {recipe.bookmarks} Bookmark
                                        </button>
                                        <div className="author mt-3 d-flex">
                                            <button type="button" className="btn me-2 btn-primary btnEdit" onClick={() => handleEditMenu(recipe.id)}>
                                                Edit Menu
                                            </button>
                                            <BtnDeleting type="submit" className="btn me-2 btn-danger btnDelete" isLoading={recipeLoadingStates[recipe.id]} onClick={() => setOpenModal(true)}>
                                                Delete Menu
                                            </BtnDeleting>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="row ms-1 mt-5">
                                <div className="col d-flex align-items-center justify-content-center page">
                                    <div className="pagination">
                                        {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, index) => (
                                            <button key={index} className={`btn ${currentPage === index + 1 ? "btn-warning text-light" : "btn-secondary text-dark"} ms-1`} onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row ms-1">
                                <div className="col d-flex align-items-center justify-content-center page">
                                    <h5 className="mt-2">
                                        Show {indexOfFirstRecipe + 1} - {Math.min(indexOfLastRecipe, recipes.length)} From {recipes.length}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab"></div>
                        <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                            <h3>Ini adalah konten Tab 3</h3>
                            <p>Isi dari tab 3 akan ditampilkan di sini.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ToastContainer />
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
};

export default Profile;
