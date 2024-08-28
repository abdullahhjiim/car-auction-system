import axios from "axios";

// Base Url
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const authAxios = axios.create({
  baseURL: `${baseUrl}`,
});

export { authAxios };
