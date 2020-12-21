import { authConstants } from "./constants";
import axios from "../helpers/axios";
//import { useEffect } from "react";
export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    const res = axios.post("/signin", {
      ...user,
    });
    if ((await res).status === 200) {
      const { token, user } = (await res).data;
      localStorage.setItem("token", token);
      console.log(user.role);
      localStorage.setItem("role", user.role);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      console.log((await res).status);
      if ((await res).status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: (await res).data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Login Required" },
      });
    }
  };
};
