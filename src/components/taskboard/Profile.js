import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    Avatar,
    makeStyles,
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    ListItem,
    Typography,
    Divider,
    Button,
    IconButton,
    Container,
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import EmailIcon from '@material-ui/icons/Email';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { tasksList, profileList } from './listItems';
import { useAuth } from "../../context/AuthProvider";
import UserService from "../../services/UserService";
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        height: 150,
        width: 150,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        height: '75vh',
        width: '28vh',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Profile() {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState([]);
    const { signIn, user } = useAuth();
    const navigate = useNavigate();

    //fetch user data
    useEffect(() => {
        if (user?.userId) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const userData = await UserService.getUserById(user?.userId); ///useAuth().user.userId
            if (userData) {
                setUserInfo(userData);
            } else {
                // Handle error if needed
                console.log("No Data")
            }
        } catch (error) {
            //console.error('Error getting all users:', error);
        }
    };

    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    //generate avatar based user's initials
    const generateAvatarUrl = (firstName, lastName) => {
        const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
        return `https://via.placeholder.com/150?text=${initials}`;
    };

    // Ensure that userInfo is not undefined before using its properties
    const firstName = userInfo?.firstname || "";
    const lastName = userInfo?.lastname || "";
    const avatarUrl = generateAvatarUrl(userInfo?.firstname || "", userInfo?.lastname || "");


    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        User Information
                    </Typography>
                    <Button color="inherit" size="small" variant="outlined"
                            endIcon={<ExitToAppOutlinedIcon/>}
                            aria-label="Log Out"
                            onClick={() => {
                                localStorage.clear();
                                navigate("/sign-in");
                            }}>
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => {
                        navigate("/tasks");
                    }}>
                        {tasksList}
                    </ListItem>
                    <ListItem button onClick={() => {
                        navigate("/profile");
                    }}>
                        {profileList}
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container component="main" maxWidth="xs" variant="outlined">
                    <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ width: 600 }}>
                        <Box mr={2} alignItems="left">
                            <Avatar
                                className={classes.avatar}
                                alt={`${firstName} ${lastName}`}
                                src={avatarUrl}
                            />
                        </Box>
                        <Box alignItems="flex-start">
                            <h2 style={{ textAlign: 'left' }}>{`${userInfo.firstname} ${userInfo.lastname}`}</h2>
                            <p style={{ textAlign: 'left' }}>Username: {userInfo.username}</p>
                            <a href={`mailto:${userInfo.email}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', textAlign: 'left' }}
                               title="Click to send email">
                                 Email: {userInfo.email} <EmailIcon style={{ marginLeft: '5px' }} />
                            </a>
                        </Box>
                    </Box>
                </Container>
            </main>
        </Box>
    );
}