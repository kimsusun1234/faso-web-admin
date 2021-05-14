import { IUser } from "models";
import { BaseApiService } from "services/BaseApiService";

class UserApiService extends BaseApiService {
  public getUserInfo = (id: string) => this.get<IUser>(`/User/get-user/${id}`);
}

export default new UserApiService();
