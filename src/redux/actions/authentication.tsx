import { ReduxHelper } from "helpers";
import { IUser } from "models/IUser";
import { ILoginRequest } from "./interfaces";

const prefix = "AUTHENTICATION";

const authenticate = ReduxHelper.generateActions<ILoginRequest, any, any>(
  `${prefix}/AUTHENTICATE`
);
const logout = ReduxHelper.generateLocalAction(
  `${prefix}/LOGOUT`
);
const clearError = ReduxHelper.generateLocalAction(`${prefix}/CLEAR_ERROR`);

export { authenticate, clearError, logout };
