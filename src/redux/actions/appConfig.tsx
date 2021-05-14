import { ReduxHelper } from "helpers";

const prefix = "APP_CONFIG";

const showLoading = ReduxHelper.generateLocalAction<boolean>(
  prefix + "/SHOW_LOADING"
);
const showNotification = ReduxHelper.generateLocalAction<boolean>(
  prefix + "/SHOW_NOTIFICATION"
);
const showLanguage = ReduxHelper.generateLocalAction<boolean>(
  prefix + "/SHOW_LANGUAGE"
);
const chooseLanguage = ReduxHelper.generateLocalAction<string>(
  prefix + "/CHOOSE_LANGUAGE"
);

const setToken = ReduxHelper.generateLocalAction<string>(prefix + "/SET_TOKEN");

export {
  showLoading,
  showNotification,
  showLanguage,
  chooseLanguage,
  setToken,
};
