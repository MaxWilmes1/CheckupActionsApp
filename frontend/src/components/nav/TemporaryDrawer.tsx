import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminOnly from "../../utils/components/AdminOnly.tsx";
import {NavLink} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

type Props = {
    open: boolean;
    setDrawerOpen: (open: boolean) => void;
};

export default function TemporaryDrawer({open, setDrawerOpen}: Readonly<Props>) {
    const toggleDrawer = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{width: 250}} onClick={toggleDrawer(false)}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/checkup-actions">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText>Checkup Actions Dashboard</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            <Divider/>
            <AdminOnly>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/admin/board">
                            <ListItemIcon>
                                <AdminPanelSettingsIcon />
                            </ListItemIcon>
                            <ListItemText>Admin Dashboard</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </AdminOnly>
        </Box>
    );

    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    );
}
