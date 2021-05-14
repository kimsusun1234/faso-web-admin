import { all } from "redux-saga/effects";
import { User, Services, Category, Authentication } from "../sagas";

export default function* watch() {
  yield all([
    User.UserWatcher(),
    Services.ServiceWatcher(),
    Category.CategoryWatcher(),
    Authentication.AuthenticateWatcher(),
  ]);
}
