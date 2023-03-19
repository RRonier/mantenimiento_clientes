import { useState } from 'react';
import { Paper, Typography, Divider, TextField, IconButton, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import SearchIcon from '@mui/icons-material/Search';
import Table from "../components/Table"
import { CustomButton } from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { getClient } from '../services/client.service';
import { enqueueSnackbar } from 'notistack';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import { findClientsFormValidator } from '../validations/validators';

export const ConsultaClientes = () => {
    const navigate = useNavigate()
    const [clientData, setClientData] = useState({
        identificacion: '',
        nombre: ''
    })

    const formik = useFormik({
        initialValues: {
            nombre: '',
            identificacion: '',
        },
        validationSchema: findClientsFormValidator,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values, helpers) => {
            formik.validateForm(values)
            setClientData(formik.values)
            formik.setValues(formik.initialValues)
        }
    })

    return (
        <Container>
            <Paper elevation={1} sx={{
                width: '90%',
                height: 'fit-content',
                marginTop: 3,
                paddingLeft: 3,
                paddingRight: 3,
            }}>
                <form noValidate onSubmit={() => formik.handleSubmit()}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: 10,
                        paddingBottom: 10
                    }}>
                        <Typography variant='h6'>Consulta de clientes</Typography>
                        <div>
                            <CustomButton
                                sx={{
                                    marginRight: 2
                                }}
                                variant='contained'
                                startIcon={<AddIcon />}
                                label="Agregar"
                                onClick={() => navigate('/dashboard/mantenimiento')}
                            />
                            <CustomButton
                                variant='contained'
                                startIcon={<KeyboardBackspaceIcon />}
                                label="Regresar"
                                onClick={() => navigate('/dashboard/welcome')}
                            />
                        </div>
                    </div>
                    <Divider />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: 10,
                        paddingBottom: 10,
                    }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Nombre"
                            name="nombre"
                            variant='outlined'
                            fullWidth
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!(formik.touched.nombre && formik.errors.nombre)}
                            helperText={formik.touched.nombre && formik.errors.nombre}
                            sx={{
                                marginRight: 5
                            }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Identificacion"
                            name="identificacion"
                            variant='outlined'
                            fullWidth
                            value={formik.values.identificacion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!(formik.touched.identificacion && formik.errors.identificacion)}
                            helperText={formik.touched.identificacion && formik.errors.identificacion}
                        />
                        <IconButton
                            aria-label="search"
                            onClick={() => formik.handleSubmit()}
                            sx={{ marginLeft: 1 }}
                        >
                            <SearchIcon sx={{
                                border: `1px solid ${grey[500]}`,
                                borderRadius: '50%',
                                padding: '20%'
                            }} />
                        </IconButton>
                    </div>
                </form>
                <Divider />
                <Table clientData={clientData} />
            </Paper >
        </Container >
    )
}