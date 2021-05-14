import { ReduxHelper } from "helpers";
import { IService } from "models/IServices";
import { IServicesRequest } from "./interfaces";

const prefix = "SERVICES";

const getServices = ReduxHelper.generateActions<IServicesRequest, IService[]>(
  `${prefix}/GET_SERVICES`
);

const selectService = ReduxHelper.generateLocalAction<IService>(
  `${prefix}/SELECT_SERVICE`
);

export { getServices, selectService };
