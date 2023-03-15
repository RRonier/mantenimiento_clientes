
import { createContext, useState } from "react"
import { loginService, signUpService } from "../services/auth.service"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: "",
        id: "",
    });
    const [isLogged, setIsLogged] = useState(false)

    const loginContext = async (username, password) => {
        // setLoginPending(true)
        // setLoginSuccess(false)
        // setLoginError(null)
        try {
            let { data } = await loginService(username, password)
            setUser({ name: data.username, id: data.userid })
            setIsLogged(true)
            localStorage.setItem('username', data.username)
            localStorage.setItem('userid', data.userid)
            localStorage.setItem('token', data.token)
            localStorage.setItem('expiration', data.expiration)
            // setLoginSuccess(true)
        } catch (error) {
            // setLoginError(error)
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
        <AuthContext.Provider value={{ user, loginContext, logout, isLogged }}>
            {children}
        </AuthContext.Provider>
    );
};