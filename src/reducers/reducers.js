const INITIAL_STATE = {
    user: undefined,
    searchData: [],
    searchSpinner: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'user_changed':
            return { ...state, user: action.payload };
        case 'searchData_changed':
            return { ...state, searchData: action.payload };
        case 'searchSpinner_changed':
            return { ...state, searchSpinner: action.payload };
        default:
            return state;
    }
};
