/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import cari from "../../assets/img/cari.png";
import image1 from "../../assets/img/Rectangle 313.png";
import image2 from "../../assets/img/Rectangle 314.png";
import image3 from "../../assets/img/Rectangle 315.png";
import image4 from "../../assets/img/Rectangle 320.png";
import image5 from "../../assets/img/Rectangle 321.png";
import image6 from "../../assets/img/Rectangle 316.png";
import image7 from "../../assets/img/Rectangle 317.png";
import image8 from "../../assets/img/Rectangle 318.png";
import image9 from "../../assets/img/Rectangle 319.png";

import "../../styles/Home.css";

const Home = () => {
    return (
        <>
            <div className="side bg-warning"></div>
            <Navbar />
            <section id="homee">
                <div className="container first">
                    <div className="row">
                        <div className="col-md-6 m-auto ps-5">
                            <h1 className="ps-2">
                                Discover Recipe <br />& Delicious Food
                            </h1>
                            <div className="input-group input-group-lg mt-3 ps-2 inputSearchh">
                                <span className="input-group-text bg-body-secondary" id="inputGroup-sizing-lg">
                                    <img src={cari} alt="Search" width="20" />
                                </span>
                                <input type="text" className="form-control bg-body-secondary" placeholder="search restaurant, food" aria-label="search restaurant, food" aria-describedby="inputGroup-sizing-lg" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="imgCover bg-primary ms-5 rounded-4">
                                <img src={image1} alt="Image 1" className="rounded-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="popularforyou" data-aos="fade-up" data-aos-duration="2000">
                <div className="circle position-absolute">
                    <div className="circle1">
                        <div className="circle-round rounded-circle"></div>
                        <div className="circle-round rounded-circle"></div>
                        <div className="circle-round rounded-circle"></div>
                    </div>
                    <div className="circle2">
                        <div className="circle-round rounded-circle"></div>
                        <div className="circle-round rounded-circle"></div>
                        <div className="circle-round rounded-circle"></div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-1 ms-5 mt-5 ssquare">
                            <div className="square bg-warning"></div>
                        </div>
                        <div className="col mt-5">
                            <h3 className="mt-3">Popular For You !</h3>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 mt-5 mb-5 imageContent" data-aos="fade-right" data-aos-duration="2000">
                            <div className="squareborder position-absolute rounded-3"></div>
                            <img src={image2} alt="Image 2" width="450" className="rounded-3 ms-5" />
                        </div>
                        <div className="col-md-6 m-auto">
                            <div className="content" data-aos="fade-left" data-aos-duration="2000">
                                <h3>Healthy Bone Broth Ramen (Quick & Easy)</h3>
                                <p>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                                <button type="button" className="btn btn-warning mt-3">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="newrecipe">
                <div className="container">
                    <div className="row" data-aos="fade-up" data-aos-duration="2000">
                        <div className="col-1 ms-5 mt-5 ssquare">
                            <div className="square bg-warning"></div>
                        </div>
                        <div className="col mt-5">
                            <h3 className="mt-3">New Recipe</h3>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 mt-5 mb-5 imageContent">
                            <div className="squaresolid position-absolute bg-warning" data-aos="fade-right" data-aos-duration="2000"></div>
                            <img src={image3} alt="Image 3" width="450" className="rounded-3 ms-5 mt-5" data-aos="fade-right" data-aos-duration="2000" />
                        </div>
                        <div className="col-md-6 m-auto">
                            <div className="content" data-aos="fade-left" data-aos-duration="2000">
                                <h3>Healthy Bone Broth Ramen (Quick & Easy)</h3>
                                <p>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                                <button type="button" className="btn btn-warning mt-3">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="popularrecipe">
                <div className="container">
                    <div className="row" data-aos="fade-up" data-aos-duration="2000">
                        <div className="col-1 ms-5 mt-5 ssquare">
                            <div className="square bg-warning"></div>
                        </div>
                        <div className="col mt-5">
                            <h3 className="mt-3">Popular Recipe</h3>
                        </div>
                    </div>
                    <div className="row mt-5 ps-5 pe-5">
                        <div className="col mt-5 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="1000">
                            <div className="image1">
                                <img src={image4} alt="Image 4" className="rounded-3" />
                                <p>
                                    Chicken <br />
                                    Kare
                                </p>
                            </div>
                        </div>
                        <div className="col mt-5 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="150">
                            <div className="image2">
                                <img src={image5} alt="Image 5" className="rounded-3" />
                                <p>
                                    Bomb <br />
                                    Chicken
                                </p>
                            </div>
                        </div>
                        <div className="col mt-5 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
                            <div className="image3">
                                <img src={image6} alt="Image 6" className="rounded-3" />
                                <p>
                                    Banana
                                    <br />
                                    Smothie Pop
                                </p>
                            </div>
                        </div>
                        <div className="col mt-5 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="250">
                            <div className="image4">
                                <img src={image7} alt="Image 7" className="rounded-3" />
                                <p>
                                    Coffe Lava <br />
                                    Cake
                                </p>
                            </div>
                        </div>
                        <div className="col mt-5 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
                            <div className="image5">
                                <img src={image8} alt="Image 8" className="rounded-3" />
                                <p>
                                    Sugar <br />
                                    Salmon
                                </p>
                            </div>
                        </div>
                        <div className="col mt-5 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="350">
                            <div className="image6">
                                <img src={image9} alt="Image 9" className="rounded-3" />
                                <p>
                                    Indian
                                    <br />
                                    Salad
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;
