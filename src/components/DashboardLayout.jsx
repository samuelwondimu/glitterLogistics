import * as React from 'react';
import { styled } from '@mui/material/styles';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { blueGrey } from '@mui/material/colors'
import { Link, Outlet } from 'react-router-dom';
import { navList } from './navList';
import { Avatar, Button, Menu, MenuItem, Paper, Tooltip, useTheme } from '@mui/material';
import { useAuth } from '../App';
import { LogoutOutlined } from '@mui/icons-material';
import { useToggleTheme } from '../theme/useTheme';

const drawerWidth = 240;

function Copyright(props) {
    return (

        <Typography variant="body1" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <a href="https://glitterlogstics.com/" style={{ color: 'inherit' }}>
                Glitter Logistics and Trading PLC
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>

    );
}

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        // background: "#333",
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);



export default function DashboardLayout() {
    let auth = useAuth();
    const theme = useTheme();
    const changeTheme = useToggleTheme();
    const [open, setOpen] = React.useState(true);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} elevation={0}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Glitter Logistics and Trading PLC
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            sx={{ ml: 1 }}
                            onClick={changeTheme.toggleColorMode}
                            color="inherit"
                        >
                            {theme.palette.mode === "dark" ? (
                                <Brightness7Icon />
                            ) : (
                                <Brightness4Icon />
                            )}
                        </IconButton>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Box alignItems={"center"}>
                                <MenuItem>
                                    <Avatar src={`R`} sx={{ mr: 1 }} />
                                    <Typography color="GrayText" >
                                        <b>glitter admin</b> <br />
                                        admin@glitter.com
                                    </Typography>
                                </MenuItem>
                                <Divider />

                                <MenuItem component={Button} fullWidth onClick={() => { handleCloseUserMenu(); auth.signout() }} >
                                    <LogoutOutlined sx={{ mr: 2 }} />
                                    <Typography textAlign="center" sx={{ textTransform: 'none' }}>Logout</Typography>
                                </MenuItem>

                            </Box>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} PaperProps={{
                sx: {
                    backgroundColor: theme.palette.mode === "dark" ? blueGrey[900] : blueGrey[50],
                }
            }}>
                <DrawerHeader>

                </DrawerHeader>
                <List>
                    {navList.map((navItem, index) => (
                        <ListItem button component={Link} to={navItem.path} key={navItem.path}>
                            <ListItemIcon>
                                {navItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={navItem.title} />
                        </ListItem>
                    ))}
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.mode === "dark" ? blueGrey[800] : blueGrey[100], minHeight: '100vh' }}>
                <DrawerHeader />
                <Outlet />
                <Box pt={3} />
                <Copyright />
            </Box>
        </Box>
    );
}