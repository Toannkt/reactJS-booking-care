import actionTypes from '../actions/actionTypes';
const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    gender: [],
    role: [],
    position: [],
    users: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // GENDER TYPE
        case actionTypes.FETCH_GENDER_START:
            console.log('check fetch gender start:', action);
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.gender = action.dataGender;
            state.isLoadingGender = true;
            // console.log("check fetch gender success:", action);
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAIED:
            console.log('check fetch gender failed:', action);
            state.isLoadingGender = true;
            return {
                ...state,
            };
        //POSITION TYPE
        case actionTypes.FETCH_POSITION_START:
            console.log('check fetch position start');
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            // console.log("Check fetch position success: ", action);
            state.isLoadingPosition = true;
            state.position = action.dataPosition;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITON_FAILED:
            console.log('Check fetch position failure: ', action);
            state.isLoadingPosition = true;
            return {
                ...state,
            };
        // ROLE TYPE
        case actionTypes.FETCH_ROLE_START:
            console.log('Check fetch role success: ', action);
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            // console.log("Check fetch role success: ", action);
            state.isLoadingRole = true;
            state.role = action.dataRole;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            console.log('Check fetch role failed: ', action);
            state.isLoadingRole = true;
            return {
                ...state,
            };
        // get all user
        case actionTypes.FETCH_ALL_USER_START:
            console.log('Check fetch all user start: ', action);
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            // console.log('Check fetch all user success: ', action);
            state.users = action.dataUsers;
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_START:
            console.log('Delete user start: ', action);
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_SUCCESS:
            console.log('Delete user success: ', action);
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_FAILED:
            console.log('Delete user failed: ', action);
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
