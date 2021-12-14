import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IUserAuthRequest, IUserStatus } from '../../Types/userTypes/Users';
import userAPI from '../../API/userAPI';

const initialState: IUserStatus = {
  isAuth: !!localStorage.getItem('token'),
  isLoading: false,
};

export const loginRequest = createAsyncThunk(
  'login',
  async (userAuthData: IUserAuthRequest, { rejectWithValue }) => {
    try {
      const { login, password, language } = userAuthData;
      return await userAPI.loginAPI(login, password, language);
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    logoutRequest(state) {
      localStorage.removeItem('token');
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state: IUserStatus) => {
      state.isLoading = true;
    });
    builder.addCase(
      loginRequest.fulfilled,
      (state: IUserStatus, { payload }) => {
        const { data } = payload as AxiosResponse;
        localStorage.setItem('token', data.accessToken);
        state.isLoading = false;
        state.isAuth = true;
      }
    );
    builder.addCase(
      loginRequest.rejected,
      (state: IUserStatus, { payload }) => {
        state.error = payload as string;
        state.isLoading = false;
      }
    );
  },
});
export const { logoutRequest } = userReducer.actions;
export default userReducer.reducer;
