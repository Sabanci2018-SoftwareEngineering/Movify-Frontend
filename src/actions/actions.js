export const userChanged = (user) => {
    return (dispatch) => {
        dispatch({
            type: 'user_changed',
            payload: user,
        });
    };
};

export const usernameChanged = (username) => {
    return (dispatch) => {
        dispatch({
            type: 'username_changed',
            payload: username,
        });
    };
};

export const searchDataChanged = (searchData) => {
    return (dispatch) => {
        dispatch({
            type: 'searchData_changed',
            payload: searchData,
        });
    };
};

export const searchTextChanged = (searchText) => {
    return (dispatch) => {
        dispatch({
            type: 'searchText_changed',
            payload: searchText,
        });
    };
};
