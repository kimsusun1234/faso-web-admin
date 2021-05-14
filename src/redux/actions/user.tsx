import { ReduxHelper } from "helpers";
import { IUser } from "models/IUser";

const prefix = "USER";

const getUserInfo = ReduxHelper.generateActions<string, IUser>(
  `${prefix}/GET_USER_INFO`
);

export { getUserInfo };
