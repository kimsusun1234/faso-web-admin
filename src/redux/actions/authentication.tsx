import { ReduxHelper } from "helpers";
import { IUser } from "models/IUser";
import { ILoginRequest } from "./interfaces";

const prefix = "AUTHENTICATION";

const authenticate = ReduxHelper.generateActions<ILoginRequest, IUser, any>(
  `${prefix}/AUTHENTICATE`
);
const clearError = ReduxHelper.generateLocalAction(`${prefix}/CLEAR_ERROR`);

export { authenticate, clearError };
