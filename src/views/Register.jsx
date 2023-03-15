import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { signUpService } from '../services/auth.service';

const Register = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('El correo debe ser valido')
                .max(255)
                .required('El correo es obligatorio'),
            username: Yup
                .string()
                .max(255)
                .required('El nombre es obligatorio'),
            password: Yup
                .string()
                .max(255)
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{10,}$/,
                    'La contraseña debe tener al menos 10 characteres, una letra minuscula, una letra mayuscula, y un numero'
                )
                .required('La contraseña es obligatoria')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await signUpService(values.username, values.email, values.password)
                console.log({ nombre: values.username, correo: values.email, password: values.password })
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
                                Registro
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
                                    label="Nombre Usuario *"
                                    name="username"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email}
                                    label="Direccion de correo *"
                                    name="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="email"
                                    value={formik.values.email}
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
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Registrarme
                            </Button>
                        </form>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Register;
