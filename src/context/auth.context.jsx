
import { createContext, useState } from "react"
import { loginService } from "../services/auth.service"
import { useSnackbar } from "notistack";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: localStorage.getItem('username'),
        id: localStorage.getItem('userid')
    });
    const [profileImage, setProfileImage] = useState()
    const { enqueueSnackbar } = useSnackbar()
    const [isLogged, setIsLogged] = useState(false)

    const loginContext = async (username, password) => {
        try {
            let { data } = await loginService(username, password)
            setUser({ name: data.username, id: data.userid })
            setIsLogged(true)
            localStorage.setItem('username', data.username)
            localStorage.setItem('userid', data.userid)
            localStorage.setItem('token', data.token)
            localStorage.setItem('expiration', data.expiration)
        } catch (error) {
            enqueueSnackbar("Ha habido un error al intentar iniciar sesion", { variant: 'error' })
        }
    }

    const logout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('userid')
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
        setIsLogged(false)
    };

    return (
        <AuthContext.Provider value={{ user, loginContext, logout, isLogged, profileImage, setProfileImage }}>
            {children}
        </AuthContext.Provider>
    );
};