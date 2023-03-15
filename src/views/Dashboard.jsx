import Drawer from "../components/Drawer"
import { Navbar } from '../components/Navbar';
import {
    Outlet,
} from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export default function Home() {
    const { user, logout } = useContext(AuthContext)
    return (
        <div>
            <Navbar user={user.name} logout={logout} />
            <div style={{
                display: 'flex',
                width: '100%'
            }}>
                <Drawer user={user.name} />
                <Outlet />
            </div>
        </div>
    );
}