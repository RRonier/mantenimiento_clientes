import Register from '../views/Register';
import Home from '../views/Dashboard';
import { ErrorPage } from '../views/ErrorPage';
import { WelcomePage } from '../views/Welcome';
import { ConsultaClientes } from '../views/ConsultaClientes';
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
                element: <WelcomePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "consulta",
                element: <ConsultaClientes />,
                errorElement: <ErrorPage />,
            },
        ]
    },
]);
