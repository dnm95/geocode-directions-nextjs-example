import axios from "axios";
import isEmpty from "lodash/isEmpty";
import config from "../config";

const BASE_URL = `${config.API_URI}/`;

const MakeHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return { ...headers };
};

const AxiosInstance = (cfg = {}) => {
  const axiosConfig = {
    baseURL: BASE_URL,
    timeout: 1000 * 35,
    responseType: "json",
    headers: MakeHeaders(),
    transformResponse: [
      (response) => (typeof response === "string" ? JSON.parse(response) : response),
    ],
    ...cfg,
  };
  
  return axios.create(axiosConfig);
};

function makeError(err, message) {
  const error = new Error(message);
  error.type = "error";
  error.statusCode = err.statusCode;
  return error;
}

function responseParser(response) {
  return response.data;
}

const errorParser = (err) => {
  let error = err;
  if (err.response && err.response.data) {

    error = err.response.data.error || {};
    error.statusCode = err.response.status;
    const message = "Ocurrio un error";
    throw makeError(error, message);
  }
  throw error;
};

const AxiosDispatchResponse = (cls, verb, params) => {
  const { body, qs } = params || {};
  const self = cls;
  let parameters = {};

  if (!body && !qs && !isEmpty(params)) {
    parameters.data = params;
  } else if (body) {
    parameters = body;
  } else if (qs) {
    parameters.params = qs;
  }

  if (self.accessToken) {
    self.axios_instance.defaults.headers.common.Token = self.accessToken;
  } else {
    delete self.axios_instance.defaults.headers.common.Token;
  }

  return self.axios_instance[verb](
    self.resource,
    parameters,
  )
    .then(responseParser)
    .catch(errorParser);
};

class ApiRequest {
  constructor() {
    this.resource = null;
    this.accessToken = null;
    this.axios_instance = AxiosInstance();

    this.get = this.get.bind(this);
    this.put = this.put.bind(this);
    this.post = this.post.bind(this);
    this.delete = this.delete.bind(this);
  }

  get(params) {
    return AxiosDispatchResponse(this, "get", params);
  }

  put(params) {
    return AxiosDispatchResponse(this, "put", params);
  }

  post(params) {
    return AxiosDispatchResponse(this, "post", params);
  }

  delete(params) {
    return AxiosDispatchResponse(this, "delete", params);
  }
}

let service = null;
const api = (() => {
  if (service) return service;
  service = new ApiRequest();
  return service;
})();

export default api;
