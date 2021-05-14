import { IBaseModel } from "./Base.model";

export interface IItem extends IBaseModel {
  id: string;
  code: string;
  name: string;
  price: number;
  description: string;
  itemCategoryId: string;
  imageUrl: string;
  taxtId: string;
  shopId: string;
}
