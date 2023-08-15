import axios from "axios";
import { toast } from "react-toastify";

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
        let headers = {
            "Content-Type": "multipart/form-data",
        };

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

export const updateProfile = (data, id, navigate) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        };

        dispatch({ type: "PUT_PROFILE_PENDING" });
        const result = await axios.put(`${import.meta.env.VITE_REACT_APP_SERVER}users/${id}`, data, { headers });
        console.log(result);
        dispatch({ payload: result.data.data, type: "PUT_PROFILE_SUCCESS" });
        toast.success("Account has been updated successfully!", {
            autoClose: 1500,
        });
        setTimeout(() => {
            toast.warn("You will be directed to the login page, please login again", {
                autoClose: 1500,
            });
        }, 2000);
        setTimeout(() => {
            navigate("/login");
        }, 5000);
    } catch (err) {
        console.error("error", err);
        dispatch({ payload: err.response.data.message, type: "PUT_PROFILE_FAILED" });
        if (err?.response?.data?.message === "Login session expired, please login again") {
            toast.error(err.response.data.message, {
                autoClose: 3000,
            });
            setTimeout(() => {
                // Clear local storage and navigate to login page
                localStorage.clear();
                navigate("/login");
            }, 4000);
        } else {
            toast.error(`${err.response.data.message}`);
        }
    }
};
