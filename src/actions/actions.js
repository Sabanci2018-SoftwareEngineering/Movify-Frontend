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