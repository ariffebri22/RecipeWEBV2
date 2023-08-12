import axios from "axios";
import { toast } from "react-toastify";

let url = import.meta.env.VITE_REACT_APP_SERVER;

export const getMenuDetail = (id) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        dispatch({ type: "DETAIL_MENU_PENDING" });
        const result = await axios.get(url + `/recipe/${id}`, { headers });
        dispatch({ payload: result.data.data, type: "DETAIL_MENU_SUCCESS" });
    } catch (err) {
        console.error("error", err);
        dispatch({ payload: err.response, type: "DETAIL_MENU_FAILED" });
    }
};

export const getMenuByUsers = (id) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        dispatch({ type: "DETAIL_MENU_PENDING" });
        const result = await axios.get(url + `/recipe/users/${id}`, { headers });
        dispatch({ payload: result.data.data, type: "DETAIL_MENU_SUCCESS" });
    } catch (err) {
        console.error("error", err);
        dispatch({ payload: err.response, type: "DETAIL_MENU_FAILED" });
    }
};

export const getMenu = () => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        dispatch({ type: "GET_MENU_PENDING" });
        const result = await axios.get(url + `/recipe`, { headers });
        dispatch({ payload: result.data.data, type: "GET_MENU_SUCCESS" });
    } catch (err) {
        console.error("error", err);
        dispatch({ payload: err.response, type: "GET_MENU_FAILED" });
    }
};

export const searchMenu = (data) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        dispatch({ type: "GET_MENU_PENDING" });
        const result = await axios.get(url + `/recipe/detail?search=${data}`, { headers });
        dispatch({ payload: result.data.data, type: "GET_MENU_SUCCESS" });
    } catch (err) {
        console.error("error", err);
        dispatch({ payload: err.response, type: "GET_MENU_FAILED" });
    }
};

export const deleteMenu = (id, navigate) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        dispatch({ type: "DELETE_MENU_PENDING" });
        const result = await axios.delete(url + `/recipe/${id}`, { headers });
        console.log(result);
        navigate("/");
        dispatch({ payload: result.data.data, type: "DELETE_MENU_SUCCESS" });
    } catch (err) {
        console.error("error", err);
        dispatch({ payload: err.response.data.message, type: "DELETE_MENU_FAILED" });
    }
};

export const postMenu = (data, navigate) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const headersPost = {
            ...headers,
            "Content-Type": "multipart/form-data",
        };

        dispatch({ type: "POST_MENU_PENDING" });
        const result = await axios.post(url + `recipe`, data, { headers: headersPost });
        console.log(result);
        dispatch({ payload: result.data.data, type: "POST_MENU_SUCCESS" });
        toast.success("Recipe Successfully Added!", {
            autoClose: 1500,
        });
        setTimeout(() => {
            navigate("/search");
        }, 2000);
    } catch (err) {
        console.error("error", err);
        dispatch({ payload: err.response.data.message, type: "POST_MENU_FAILED" });
    }
};

export const updateMenu = (data, id, navigate) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const headersPost = {
            ...headers,
            "Content-Type": "multipart/form-data",
        };

        dispatch({ type: "PUT_MENU_PENDING" });
        const result = await axios.put(url + `/recipe/${id}`, data, { headers: headersPost });
        console.log(result);
        dispatch({ payload: result.data.data, type: "PUT_MENU_SUCCESS" });
        toast.success("Recipe Successfully Added!", {
            autoClose: 1500,
        });
        setTimeout(() => {
            navigate("/profile");
        }, 2000);
    } catch (err) {
        console.error("error", err);
        dispatch({ payload: err.response.data.message, type: "PUT_MENU_FAILED" });
    }
};
