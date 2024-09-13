import axios from "axios";
import { Config } from "../config/index";

export const backapi = axios.create({
    baseURL: Config.BACK_API,
});
