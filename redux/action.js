import axios from "axios";
const serverUrl = "http://localhost:4000/api/v1";
export const login = (email, password) => {
  return async (dispatch) => {

    dispatch({type: "loginRequest"});
    try {
      const response = await axios.post(`${serverUrl}/login`, {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
      );
      dispatch({type: "loginSuccess", payload: data});
    } catch (error) {
      dispatch({type: "loginFailure", payload: error.response.data.message});
    }
  }
}
export const loadUser = () => {
  return async (dispatch) => {

    dispatch({type: "loadUserRequest"});
    try {
      const response = await axios.get(`${serverUrl}/me`);
      dispatch({type: "loadUserSuccess", payload: data});
    } catch (error) {
      dispatch({type: "loadUserFailure", payload: error.response.data.message});
    }
  }
}
