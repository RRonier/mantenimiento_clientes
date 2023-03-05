import { API } from "../utils/api";

export const login = (username, password) =>
    API.post("/api/Authenticate/login", { username, password });

export const signUp = (username, email, password) =>
    API.post("/api/Authenticate/register", { username, email, password });
