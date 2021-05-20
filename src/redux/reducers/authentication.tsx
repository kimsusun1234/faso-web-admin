import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationActions } from "../actions";

export interface IAuthenReducer {
  user: any;
  error: Error | null;
}

const initialState: IAuthenReducer = {
  user: null,
  error: null
};

function loginSuccess(state: IAuthenReducer, action: PayloadAction<any>) {
  state.user = action.payload;
}
function loginFailed(state: IAuthenReducer, action: PayloadAction<Error>) {
  state.error = action.payload;
}
function clearError(state: IAuthenReducer) {
  state.error = null;
}
function logout(state: IAuthenReducer)  {
  state.user = null
}

const AuthenticationReducer = createReducer(initialState, (builder) =>
  builder.addCase(AuthenticationActions.authenticate.success, loginSuccess)
  .addCase(AuthenticationActions.authenticate.failed, loginFailed)
  .addCase(AuthenticationActions.clearError.request, clearError)
  .addCase(AuthenticationActions.logout.request, logout)
);
export default AuthenticationReducer;
