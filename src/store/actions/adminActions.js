// import { get } from "lodash";
import { escapeRegExp } from 'lodash';
import { toast } from 'react-toastify';
import { getAllCodeService, createNewUserService, getAllusers, deleteUserService } from '../../services/userService';
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
