import Register from '../views/Register';
import Home from '../views/Dashboard';
import { ErrorPage } from '../views/ErrorPage';
import { WelcomePage } from '../views/Welcome';
import { ConsultaClientes } from '../views/ConsultaClientes';
import { MantenimientoClientes } from '../views/MantenimientoClientes';
import Login from "../views/Login"

import {
    createBrowserRouter, redirect
} from "react-router-dom";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        loader: () => {
            if (localStorage.getItem('username')) {
                throw redirect('/dashboard/welcome')
            }
            return null
        }
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <Home />,
        loader: () => {
            if (!localStorage.getItem('username')) {
                throw redirect('/')
            }
            return null
        },
        children: [
            {
                path: "welcome",
                element: <WelcomePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "consulta",
                element: <ConsultaClientes />,
                errorElement: <ErrorPage />,
            },
            {
                path: "mantenimiento",
                element: <MantenimientoClientes />,
                errorElement: <ErrorPage />,
            },
            {
                path: "edit/:id",
                element: <MantenimientoClientes />,
                errorElement: <ErrorPage />,
            }
        ]
    },
]);
