import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { IUser } from "../../Users/api/users.api";

interface ILoginState {
  currentUser?: IUser;
}

const initialState: ILoginState = {};

export const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { setCurrentUser } = loginSlice.actions;

export const loginSelector = (state: RootState) => state.loginUser;
