const INITIAL_STATE = {
    user: undefined,
    username: undefined,
    searchText: '',
    searchData: undefined
};

export default ( state = INITIAL_STATE, action)=> {
    
    switch(action.type){
        case 'user_changed':
            return { ...state, user: action.payload};
        case 'username_changed':
            return { ...state, username: action.payload};
        case 'searchText_changed':
            return { ...state, searchText: action.payload};
        case 'searchData_changed':
            return { ...state, searchData: action.payload};
        default:
            return state;
    }
};