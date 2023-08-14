/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BtnDeleting from "../../components/BtnDeleting";
import Modal from "../../components/Modal";
import "../../styles/Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { getMenuByUsers, deleteMenu } from "../../store/action/menu";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [recipeTitle, setRecipeTitle] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const recipesPerPage = 5;
    const tokenn = localStorage.getItem("token");
    const decodedToken = tokenn ? jwt_decode(tokenn) : null;
    const { photo, username, users_Id } = decodedToken || {};
    const dispatch = useDispatch();
    const { usersMenu } = useSelector((state) => state);
    const { isLoading, data } = usersMenu;
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Load recipes when the component mounts
    useEffect(() => {
        dispatch(getMenuByUsers(users_Id, navigate)).catch((error) => {
            setIsError(true);
            setErrorMessage("Recipe data not found");
        });
    }, [dispatch, users_Id, navigate]);

    // Set recipes data when data is available
    useEffect(() => {
        if (data && data.length > 0) {
            setRecipes(data);
        }
    }, [data]);

    const handleDeleteMenu = (recipeId, recipeTitle) => {
        setSelectedMenuId(recipeId);
        setRecipeTitle(recipeTitle);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedMenuId !== null) {
            try {
                await dispatch(deleteMenu(selectedMenuId, navigate)); // Memasukkan navigate sebagai parameter
                setSelectedMenuId(null);
                setRecipeTitle(null);

                dispatch(getMenuByUsers(users_Id, navigate));
            } catch (error) {
                console.error("Error deleting menu:", error);
                // Handle error if needed
            } finally {
                setOpenModal(false);
            }
        }
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = data ? data.slice(indexOfFirstRecipe, indexOfLastRecipe) : [];

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

    const handleDetailProfile = () => {
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
                                    {data ? (
                                        <p className="mb-0 text-dark">
                                            <strong>{data.length} Recipe</strong>
                                        </p>
                                    ) : (
                                        <p className="mb-0">
                                            <strong>0 Recipes</strong>
                                        </p>
                                    )}
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
                            {isError ? (
                                <p className="text-center mt-4">Error: {errorMessage}</p>
                            ) : data && data.length > 0 ? (
                                currentRecipes.map((recipe, index) => (
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
                                                <BtnDeleting
                                                    type="submit"
                                                    className="btn me-2 btn-danger btnDelete"
                                                    onClick={() => handleDeleteMenu(recipe.id, recipe.title)} // Open modal when delete button is clicked
                                                >
                                                    Delete Menu
                                                </BtnDeleting>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center mt-4">You havent added any recipes yet. Add your best recipe now!</p>
                            )}
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
            {openModal && <Modal open={openModal} onClose={() => setOpenModal(false)} onDelete={handleConfirmDelete} isMessage={`Are you sure to delete ${recipeTitle}?`} isTitle={`CONFIRM`} />}
        </>
    );
};

export default Profile;
