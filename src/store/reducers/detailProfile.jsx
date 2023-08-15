const initialState = {
    data: null,
    errorMessage: "",
    isLoading: false,
    isError: false,
};

const detailProfileReducer = (state = initialState, action) => {
    if (action.type === "PUT_PROFILE_PENDING") {
        return {
            ...state,
            isLoading: true,
        };
    } else if (action.type === "PUT_PROFILE_SUCCESS") {
        return {
            ...state,
            data: action.payload,
            isLoading: false,
            errorMessage: "",
            isError: false,
        };
    } else if (action.type === "PUT_PROFILE_FAILED") {
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

export default detailProfileReducer;
