/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import nft from "../../assets/img/Rectangle 320.png";
import "./style.css";

const Modal = ({ open, onClose, onDelete }) => {
    if (!open) return null;
    return (
        <div onClick={onClose} className="overlay">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="modalContainer"
            >
                <img src={nft} alt="/" />
                <div className="modalRight">
                    <p className="closeBtn" onClick={onClose}>
                        X
                    </p>
                    <div className="content">
                        <p>Do you want a</p>
                        <h1>$20 CREDIT</h1>
                        <p>for your first tade?</p>
                    </div>
                    <div className="btnContainer">
                        <button className="btnPrimary">
                            <span className="bold" onClick={onDelete}>
                                YES
                            </span>
                            , I love NFTs
                        </button>
                        <button className="btnOutline" onClick={onClose}>
                            <span className="bold">NO</span>, thanks
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
