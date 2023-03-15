import { Navigate } from "react-router-dom"
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

export const ProtectedRoute = ({ children }) => {
    const { isLogged } = useContext(AuthContext)
    if (!isLogged) {
        return <Navigate to="/" replace />
    }
    return children
}