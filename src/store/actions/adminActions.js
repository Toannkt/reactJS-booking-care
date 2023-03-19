// import { get } from "lodash";
import { getAllCodeService } from "../../services/userService";
import actionTypes from "./actionTypes";

//GET GENDER
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      setTimeout(async () => {
        let resGenders = await getAllCodeService("GENDER");
        //Genders
        if (resGenders && resGenders.errCode === "0") {
          dispatch(fetchGenderSuccess(resGenders.data));
        } else {
          dispatch(fetchGenderFailed());
        }
      }, 2000);
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("message: ", e);
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
        let resPositions = await getAllCodeService("POSITION");
        if (resPositions && resPositions.errCode === "0") {
          dispatch(fetchPositionSuccess(resPositions.data));
        } else {
          dispatch(fetchPositionFailed());
        }
      }, 2000);
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("message: ", e);
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
        let resRole = await getAllCodeService("ROLE");
        if (resRole && resRole.errCode === "0") {
          dispatch(fetchRoleSuccess(resRole.data));
        } else {
          dispatch(fetchRoleFailed());
        }
      }, 2000);
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("message: ", e);
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
