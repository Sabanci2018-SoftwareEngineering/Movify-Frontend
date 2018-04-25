export const userChanged = (user) => (dispatch) => {
        dispatch({
            type: 'user_changed',
            payload: user,
        });
    };
    
export const searchDataChanged = (searchData) => (dispatch) => {
    dispatch({
        type: 'searchData_changed',
        payload: searchData,
    });
};

export const searchSpinnerChanged = (searchSpinner) => (dispatch) => {
    dispatch({
        type: 'searchSpinner_changed',
        payload: searchSpinner,
    });
};