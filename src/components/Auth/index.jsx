/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
    let token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace="true" />;
    }
    return children;
};

export default Auth;
