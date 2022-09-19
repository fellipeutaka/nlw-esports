import axios from "axios";

export const api = axios.create({
  baseURL: "https://fellipeutaka-nlw.vercel.app/api",
});
