export interface IServicesRequest {
  userId: string;
  shopId: string;
}

export interface ILoginRequest {
  email?: string;
  userNameOrEmail?: string;
  password: string;
  rememberMe: boolean;
}

export interface IForgotPasswordRequest {
  email: string
}

export interface ICategoryRequest {
  userId: string;
  shopId: string;
}
