import { combineReducers } from "redux";
import authReducer from "./auth";
import menu from "./getMenu";
import deleteMenu from "./deleteMenu";
import postMenu from "./postMenu";
import putMenu from "./putMenu";
import detailMenu from "./detailMenu";
import register from "./register";
import forgotPassword from "./forgotPassword";

const rootReducers = combineReducers({
    auth: authReducer,
    register,
    forgotPassword,
    menu,
    deleteMenu,
    postMenu,
    putMenu,
    detailMenu,
});

export default rootReducers;
