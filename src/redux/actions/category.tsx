import { ReduxHelper } from "helpers";
import { ICategoryRequest } from "./interfaces";
import { IItemCategory } from "models/IItemCategory";

const prefix = "CATEGORY";

const getCategory = ReduxHelper.generateActions<
  ICategoryRequest,
  IItemCategory[]
>(`${prefix}/GET_CATEGORY`);

export { getCategory };
