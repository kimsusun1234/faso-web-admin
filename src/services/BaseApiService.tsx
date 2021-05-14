import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import * as qs from "qs";
import { STATUS_CODE } from "./statusCode";
import _ from "lodash";
import configureStore from "redux/configuration/configureStore";

interface IApiResponse<T> {
  data?: T;
  errors?: any;
  failed: boolean;
  message: {
    code?: number;
    text?: string;
  };
  succeeded: boolean;
}

const API_CONFIG = {
  // returnRejectedPromiseOnError: true,
  // withCredentials: true,
  timeout: 30000,
  baseURL: process.env.REACT_APP_STAGING_API,
  paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
  headers: {
    common: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Pragma: "no-cache",
      Accept: "application/json",
    },
  },
};

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const store = configureStore().store;
    const token = store.getState().AppConfigReducer.token;
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    throw new Error(error);
  }
};
const injectVersion = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const version = 1;
    config.baseURL = config.baseURL + `/v${version}`;
    return config;
  } catch (error) {
    throw new Error(error);
  }
};
export abstract class BaseApiService {
  private instance: AxiosInstance;

  constructor(needVersion = true) {
    this.instance = this.initHttp(needVersion);
  }

  initHttp(needVersion: boolean) {
    const http = axios.create(API_CONFIG);
    if (needVersion) {
      http.interceptors.request.use(injectVersion);
    }
    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );
    http.interceptors.response.use(this._logResponse);
    return http;
  }

  protected _handleError = (error: AxiosError) => {
    console.log("error", error.response);
    Promise.resolve(error);
  };

  private _logResponse(response: AxiosResponse): AxiosResponse {
    console.info(`[response]`, response);
    return response;
  }

  private _handleResponse<T = void>(
    response: AxiosResponse<IApiResponse<T>>
  ): IApiResponse<T> {
    return response.data;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IApiResponse<T>> {
    const response = await this.instance.get(url, config);
    return this._handleResponse<T>(response);
  }
  public async post<P = void, T = void>(
    url: string,
    data?: P,
    config?: AxiosRequestConfig
  ): Promise<IApiResponse<T>> {
    const response = await this.instance.post(url, data, config);

    return this._handleResponse<T>(response);
  }

  public async put<P = void, T = void>(
    url: string,
    data?: P,
    config?: AxiosRequestConfig
  ): Promise<IApiResponse<T>> {
    const response = await this.instance.put(url, data, config);

    return this._handleResponse<T>(response);
  }

  public async delete<T = void>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IApiResponse<T>> {
    const response = await this.instance.delete(url, config);

    return this._handleResponse<T>(response);
  }
}
