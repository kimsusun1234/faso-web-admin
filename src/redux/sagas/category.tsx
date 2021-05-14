import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeEvery, delay } from "redux-saga/effects";
import { ICategoryRequest } from "../actions/interfaces";
import { CategoryActions } from "../actions";
import { IItemCategory } from "models/IItemCategory";

function* getCategory(action: PayloadAction<ICategoryRequest>) {
  try {
    yield delay(1500);
    yield put(CategoryActions.getCategory.success(data));
  } catch (error) {
    yield put(CategoryActions.getCategory.failed(error));
  }
}

export function* CategoryWatcher() {
  yield takeEvery(CategoryActions.getCategory.requestName, getCategory);
}

const data: Array<IItemCategory> = [
  {
    id: "1",
    name: "Ped",
    description: "chiu",
    code: "1",
    shopId: "1",
    createdBy: "Trung",
    createdDate: new Date(),
    lastModifiedBy: "Hai",
    lastModifiedDate: new Date(),
    status: 1,
  },
  {
    id: "2",
    name: "Phalanges",
    description: "chiu",
    code: "1",
    shopId: "1",
    createdBy: "Trung",
    createdDate: new Date(),
    lastModifiedBy: "Hai",
    lastModifiedDate: new Date(),
    status: 1,
  },
];
