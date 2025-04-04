import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useUser } from "../../utils/components/UserContext.tsx";
import HasRole from "../../utils/components/HasRole.tsx";
import { Avatar, Tooltip } from "@mui/material";

type Props = {
    setDrawerOpen: (open: boolean) => void;
};

export default function ButtonAppBar({ setDrawerOpen }: Readonly<Props>) {
    const { user } = useUser();

    function gitHubOauthLogin() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/oauth2/authorization/github', '_self');
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/logout', '_self');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Links: Menü-Button + App-Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <HasRole>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setDrawerOpen(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </HasRole>

                        <Typography variant="h6" component="div">
                            Checkup Actions App
                        </Typography>
                    </Box>

                    {/* Rechts: User-Infos, Avatar & Login */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {user ? (
                            <>
                                {/* User-Info mit Tooltip für bessere UX */}
                                <Tooltip title={`Role: ${user.role}`} arrow>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="body1">{user.username}</Typography>
                                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                            {user.role}
                                        </Typography>
                                    </Box>
                                </Tooltip>

                                {/* Avatar */}
                                <Avatar src={user.avatarUrl} sx={{ width: 40, height: 40 }} />

                                {/* Logout-Button */}
                                <Button color="inherit" onClick={logout}>Logout</Button>
                            </>
                        ) : (
                            /* GitHub Login Button */
                            <Button
                                color="inherit"
                                onClick={gitHubOauthLogin}
                                startIcon={<GitHubIcon />}
                                variant="outlined"
                                sx={{
                                    color: 'white',
                                    borderColor: '#888',
                                    '&:hover': { borderColor: 'white' },
                                }}
                            >
                                Login with GitHub
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
