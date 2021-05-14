import { createAction } from "@reduxjs/toolkit";

export function generateActions<P = void, S = void, F = any>(
  actionName: string
) {
  const requestName = `${actionName}_REQUEST`;
  const successName = `${actionName}_SUCCESS`;
  const failedName = `${actionName}_FAILED`;
  const request = createAction<P>(requestName);
  const success = createAction<S>(successName);
  const failed = createAction<F>(failedName);
  return {
    request,
    success,
    failed,
    actionName,
    failedName,
    successName,
    requestName,
  };
}
export function generateLocalAction<P = void>(actionName: string) {
  const request = createAction<P>("LOCAL/" + actionName);
  return {
    request,
    actionName,
  };
}
