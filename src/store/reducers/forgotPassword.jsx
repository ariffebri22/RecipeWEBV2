const initialState = {
    data: null,
    errorMessage: "",
    isLoading: false,
    isError: false,
};

const forgotReducer = (state = initialState, action) => {
    if (action.type === "AUTH_FORGOT_PENDING") {
        return {
            ...state,
            isLoading: true,
        };
    } else if (action.type === "AUTH_FORGOT_SUCCESS") {
        return {
            ...state,
            data: action.payload,
            isLoading: false,
            errorMessage: "",
            isError: false,
        };
    } else if (action.type === "AUTH_FORGOT_FAILED") {
        return {
            ...state,
            data: null,
            errorMessage: action.payload,
            isLoading: false,
            isError: true,
        };
    } else {
        return state;
    }
};

export default forgotReducer;
