import axios from "axios";

const LOCAL_API = "http://localhost:5000";
const configuredApi = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = (
  import.meta.env.MODE === "development" ? LOCAL_API : configuredApi
)?.replace(/\/$/, "");

export const submitLead = (data) => {
  return axios.post(`${API_BASE_URL}/api/leads`, data);
};
