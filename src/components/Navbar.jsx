import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ user, logout }) => {
    // const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => { }

    const handleLogout = () => {
        logout();
        navigate("/")
    };
    return (
        <AppBar
            position="relative"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    COMPANIA PRUEBA
                </Typography>
                {user && (
                    <div style={{ display: 'flex' }}>
                        <p variant="h6" component="p">
                            {user}
                        </p>
                        <IconButton
                            size="medium"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleLogout}
                            color="inherit"
                        >
                            <LogoutRoundedIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}