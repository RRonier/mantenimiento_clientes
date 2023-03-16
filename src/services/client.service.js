import { API } from "../utils/api";

const token = localStorage.getItem("token");
const config = {
    headers: { Authorization: `Bearer ${token}` },
};

export const listClients = (identificacion, nombre, usuarioId) =>
    API.post(
        "/api/Cliente/Listado",
        { identificacion, nombre, usuarioId },
        config
    );

export const addClient = ({
    nombre,
    apellidos,
    identificacion,
    celular,
    otroTelefono,
    direccion,
    fNacimiento,
    fAfiliacion,
    sexo,
    resennaPersonal,
    imagen,
    interesFK,
    usuarioId,
}) =>
    API.post("/api/Cliente/Crear", {
        nombre,
        apellidos,
        identificacion,
        celular,
        otroTelefono,
        direccion,
        fNacimiento,
        fAfiliacion,
        sexo,
        resennaPersonal,
        imagen,
        interesFK,
        usuarioId,
    }, config);

export const deleteClient = (IdCliente) => API.delete(`/api/Cliente/Eliminar/${IdCliente}`, config)

export const getClient = (IdCliente) => API.get(`/api/Cliente/Obtener/${IdCliente}`, config)

export const updateClient = ({
    nombre,
    apellidos,
    identificacion,
    celular,
    otroTelefono,
    direccion,
    fNacimiento,
    fAfiliacion,
    sexo,
    resennaPersonal,
    imagen,
    interesFK,
    usuarioId
}) => API.post('/api/Cliente/Actualizar', {
    nombre,
    apellidos,
    identificacion,
    celular,
    otroTelefono,
    direccion,
    fNacimiento,
    fAfiliacion,
    sexo,
    resennaPersonal,
    imagen,
    interesFK,
    usuarioId
}, config)