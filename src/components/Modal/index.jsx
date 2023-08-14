/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./style.css";
import BtnDeleting from "../BtnDeleting"; // Import your BtnLoading component

const Modal = ({ open, onClose, onDelete, isMessage, isTitle }) => {
    const [isDeleting, setIsDeleting] = useState(false); // New state for loading

    const handleDelete = async () => {
        setIsDeleting(true); // Set loading state to true
        await onDelete();
        setIsDeleting(false); // Set loading state back to false after deletion is done
        onClose();
    };

    if (!open) return null;
    return (
        <div className="viewport">
            <div onClick={onClose} className="overlay">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="modalContainer"
                >
                    <div className="modalRight">
                        <p className="closeBtn" onClick={onClose}>
                            X
                        </p>
                        <div className="content text-center">
                            <h1>{isTitle}</h1>
                            <h6 className="mt-2">{isMessage}</h6>
                        </div>
                        <div className="btnContainer">
                            <BtnDeleting
                                type="button"
                                className="btn btn-warning btnPrimary text-light"
                                onClick={handleDelete} // Call handleDelete instead of onDelete directly
                                isLoading={isDeleting} // Disable the button during deletion
                            >
                                Yes
                            </BtnDeleting>
                            <button type="button" className="btn btn-secondary btnOutline text-light" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
