import axios from "axios";

const createAPIInstance = (baseUrl: string) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

export default createAPIInstance;
