const initialState = {
    isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {
                ...state,
                isLoggedIn: true
            };
        default:
            return state;
    }
};

export default userReducer;