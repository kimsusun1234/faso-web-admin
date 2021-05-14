import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IService } from "models/IServices";
import { ServicesActions } from "../actions";

export interface IServiceReducer {
  services: IService[];
  currentService?: IService;
}

const initialState: IServiceReducer = {
  services: [],
};
// Get Services
function getServicesSuccess(
  state: IServiceReducer,
  action: PayloadAction<IService[]>
) {
  state.services = action.payload;
}

//
function selectService(
  state: IServiceReducer,
  action: PayloadAction<IService>
) {
  state.currentService = action.payload;
}

const ServicesReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(ServicesActions.getServices.success, getServicesSuccess)
    .addCase(ServicesActions.selectService.request, selectService)
);

export default ServicesReducer;
