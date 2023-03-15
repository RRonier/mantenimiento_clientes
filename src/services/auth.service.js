import { API } from "../utils/api";

export const loginService = (username, password) =>
    API.post("/api/Authenticate/login", { username, password });

export const signUpService = (username, email, password) =>
    API.post("/api/Authenticate/register", { username, email, password });
