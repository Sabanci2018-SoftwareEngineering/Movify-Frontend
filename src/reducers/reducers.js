const INITIAL_STATE = {
    user: undefined,
    username: undefined
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'user_changed':
            return { ...state, user: action.payload };
        case 'username_changed':
            return { ...state, username: action.payload };
        default:
            return state;
    }
};
