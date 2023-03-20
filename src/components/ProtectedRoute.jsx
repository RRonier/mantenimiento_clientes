import { Navigate, useNavigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()

    if (!!localStorage.getItem('username')) {
        return children
    }
    return <Navigate to="/" replace />
}