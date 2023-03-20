import { useEffect, useState, useContext } from 'react'
import { useFormik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { CustomButton } from "../components/CustomButton";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CustomDatePicker from "../components/CustomDatePicker";
import { getInteresList } from "../services/interes.service"
import { addClient, getClient, updateClient } from '../services/client.service';
import dayjs from 'dayjs';
import { AuthContext } from '../context/auth.context';
import { enqueueSnackbar } from 'notistack';
import ProfileImage from "../components/ProfileImage"
import { mantainanceFormValidator } from '../validations/validators';

export const MantenimientoClientes = () => {
    const [interestsList, setInterestsList] = useState([])
    const navigate = useNavigate();
    const params = useParams()
    const { user, profileImage } = useContext(AuthContext)

    const createUser = async () => {
        try {
            await addClient(
                {
                    ...formik.values,
                    fNacimiento: dayjs(formik.values.fNacimiento).toISOString(),
                    fAfiliacion: dayjs(formik.values.fAfiliacion).toISOString(),
                    imagen: "string"
                })
            navigate("/dashboard/consulta")
            enqueueSnackbar('Cliente agregado con exito', { variant: 'success' })
        } catch (err) {
            enqueueSnackbar('Ha habido un problema con su peticion', { variant: 'error' })
        }
    }

    const getInterestsList = async () => {
        try {
            let interestsList = await getInteresList()
            setInterestsList(interestsList.data)
        } catch (err) {
            enqueueSnackbar('Ha habido un problema con su peticion', { variant: 'error' })
        }
    }

    const getUserData = async () => {
        try {
            let clientData = await getClient(params.id)
            let fNacimiento = dayjs(clientData.data.fNacimiento).format('YYYY-MM-DD')
            let fAfiliacion = dayjs(clientData.data.fAfiliacion).format('YYYY-MM-DD')
            formik.setValues({
                ...clientData.data,
                celular: clientData.data.telefonoCelular,
                resennaPersonal: clientData.data.resenaPersonal,
                interesFK: clientData.data.interesesId,
                fNacimiento: dayjs(fNacimiento),
                fAfiliacion: dayjs(fAfiliacion),
                usuarioId: user.id
            })
        } catch (err) {
            enqueueSnackbar('Ha habido un problema con su peticion', { variant: 'error' })
        }
    }

    const updateUserData = async () => {
        try {
            await updateClient({
                ...formik.values,
                id: params.id,
                interesFK: formik.values.interesFK,
                usuarioId: user.id
            })
            enqueueSnackbar('Usuario actualizado correctamente', { variant: 'success' })
            navigate(-1)
        } catch (err) {
            enqueueSnackbar('Ha habido un problema con su peticion de actualizar', { variant: 'error' })
        }
    }

    useEffect(() => {
        getInterestsList()
        if (params.id) {
            getUserData()
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellidos: "",
            identificacion: "",
            celular: "",
            otroTelefono: "",
            fNacimiento: "",
            fAfiliacion: "",
            sexo: "",
            direccion: "",
            resennaPersonal: "",
            interesFK: "",
            usuarioId: user.id,
            submit: null
        },
        validationSchema: mantainanceFormValidator,
        validateOnChange: false,
        onSubmit: async () => { params.id ? await updateUserData() : await createUser() }
    });

    const onBDateChange = (newValue) => {
        formik.setValues((state) => ({
            ...state,
            fNacimiento: dayjs(newValue.$d),
        }))
    }
    const onADateChange = (newValue) => {
        formik.setValues((state) => ({
            ...state,
            fAfiliacion: dayjs(newValue.$d)
        }))
    }

    return (
        <Container>
            <Paper
                elevation={1}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: "90%",
                    height: "fit-content",
                    marginTop: 3,
                }}
            >
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <ProfileImage image={profileImage} />
                            <Typography variant="h6" sx={{ marginLeft: 1 }}>Mantenimiento de clientes</Typography>
                        </div>
                        <div>
                            <CustomButton
                                sx={{
                                    marginRight: 2,
                                }}
                                variant="contained"
                                startIcon={<SaveIcon />}
                                label="Guardar"
                                type="submit"
                            />
                            <CustomButton
                                variant="contained"
                                startIcon={<KeyboardBackspaceIcon />}
                                label="Regresar"
                                onClick={() => navigate("/dashboard/consulta")}
                            />
                        </div>
                    </div>
                    <Divider />
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gridGap: "1rem",
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 10
                        }}
                    >
                        <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            type="text"
                            label="Identificacion"
                            variant="outlined"
                            name='identificacion'
                            error={!!(formik.touched.identificacion && formik.errors.identificacion)}
                            helperText={formik.touched.identificacion && formik.errors.identificacion}
                            value={formik.values.identificacion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            type="text"
                            variant="outlined"
                            sx={{
                                marginRight: 5,
                            }}
                            label="Nombre"
                            name='nombre'
                            error={!!(formik.touched.nombre && formik.errors.nombre)}
                            helperText={formik.touched.nombre && formik.errors.nombre}
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            id="outlined-required"
                            label="Apellidos"
                            name='apellidos'
                            variant="outlined"
                            error={!!(formik.touched.apellidos && formik.errors.apellidos)}
                            helperText={formik.touched.apellidos && formik.errors.apellidos}
                            value={formik.values.apellidos}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormControl sx={{ minWidth: 245 }}>
                            <InputLabel id="demo-simple-select-helper-label">Genero</InputLabel>
                            <Select
                                fullWidth
                                required
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Genero"
                                name='sexo'
                                error={!!(formik.touched.sexo && formik.errors.sexo)}
                                // helperText={formik.touched.sexo && formik.errors.sexo}
                                value={formik.values.sexo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <MenuItem value="">
                                    <em>Seleccione</em>
                                </MenuItem>
                                <MenuItem value='F'>F</MenuItem>
                                <MenuItem value='M'>M</MenuItem>
                            </Select>
                        </FormControl>
                        <CustomDatePicker
                            label="Fecha de nacimiento"
                            value={formik.values.fNacimiento}
                            onChange={onBDateChange}
                            error={!!(formik.touched.fNacimiento && formik.errors.fNacimiento)}
                            // helperText={formik.touched.fNacimiento && formik.errors.fNacimiento}
                            onBlur={formik.handleBlur}
                        />
                        <CustomDatePicker
                            label="Fecha de afiliacion"
                            value={formik.values.fAfiliacion}
                            onChange={onADateChange}
                            error={!!(formik.touched.fNacimiento && formik.errors.fNacimiento)}
                        // helperText={formik.touched.fNacimiento && formik.errors.fNacimiento}
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Telefono Celular"
                            name='celular'
                            variant="outlined"
                            value={formik.values.celular}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.celular && formik.errors.celular)}
                            helperText={formik.touched.celular && formik.errors.celular}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Telefono Otro"
                            name='otroTelefono'
                            variant="outlined"
                            sx={{
                                marginRight: 5,
                            }}
                            value={formik.values.otroTelefono}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.otroTelefono && formik.errors.otroTelefono)}
                            helperText={formik.touched.otroTelefono && formik.errors.otroTelefono}
                            onBlur={formik.handleBlur}
                        />
                        <FormControl sx={{ minWidth: 245 }}>
                            <InputLabel id="demo-simple-select-helper-label">Interes *</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Intereses"
                                name="interesFK"
                                value={formik.values.interesFK}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="">
                                    <em>Seleccione</em>
                                </MenuItem>

                                {interestsList.map(interest => (
                                    <MenuItem key={interest.id} value={interest.id}>{interest.descripcion}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '8px 15px'
                        }}>
                        <TextField
                            id="outlined-required"
                            label="Direccion"
                            name="direccion"
                            variant="outlined"
                            sx={{
                                marginBottom: "15px"
                            }}
                            error={!!(formik.touched.direccion && formik.errors.direccion)}
                            helperText={formik.touched.direccion && formik.errors.direccion}
                            value={formik.values.direccion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        < TextField
                            id="outlined-required"
                            label="Reseña"
                            name="resennaPersonal"
                            variant="outlined"
                            value={formik.values.resennaPersonal}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.resennaPersonal && formik.errors.resennaPersonal)}
                            helperText={formik.touched.resennaPersonal && formik.errors.resennaPersonal}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                </form>
            </Paper>
        </Container >
    );
};
