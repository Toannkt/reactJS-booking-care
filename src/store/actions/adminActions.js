// import { get } from "lodash";
// import { escapeRegExp } from 'lodash';
import { toast } from 'react-toastify';
import {
    getAllCodeService,
    createNewUserService,
    getAllusers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctor,
    createDetailDoctor,
    getDetailDoctor,
} from '../../services/userService';
import actionTypes from './actionTypes';

//GET GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            setTimeout(async () => {
                let resGenders = await getAllCodeService('GENDER');
                //Genders
                if (resGenders && resGenders.errCode === '0') {
                    dispatch(fetchGenderSuccess(resGenders.data));
                } else {
                    dispatch(fetchGenderFailed());
                }
            }, 2000);
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('message: ', e);
        }
    };
};

export const fetchGenderSuccess = (dataGender) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    dataGender: dataGender,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

// GET POSITION

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            setTimeout(async () => {
                let resPositions = await getAllCodeService('POSITION');
                if (resPositions && resPositions.errCode === '0') {
                    dispatch(fetchPositionSuccess(resPositions.data));
                } else {
                    dispatch(fetchPositionFailed());
                }
            }, 2000);
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('message: ', e);
        }
    };
};

export const fetchPositionSuccess = (dataPosition) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    dataPosition: dataPosition,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

//GET ROLE

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            setTimeout(async () => {
                let resRole = await getAllCodeService('ROLE');
                if (resRole && resRole.errCode === '0') {
                    dispatch(fetchRoleSuccess(resRole.data));
                } else {
                    dispatch(fetchRoleFailed());
                }
            }, 2000);
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('message: ', e);
        }
    };
};

export const fetchRoleSuccess = (dataRole) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    dataRole: dataRole,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});
// CREATE USER
export const fetchCreateUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            setTimeout(async () => {
                let res = await createNewUserService(data);
                if (res && res.errCode === 0) {
                    toast.success('Create new user successfully!');
                    dispatch(fetchCreateUserSuccess());
                    dispatch(fetchAllUserStart());
                } else {
                    toast.warning('Please check the information again!');
                    dispatch(fetchCreateUserFailed());
                }
            });
        } catch (e) {
            toast.error('Create user failed! Please try again!');
            dispatch(fetchCreateUserFailed());
            console.log('Save user failed, ', e);
        }
    };
};

export const fetchCreateUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const fetchCreateUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

// fetch info all user

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllusers('All');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            console.log('check get all user failed: ', e);
        }
    };
};

export const fetchAllUserSuccess = (dataUsers) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    dataUsers: dataUsers,
});

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
});

// delete user with id
export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                toast.success('User deleted successfully!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('User delete error!');
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('User delete error!');
            console.log('Error deleting: ', e);
            dispatch(deleteUserFailed());
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FIALED,
});

//UPDATE USER
export const updateUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user);
            // console.log('res: ', res.errCode);
            if (res && res.errCode === 0) {
                toast.success('Update user successfully!');
                dispatch(updateUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Update user failed! Please try again later!');
                dispatch(updateUserFailed());
            }
        } catch (e) {
            toast.error('Update user failed! Please try again later!');
            dispatch(updateUserFailed());
        }
    };
};

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED,
});

//GET TOP DOCTOR
export const fetchTopDoctorStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(limit);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFailed);
            }
        } catch (e) {
            console.log('Fetch top doctor failed: ', e);
            dispatch(fetchTopDoctorFailed);
        }
    };
};

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
    dataDoctor: data,
});

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.GET_TOP_DOCTOR_FAILED,
});

// GET ALL DOCTOR
export const fetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let doctors = await getAllDoctor();
            // console.log('doctor start: ', doctors);
            if (doctors && doctors.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(doctors.data));
            } else {
                dispatch(fetchAllDoctorFailed());
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchAllDoctorFailed());
        }
    };
};

export const fetchAllDoctorSuccess = (doctors) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: doctors,
});

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
});

//CREATE DETAIL DOCTOR

export const createDetailDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            setTimeout(async () => {
                let res = await createDetailDoctor(data);
                if (res && res.errCode === 0) {
                    toast.success('Save detail doctor successfully!');
                    dispatch(createDetailDoctorSuccess());
                } else {
                    toast.warning('Please check the information again!');
                    dispatch(createDetailDoctorFailed());
                }
            });
        } catch (e) {
            toast.error('Please check the information again!');
            dispatch(createDetailDoctorFailed());
        }
    };
};

export const createDetailDoctorSuccess = () => ({
    type: actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS,
});

export const createDetailDoctorFailed = () => ({
    type: actionTypes.CREATE_DETAIL_DOCTOR_FAILED,
});

//GET DETAIL DOCTOR BY ID
export const fetchDetailDoctorStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailDoctor(id);
            if (res && res.errCode === 0) {
                dispatch(fetchDetailDoctorSuccess(res.data));
            } else {
                dispatch(fetchDetailDoctorFailed());
            }
        } catch (e) {
            console.log('error: ', e);
            dispatch(fetchDetailDoctorFailed());
        }
    };
};

export const fetchDetailDoctorSuccess = (dataDetailDoctor) => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
    dataDetailDoctor: dataDetailDoctor,
});

export const fetchDetailDoctorFailed = () => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
});

// GET ALLCODE SCHEDULE TIME

export const fetchAllCodeScheduleTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch(fetchAllCodeScheduleTimeSuccess(res.data));
            } else {
                dispatch(fetchAllCodeScheduleTimeFailed());
            }
        } catch (e) {
            console.log('fetch allcode schedule time failed!', e);
            dispatch(fetchAllCodeScheduleTimeFailed());
        }
    };
};

export const fetchAllCodeScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data,
});

export const fetchAllCodeScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});
