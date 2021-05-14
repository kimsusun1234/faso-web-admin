import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IItemCategory } from "models/IItemCategory";
import { CategoryActions } from "../actions";

export interface ICategoryReducer {
  category: IItemCategory[];
}

const initialState: ICategoryReducer = {
  category: [],
};

function getCategorySuccess(
  state: ICategoryReducer,
  action: PayloadAction<IItemCategory[]>
) {
  state.category = action.payload;
}

const CategoryReducer = createReducer(initialState, (builder) =>
  builder.addCase(CategoryActions.getCategory.success, getCategorySuccess)
);
export default CategoryReducer;
