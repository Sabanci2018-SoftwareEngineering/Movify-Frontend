export const userChanged = (user) => (dispatch) => {
        dispatch({
            type: 'user_changed',
            payload: user,
        });
    };
export const usernameChanged = (username) => (dispatch) => {
        dispatch({
            type: 'username_changed',
            payload: username,
        });
    };
