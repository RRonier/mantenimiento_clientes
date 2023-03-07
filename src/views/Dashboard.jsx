import Drawer from "../components/Drawer"
import { Navbar } from '../components/Navbar';
import {
    Outlet,
} from 'react-router-dom';

export default function Home() {


    return (
        <div>
            <Navbar />
            <div style={{
                display: 'flex',
                width: '100%'
            }}>
                <Drawer />
                <Outlet />
            </div>
        </div>
    );
}