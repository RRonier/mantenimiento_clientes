import axios from "axios";

export const API = axios.create({
    baseURL: "https://209.105.239.29/PruebaReactJs/Api",
    responseType: "json",
});
