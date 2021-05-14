import { IBaseModel } from "./Base.model";

export interface IItemCategory extends IBaseModel {
  id: string;
  name: string;
  description: string;
  code: string;
  shopId: string;
}
