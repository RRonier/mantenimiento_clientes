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
import PersonIcon from "@mui/icons-material/Person";
import { grey } from "@mui/material/colors";
import CustomDatePicker from "../components/CustomDatePicker";
import { getInteresList } from "../services/interes.service"
import { addClient, getClient, updateClient } from '../services/client.service';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { AuthContext } from '../context/auth.context';
import { enqueueSnackbar } from 'notistack';
import ProfileImage from "../components/ProfileImage"

export const MantenimientoClientes = () => {
    const [interestsList, setInterestsList] = useState([])
    const navigate = useNavigate();
    const params = useParams()
    const { user, profileImage } = useContext(AuthContext)

    const [formValues, setFormValues] = useState({
        nombre: "",
        apellidos: "",
        identificacion: "",
        celular: "",
        otroTelefono: "",
        direccion: "",
        fNacimiento: "",
        fAfiliacion: "",
        sexo: "",
        resennaPersonal: "",
        interesFK: "",
        usuarioId: user.id
    })

    const handleForm = (event) => {
        let { name, value } = event.target
        setFormValues((state) => ({
            ...state,
            [name]: value,
        }))
    }

    const createUser = async () => {
        try {
            await addClient(
                {
                    ...formValues,
                    fNacimiento: dayjs(formValues.fNacimiento).toISOString(),
                    fAfiliacion: dayjs(formValues.fAfiliacion).toISOString(),
                    imagen: "string"
                })
            navigate("/dashboard/consulta")
            enqueueSnackbar('Cliente agregado con exito', { variant: 'success' })
        } catch (err) {
            enqueueSnackbar('Ha habido un problema con su peticion', { variant: 'error' })
        }
    }
    const onBDateChange = (newValue) => {
        setFormValues((state) => ({
            ...state,
            fNacimiento: dayjs(newValue.$d),
        }))
    }
    const onADateChange = (newValue) => {
        setFormValues((state) => ({
            ...state,
            fAfiliacion: dayjs(newValue.$d)
        }))
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
            setFormValues({
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
                ...formValues,
                id: params.id,
                interesFK: formValues.interesFK,
                usuarioId: user.id
            })
            console.log({ ...formValues, id: params.id })
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

    // const formik = useFormik({
    //     initialValues: {
    //         username: '',
    //         password: '',
    //         submit: null
    //     },
    //     validationSchema: Yup.object({
    //         username: Yup
    //             .string()
    //             .max(255)
    //             .required('El usuario es obligatorio'),
    //         password: Yup
    //             .string()
    //             .max(255)
    //             .required('La contraseña es obligatoria')
    //     }),
    //     onSubmit: async (values, helpers) => {
    //         try {
    //             // let { data } = await loginService(values.username, values.password);
    //             navigate('/dashboard/welcome');
    //             localStorage.setItem('username', data.username)
    //             localStorage.setItem('userid', data.userid)
    //             localStorage.setItem('token', data.token)
    //             localStorage.setItem('expiration', data.expiration)
    //         } catch (err) {
    //             helpers.setStatus({ success: false });
    //             helpers.setErrors({ submit: err.message });
    //             helpers.setSubmitting(false);
    //         }
    //     }
    // });

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
                            onClick={params.id ? updateUserData : createUser}
                        />
                        <CustomButton
                            variant="contained"
                            startIcon={<KeyboardBackspaceIcon />}
                            label="Regresar"
                            onClick={() => navigate("/dashboard/welcome")}
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
                        label="Identificacion"
                        variant="outlined"
                        name='identificacion'
                        value={formValues.identificacion}
                        onChange={handleForm}
                    />
                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Nombre"
                        name='nombre'
                        variant="outlined"
                        sx={{
                            marginRight: 5,
                        }}
                        value={formValues.nombre}
                        onChange={handleForm}
                    />
                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Apellidos"
                        name='apellidos'
                        variant="outlined"
                        value={formValues.apellidos}
                        onChange={handleForm}
                    />
                    <FormControl sx={{ minWidth: 245 }}>
                        <InputLabel id="demo-simple-select-helper-label">Genero *</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Genero"
                            name='sexo'
                            value={formValues.sexo}
                            onChange={handleForm}
                        >
                            <MenuItem value="">
                                <em>Seleccione</em>
                            </MenuItem>
                            <MenuItem value={'F'}>F</MenuItem>
                            <MenuItem value={'M'}>M</MenuItem>
                        </Select>
                    </FormControl>
                    <CustomDatePicker
                        label="Fecha de nacimiento"
                        value={formValues.fNacimiento}
                        onChange={onBDateChange}
                    />
                    <CustomDatePicker
                        label="Fecha de afiliacion"
                        value={formValues.fAfiliacion}
                        onChange={onADateChange}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Telefono Celular"
                        name='celular'
                        variant="outlined"
                        value={formValues.celular}
                        onChange={handleForm}
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
                        value={formValues.otroTelefono}
                        onChange={handleForm}
                    />
                    <FormControl sx={{ minWidth: 245 }}>
                        <InputLabel id="demo-simple-select-helper-label">Interes *</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Intereses"
                            name="interesFK"
                            value={formValues.interesFK}
                            onChange={handleForm}
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
                        value={formValues.direccion}
                        onChange={handleForm}
                    />
                    < TextField
                        id="outlined-required"
                        label="Reseña"
                        name="resennaPersonal"
                        variant="outlined"
                        value={formValues.resennaPersonal}
                        onChange={handleForm}
                    />
                </div>
            </Paper>
        </Container >
    );
};
