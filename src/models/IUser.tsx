import { IBaseModel } from "models/Base.model";

export interface IUser extends IBaseModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  shopId: string;
  branchId: string;
  isActive: boolean;
  roles: string[];
  jwtToken?: string;
  refreshToken?: string;
}
