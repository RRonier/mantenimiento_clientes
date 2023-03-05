import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    FormHelperText,
    Link,
    Stack,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox
} from '@mui/material';

import { useNavigate } from 'react-router-dom'

import { login } from '../services/auth.service';

const Login = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(255)
                .required('El usuario es obligatorio'),
            password: Yup
                .string()
                .max(255)
                .required('La contraseña es obligatoria')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await login(values.username, values.password);
                navigate('/home');
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 450,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Typography variant="h5">
                                Iniciar Sesión
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    error={!!(formik.touched.username && formik.errors.username)}
                                    fullWidth
                                    helperText={formik.touched.username && formik.errors.username}
                                    label="Usuario *"
                                    name="username"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.username}
                                />
                                <TextField
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Contraseña *"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                />
                            </Stack>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel labelPlacement="end" control={<Checkbox defaultChecked />} label="Recuérdame" />
                            </Box>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{ mt: 3 }}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 1, mb: 2 }}
                                type="submit"
                                variant="contained"
                            >
                                Iniciar Sesion
                            </Button>
                            <Stack
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <Typography
                                    color="primary"
                                    variant="body1"
                                >
                                    No tiene una cuenta?
                                </Typography>
                                <Link
                                    href="/register"
                                    underline="hover"
                                    variant="body1"
                                >
                                    Regístrese
                                </Link>
                            </Stack>
                        </form>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Login;
