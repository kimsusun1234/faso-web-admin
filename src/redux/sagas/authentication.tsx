import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "models";
import { put, takeEvery, delay, call } from "redux-saga/effects";
import { AuthenticationActions, ActionInterfaces } from "redux/actions";
import AuthenticationApiService from "services/AuthenticationApiService";

function* authenticate(action: PayloadAction<ActionInterfaces.ILoginRequest>) {
  try {
    const result: IUser = yield call(
      AuthenticationApiService.authenticate,
      action.payload
    );
    console.log("RESULT =>> ", result);
    // yield put(UserActions.login.success(result));
    // if (action.payload.isRemember) {
    //   localStorage.setItem('login', JSON.stringify(action.payload));
    // }else {
    //   localStorage.removeItem('login');
    // }
  } catch (error) {
    yield put(AuthenticationActions.authenticate.failed(error));
  }
}

export function* AuthenticateWatcher() {
  yield takeEvery(AuthenticationActions.authenticate.requestName, authenticate);
}
