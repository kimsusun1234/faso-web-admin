import { IUser } from "models";
import { ILoginRequest, IForgotPasswordRequest } from "redux/actions/interfaces";
import { BaseApiService } from "services/BaseApiService";

class AuthenticationApiService extends BaseApiService {
  public authenticate = (loginRequest: ILoginRequest) =>
    this.post<ILoginRequest, IUser>("/identity/authenticate", loginRequest);
  public forgotPassword = (forgotRequest: IForgotPasswordRequest) => 
    this.post<IForgotPasswordRequest, any>("/identity/forgot-password", forgotRequest);
}

export default new AuthenticationApiService(false);
