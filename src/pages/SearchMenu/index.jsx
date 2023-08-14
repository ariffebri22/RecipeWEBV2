/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/SearchMenu.css";
import { getMenu } from "../../store/action/menu";
import { useDispatch, useSelector } from "react-redux";

const SearchMenu = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState("");
    const dispatch = useDispatch();
    const { menu } = useSelector((state) => state);
    const { isError, errorMessage, isLoading, data } = menu;
    const recipesPerPage = 5;

    useEffect(() => {
        dispatch(getMenu());
    }, []);

    const getFirst10Words = (sentence) => {
        return sentence.split(" ").slice(0, 8).join(" ");
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryFilterChange = (category) => {
        setCategoryFilter(category);
        setCurrentPage(1);
    };

    const filteredRecipes = data
        ? data.filter((item) => {
              const isTitleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
              const isCreatorMatch = item.creator.toLowerCase().includes(searchTerm.toLowerCase());
              const isCategoryMatch = categoryFilter === "" || item.category.toLowerCase() === categoryFilter.toLowerCase();
              return (isTitleMatch || isCreatorMatch) && isCategoryMatch;
          })
        : [];

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const isActiveCategory = (category) => {
        return categoryFilter === category;
    };

    const handleDetailMenu = (recipeId) => {
        navigate(`/detail/${recipeId}`);
    };

    console.log(data);

    return (
        <>
            <Navbar />
            <section id="home">
                <div className="container">
                    <div className="side1 bg-warning"></div>
                    <div className="row">
                        <div className="col ps-5 d-flex align-items-center">
                            <div className="cover">
                                <h1 id="discover">
                                    Discover Recipe <br />& Delicious Food
                                </h1>
                                <div className="input-group input-group-lg inputSearch">
                                    <input
                                        type="text"
                                        className="form-control bg-body-secondary ps-4"
                                        placeholder="Search by title or creator..."
                                        aria-label="Search by title or creator..."
                                        aria-describedby="inputGroup-sizing-lg"
                                        value={searchTerm}
                                        onChange={handleSearchInputChange}
                                    />
                                </div>
                            </div>
                            <button type="button" className="btn btn-warning text-light btnSearch">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col ps-5 btnHelp">
                            <button type="button" className={`btn ${isActiveCategory("Appetizers") ? "btn-warning" : "btn-secondary"} mt-2`} onClick={() => handleCategoryFilterChange("Appetizers")}>
                                Appetizers
                            </button>
                            <button type="button" className={`btn ${isActiveCategory("Main Course") ? "btn-warning" : "btn-secondary"} mt-2`} onClick={() => handleCategoryFilterChange("Main Course")}>
                                Main Course
                            </button>
                            <button type="button" className={`btn ${isActiveCategory("Dessert") ? "btn-warning" : "btn-secondary"} mt-2`} onClick={() => handleCategoryFilterChange("Dessert")}>
                                Dessert
                            </button>
                            <button type="button" className={`btn ${categoryFilter === "" ? "btn-success" : "btn-secondary"} mt-2`} onClick={() => handleCategoryFilterChange("")}>
                                All
                            </button>
                        </div>
                    </div>
                    {currentRecipes?.map((item, index) => (
                        <div key={index} className="row">
                            <div className="col-md-4 mt-5 ms-5 imgCoverr rounded-4 p-0" style={{ width: "18rem" }}>
                                <img src={item.photo} alt="Search" className="rounded-3" style={{ width: "18rem", height: "18rem", objectFit: "cover" }} onClick={() => handleDetailMenu(item.id)} />
                            </div>
                            <div className="col-md-4 titleDescc">
                                <p className="fs-5 mt-3 " onClick={() => handleDetailMenu(item.id)}>
                                    {item.title}
                                </p>
                                <div className="desc">
                                    <p>
                                        <strong>Ingredients:</strong> <br />
                                        {item.ingredients.split(" ").length > 8 ? getFirst10Words(item.ingredients) + " ..." : item.ingredients}
                                    </p>
                                </div>
                                <button type="button" className="btn btn-warning">
                                    10 Likes - 12 Comment - 3 Bookmark
                                </button>
                                <div className="author mt-3 d-flex">
                                    <img src={item.creator_photo} alt="Search" className="me-3 rounded-circle" />
                                    <h6 className="mt-2 text-capitalize">{item.creator}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col d-flex align-items-center justify-content-center mt-5 page">
                            <div className="pagination">
                                {Array.from({ length: Math.ceil(filteredRecipes.length / recipesPerPage) }).map((_, index) => (
                                    <button key={index} type="button" className={`btn ${currentPage === index + 1 ? "btn-warning text-light" : "btn-secondary text-dark"} ms-1`} onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex align-items-center justify-content-center page">
                            <h5 className="mt-2">
                                Show {indexOfFirstRecipe + 1}-{Math.min(indexOfLastRecipe, filteredRecipes.length)} From {filteredRecipes.length}
                            </h5>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SearchMenu;
