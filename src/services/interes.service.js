import { API } from "../utils/api";
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};
export const getInteresList = () => API.get('/api/Intereses/Listado', config)