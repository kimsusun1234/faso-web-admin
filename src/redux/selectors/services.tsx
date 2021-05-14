import { RootState } from "redux/configuration/rootReducer";
import { createSelector } from "reselect";

const getAllServices = (state: RootState) => state.ServiceReducer.services;

export const getServicesByCategory = createSelector(
  [getAllServices, (state: RootState, categoryId: string) => categoryId],
  (services, categoryId) => {
    return services.filter(
      (service) => service.item.itemCategoryId === categoryId
    );
  }
);
