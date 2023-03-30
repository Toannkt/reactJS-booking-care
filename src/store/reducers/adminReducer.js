import actionTypes from '../actions/actionTypes';
const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    gender: [],
    role: [],
    position: [],
    users: [],
    topArrDoctor: [],
    allDoctor: [],
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
        case actionTypes.FETCH_GENDER_FAIlED:
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
        case actionTypes.FETCH_POSITION_FAILED:
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
        case actionTypes.CREATE_USER_START:
            console.log('Create user start: ', action);
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_SUCCESS:
            // console.log('Create user success: ', action);
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_FAILED:
            console.log('Create user failed: ', action);
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
        // DELETE USER
        case actionTypes.DELETE_USER_START:
            console.log('Delete user start: ', action);
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_SUCCESS:
            // console.log('Delete user success: ', action);
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_FAILED:
            console.log('Delete user failed: ', action);
            return {
                ...state,
            };
        // UPDATE USER
        case actionTypes.UPDATE_USER_START:
            console.log('Update user start: ', action);
            return {
                ...state,
            };
        case actionTypes.UPDATE_USER_SUCCESS:
            // console.log('Update user success: ', action);
            return {
                ...state,
            };
        case actionTypes.UPDATE_USER_FAILED:
            console.log('Update user failed: ', action);
            return {
                ...state,
            };
        // FETCH TOP DOCTOR:
        case actionTypes.GET_TOP_DOCTOR_START:
            console.log('Fetch top doctor start: ', action);
            return {
                ...state,
            };
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            state.topArrDoctor = action.dataDoctor;
            // console.log('Fetch top doctor success: ', action);
            return {
                ...state,
            };
        case actionTypes.GET_TOP_DOCTOR_FAILED:
            console.log('Fetch top doctor failed: ', action);
            return {
                ...state,
            };
        //GET ALL DOCTOR
        case actionTypes.FETCH_ALL_DOCTOR_START:
            console.log('fetch all dotor start:', action);
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            // console.log('fetch all dotor success:', action);
            state.allDoctor = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            console.log('fetch all dotor failed:', action);
            return {
                ...state,
            };
        // POST DETAIL DOCTOR
        case actionTypes.CREATE_DETAIL_DOCTOR_START:
            console.log('Create detail doctor started:', action);
            return {
                ...state,
            };
        case actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS:
            console.log('Create detail doctor succeeded:', action);
            return {
                ...state,
            };
        case actionTypes.CREATE_DETAIL_DOCTOR_FAILED:
            console.log('Create detail doctor failed:', action);
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
