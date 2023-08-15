import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL, KEY_ACCESS_TOKEN, KEY_IS_LOGGED } from "../../../constants/config";
import * as Jwt from "jsonwebtoken";
import { fetchInfoMe } from "../../../apis/usersApi";
const initialState = {
  user: {},
  accessToken: localStorage.getItem(KEY_ACCESS_TOKEN) || "",
  isLoading: false,
  isLogged: JSON.parse(localStorage.getItem(KEY_IS_LOGGED)) || false,
  error: {},
};

export const fetchLogin = createAsyncThunk(
  "users/fetchLogin",
  async (payload) => {
    const reps = await axios.post(`${BE_URL}login`, payload);
    return reps.data;
  }
);

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actGetMe: (state, action) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action)=>{
      localStorage.setItem(KEY_IS_LOGGED,JSON.stringify(true))
      state.isLogged = true;
    },
    actLogout: (state, action)=>{
      localStorage.setItem(KEY_IS_LOGGED,JSON.stringify(false))
      localStorage.removeItem(KEY_ACCESS_TOKEN);
      state.isLogged = false;
      state.user = {};
      state.accessToken = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = {};
      state.isLoading = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      console.log(action.payload);
      const { user, accessToken } = action.payload;
      if (accessToken) {
        state.user = user;
        state.accessToken = accessToken;
        localStorage.setItem(KEY_IS_LOGGED,JSON.stringify(true))
        state.isLogged = true;
        localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
      }
      state.isLoading = false;
    });
  },
});

export const actReLogin = (accessToken) => async (dispatch) => {
  try {
    const decodeToken = Jwt.decode(accessToken);
    if(decodeToken?.email){
      const repsInfo = await fetchInfoMe(decodeToken.email);
      const infoUser = repsInfo?.data?.[0];
      delete infoUser.password;
      dispatch(actGetMe(infoUser));
      dispatch(loginSuccess());
    }
    console.log(accessToken, "inside redux");
    // console.log(decodeToken);
  } catch (error) {
    console.log(error);
  }
};

export const {actGetMe, loginSuccess, actLogout} = usersSlice.actions;

export default usersSlice.reducer;
