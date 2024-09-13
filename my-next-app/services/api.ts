import axios from "axios";
import { Config } from "../config/index";

export const api = axios.create({
  baseURL: Config.API_URL,
});
