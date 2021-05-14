import { createReducer } from "@reduxjs/toolkit";
import { UserActions } from "../actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "models/IUser";

interface IUserState {
  user?: IUser;
  error?: Error;
}
const initialState: IUserState = {};

//Login
const getUserInfoSuccess = (
  state: IUserState,
  action: PayloadAction<IUser>
) => {
  state.user = action.payload;
};
const getUserInfoFailed = (state: IUserState, action: PayloadAction<any>) => {
  state.error = action.payload;
};

const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UserActions.getUserInfo.success, getUserInfoSuccess)
    .addCase(UserActions.getUserInfo.failed, getUserInfoFailed);
});

export default UserReducer;
