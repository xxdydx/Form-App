import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "/api/sampleforms";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = async (newObject) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return response.data;
};
const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, create, update, remove };
