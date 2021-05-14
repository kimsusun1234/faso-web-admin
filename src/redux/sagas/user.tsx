import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "models";
import { put, takeEvery, call } from "redux-saga/effects";
import { UserActions, ActionInterfaces } from "redux/actions";
import UserApiService from "services/UserApiService";

function* getUserInfo(action: PayloadAction<string>) {
  try {
    const result: IUser = yield call(
      UserApiService.getUserInfo,
      action.payload
    );
    // yield put(UserActions.login.success(result));
    // if (action.payload.isRemember) {
    //   localStorage.setItem('login', JSON.stringify(action.payload));
    // }else {
    //   localStorage.removeItem('login');
    // }
  } catch (error) {
    yield put(UserActions.getUserInfo.failed(error));
  }
}

export function* UserWatcher() {
  yield takeEvery(UserActions.getUserInfo.requestName, getUserInfo);
}
