import { Navigate } from "react-router-dom"
export const checkAuthState = () => {
    const token = localStorage.getItem('token')
    console.log(`I'm being excecuted`)
    if (!token) {
        logout()
    } else {
        // const expirationDate = new Date(localStorage.getItem('expiration'))
        // if (expirationDate <= new Date()) {
        //     logout()
        // } else {
        // setIsLogged(true)
        <Navigate to="/dashboard/welcome" />
    }
}