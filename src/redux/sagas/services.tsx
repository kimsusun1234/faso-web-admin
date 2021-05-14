import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeEvery, delay } from "redux-saga/effects";
import { IServicesRequest } from "../actions/interfaces";
import { ServicesActions } from "../actions";
import { IService } from "models/IServices";

function* getServices(action: PayloadAction<IServicesRequest>) {
  try {
    yield delay(1500);
    yield put(ServicesActions.getServices.success(data));
  } catch (error) {
    yield put(ServicesActions.getServices.failed(error));
  }
}

export function* ServiceWatcher() {
  yield takeEvery(ServicesActions.getServices.requestName, getServices);
}

const data: Array<IService> = [
  {
    id: "1",
    duration: 600,
    item: {
      id: "123",
      code: "123",
      name: "Pedicure",
      price: 35,
      description: "ko biet",
      itemCategoryId: "1",
      imageUrl: "",
      taxtId: "123",
      shopId: "1",
    },
    shopId: "1",
  },
];
