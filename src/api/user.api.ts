import { UserLogin } from "../types";
import httpClient from "./httpClient";

const END_POINT = "/User";

const login = async (loginForm: UserLogin) =>
  httpClient.post(`${END_POINT}/Login`, loginForm);

export { login };
