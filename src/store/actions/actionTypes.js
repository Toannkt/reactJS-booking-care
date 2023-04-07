const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //admin
    // ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    // ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    // PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    //GENDERS
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    // POSITIONS
    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    // ROLE
    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    //SAVE USER
    CREATE_USER_START: 'CREATE_USER_START',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    //GET ALL INFO USER
    FETCH_ALL_USER_START: 'FETCH_ALL_USER_START',
    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    //DELETE USER WITH ID
    DELETE_USER_START: 'DELETE_USER_START',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    // UPDATE USER
    UPDATE_USER_START: 'UPDATE_USER_START',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',

    //GET TOP DOCTOR
    GET_TOP_DOCTOR_START: 'GET_TOP_DOCTOR_START',
    GET_TOP_DOCTOR_SUCCESS: 'GET_TOP_DOCTOR_SUCCESS',
    GET_TOP_DOCTOR_FAILED: 'GET_TOP_DOCTOR_FAILED',

    //GET ALL DOCTOR
    FETCH_ALL_DOCTOR_START: 'GET_ALL_DOCTOR_START',
    FETCH_ALL_DOCTOR_SUCCESS: 'GET_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAILED: 'GET_ALL_DOCTOR_FAILED',

    //CREATE DETAIL DOCTOR
    CREATE_DETAIL_DOCTOR_START: 'CREATE_DETAIL_DOCTOR_START',
    CREATE_DETAIL_DOCTOR_SUCCESS: 'CREATE_DETAIL_DOCTOR_SUCCESS',
    CREATE_DETAIL_DOCTOR_FAILED: 'CREATE_DETAIL_DOCTOR_FAILED',

    //GET DETAIL DOCTOR
    FETCH_DETAIL_DOCTOR_START: 'FETCH_DETAIL_DOCTOR_START',
    FETCH_DETAIL_DOCTOR_SUCCESS: 'FETCH_DETAIL_DOCTOR_SUCCESS',
    FETCH_DETAIL_DOCTOR_FAILED: 'FETCH_DETAIL_DOCTOR_FAILED',

    //GET ALLCODE SCHEDULE TIME
    FETCH_ALLCODE_SCHEDULE_TIME_START: 'FETCH_ALLCODE_SCHEDULE_TIME_START',
    FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_TIME_FAILED: 'FETCH_ALLCODE_SCHEDULE_TIME_FAILED',

    // GET REQUIRED DOCTOR INFOR
    FETCH_REQUIRED_DOCTOR_INFOR_START: 'FETCH_REQUIRED_DOCTOR_INFOR_START',
    FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: 'FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS',
    FETCH_REQUIRED_DOCTOR_INFOR_FAILED: 'FETCH_REQUIRED_DOCTOR_INFOR_FAILED',
});

export default actionTypes;
