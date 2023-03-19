import * as Yup from 'yup';

export const mantainanceFormValidator = Yup.object({
    nombre: Yup
        .string()
        .max(30)
        .required('El campo es obligatorio'),
    apellidos: Yup
        .string()
        .max(100)
        .required('El campo es obligatorio'),
    identificacion: Yup
        .string()
        .max(100)
        .required('El campo es obligatorio'),
    sexo: Yup
        .string()
        .max(1)
        .required('El campo es obligatorio'),
    fNacimiento: Yup
        .string()
        .required('El campo es obligatorio'),
    direccion: Yup
        .string()
        .max(100)
        .required('El campo es obligatorio'),
    resennaPersonal: Yup
        .string()
        .max(255)
        .required('El campo es obligatorio'),
    celular: Yup
        .string()
        .max(15)
        .required('El campo es obligatorio'),
    otroTelefono: Yup
        .string()
        .max(15)
        .required('El campo es obligatorio'),
    interesFK: Yup
        .string()
        .required('El campo es requerido')
})

export const loginFormValidator = Yup.object({
    username: Yup
        .string()
        .max(255)
        .required('El usuario es obligatorio'),
    password: Yup
        .string()
        .max(255)
        .required('La contraseña es obligatoria')
})

export const registerFormValidator = Yup.object({
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
})

export const findClientsFormValidator = Yup.object({
    nombre: Yup
        .string()
        .max(30)
        .required('El campo es requerido'),
    identificacion: Yup
        .string()
        .max(50)
        .required('El campo es requerido')
})