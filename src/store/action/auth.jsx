import axios from "axios";
import { toast } from "react-toastify";
let headers = {
    "Content-Type": "multipart/form-data",
};

export const login = (data, navigate) => async (dispatch) => {
    try {
        dispatch({ type: "AUTH_LOGIN_PENDING" });

        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER}users/login`, data);

        localStorage.setItem("token", response.data.token);

        dispatch({ type: "AUTH_LOGIN_SUCCESS", payload: response.data.users });
        navigate("/");
    } catch (error) {
        console.log("An error occurred:", error);
        dispatch({ type: "AUTH_LOGIN_FAILED", payload: error.response?.data?.message || "An error occurred" });
        console.error(error);
    }
};

export const register = (data, navigate) => async (dispatch) => {
    try {
        dispatch({ type: "AUTH_REGIS_PENDING" });

        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER}users`, data, { headers });

        dispatch({ type: "AUTH_REGIS_SUCCESS", payload: response.data.users });
        toast.success("Registration Successful!", {
            autoClose: 1500,
        });
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    } catch (error) {
        console.log("An error occurred:", error);
        dispatch({ type: "AUTH_REGIS_FAILED", payload: error.response?.data?.message || "An error occurred" });
        console.error(error);
        toast.error(error.response?.data?.message, {
            autoClose: 1500,
            hideProgressBar: true,
        });
    }
};
