import Register from '../views/Register';
import Home from '../views/Dashboard';
import { ErrorPage } from '../views/ErrorPage';
import { WelcomePage } from '../views/Welcome';
import { ConsultaClientes } from '../views/ConsultaClientes';
import { MantenimientoClientes } from '../views/MantenimientoClientes';
import { ProtectedRoute } from "./ProtectedRoute"
import App from '../App'

import {
    createBrowserRouter
} from "react-router-dom";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <Home />,
        children: [
            {
                path: "welcome",
                element: <ProtectedRoute>
                    <WelcomePage />
                </ProtectedRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "consulta",
                element: <ProtectedRoute>
                    <ConsultaClientes />
                </ProtectedRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "mantenimiento",
                element: <ProtectedRoute>
                    <MantenimientoClientes />
                </ProtectedRoute >,
                errorElement: <ErrorPage />,
            },
        ]
    },
]);
