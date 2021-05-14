import { IBaseModel } from "./Base.model";
import { IItem } from "./IItem";

export interface IService extends IBaseModel {
  id: string;
  duration: number;
  item: IItem;
  shopId: string;
  // servicesChildren?: IServiceChildren[];
}
// interface IServiceChildren {
//   title?: string;
//   time: ITimeItem[];
// }
// interface ITimeItem {
//   time?: string;
//   price?: string;
// }
