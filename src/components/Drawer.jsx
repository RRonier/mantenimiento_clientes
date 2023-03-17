import {
    Typography,
    Toolbar,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Divider,
    Drawer,
    List,
    ListItem,
    Icon
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";

const drawerWidth = 240;

function CustomDrawer({ user }) {
    const navigate = useNavigate()

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <ProfileImage width={200} height={200} />
            </List>
            <Typography sx={{ textAlign: "center" }}>
                {user}
            </Typography>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" sx={{ marginTop: 1 }}>
                    Menu
                </Typography>
            </div>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard/welcome")}>
                        <ListItemIcon>
                            <Icon color="primary">IN</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"Inicio"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard/consulta")}>
                        <ListItemIcon>
                            <Icon color="primary">CC</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"Consulta Clientes"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div >
    );

    return (
        <Drawer
            variant="permanent"
            elevation={0}
            sx={{
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, position: 'relative' },
            }}
            open
        >
            {drawer}
        </Drawer >
    );
}

export default CustomDrawer;
