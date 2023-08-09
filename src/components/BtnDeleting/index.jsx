/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const BtnDeleting = ({ children, isLoading, ...rest }) => {
    return (
        <button {...rest} disabled={isLoading}>
            {isLoading ? (
                <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span className="visually-hidden">Deleting...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default BtnDeleting;
