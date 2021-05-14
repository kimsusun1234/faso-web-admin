import { createReducer, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { AppConfig } from "../actions";

export interface IAppConfigReducer {
  showLoading: boolean;
  showNotification: boolean;
  language: string;
  token?: string;
}

const initialState: IAppConfigReducer = {
  showLoading: false,
  showNotification: false,
  language: "EN",
};

function isRequest(action: AnyAction) {
  return action.type.endsWith("_REQUEST");
}
function notRequest(action: AnyAction) {
  return !action.type.endsWith("_REQUEST");
}
const AppConfigReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(
      AppConfig.showLoading.request,
      (state, action: PayloadAction<boolean>) => {
        state.showLoading = action.payload;
      }
    )
    .addCase(
      AppConfig.showNotification.request,
      (state, action: PayloadAction<boolean>) => {
        state.showNotification = action.payload;
      }
    )
    .addCase(
      AppConfig.chooseLanguage.request,
      (state, action: PayloadAction<string>) => {
        state.language = action.payload;
      }
    )
    .addCase(
      AppConfig.setToken.request,
      (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      }
    )
    .addMatcher(isRequest, (state) => {
      state.showLoading = true;
    })
    .addMatcher(notRequest, (state) => {
      state.showLoading = false;
    })
);

export default AppConfigReducer;
