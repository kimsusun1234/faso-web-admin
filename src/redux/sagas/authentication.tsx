import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "models";
import { put, takeEvery, call } from "redux-saga/effects";
import { AuthenticationActions, ActionInterfaces } from "redux/actions";
import AuthenticationApiService from "services/AuthenticationApiService";
import Axios, { AxiosError } from 'axios'

function* authenticate(action: PayloadAction<any>) {
  try {
    const result: object = yield call(myLogin, action.payload.phone, action.payload.password);
    yield put(AuthenticationActions.authenticate.success(result));
    // interface IApiResponse {
    //   succeeded: Boolean;
    //   data: IUser;
    // }
    // const result: IApiResponse = yield call(
    //   AuthenticationApiService.authenticate,
    //   action.payload
    // );
    // // console.log("RESULT =>> ", result);
    // if (result.succeeded) {
    //   yield put(AuthenticationActions.authenticate.success(result.data));
    // }
    
    // if (action.payload.rememberMe) {
    //   localStorage.setItem('login', JSON.stringify(action.payload));
    // }else {
    //   localStorage.removeItem('login');
    // }
  } catch (error) {
    yield put(AuthenticationActions.authenticate.failed(error));
  }
}

function myLogin(phone: string, password: string) {
  const reformatPhone = `84${phone.substring(1)}`;
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await Axios({
        method: 'post',
        url: 'http://3.136.161.133:3000/api/v1/admin/login',
        data: {
          phone_number: reformatPhone, 
          password: password
        }
      });
      resolve(data.data);
    } catch (error) {
      const axiosError = error as AxiosError<any>
      console.error(axiosError.response?.status);
      reject(new Error(axiosError.response?.status === 401 ? 'Phone number or password is not correct!' : axiosError.response?.data.error.message));
    }
  })
}

export function* AuthenticateWatcher() {
  yield takeEvery(AuthenticationActions.authenticate.requestName, authenticate);
}
