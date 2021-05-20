import { combineReducers } from "redux";
import {
  AppConfigReducer,
  UserReducer,
  ServiceReducer,
  CategoryReducer,
  AuthenticationReducer
} from "../reducers";
// const reducerMap = {
//   UserReducer: reducers.UserReducer,
// };
const rootReducer = combineReducers({
  AppConfigReducer,
  UserReducer,
  ServiceReducer,
  CategoryReducer,
  AuthenticationReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
