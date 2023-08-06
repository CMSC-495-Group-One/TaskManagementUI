import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Badge,
    Container,
    Grid,
    Paper,
    Link,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { mainListItems } from './listItems';
import Modal from './modals';
import Cards from './cards';
import TaskService from '../../services/TaskService';
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import { groupBy } from 'lodash';
import UserService from '../../services/UserService';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/CMSC-495-Group-One/TaskManagementUI.gi">
                Git Repo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

export default function Tasks() {
    const classes = useStyles();
    const { signIn, user } = useAuth();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksData = await TaskService.getTasks();
                setTasks(tasksData);  // fetched tasks not grouped yet
                console.log('All tasks NOT grouped:', tasksData);
                console.log('DueDate?', setDueDate());

                const listUsers = await UserService.getUsers();
                console.log('All users:', listUsers);
            } catch (error) {
                console.error('Error getting all tasks:', error);
            }
        };
        fetchData();
    }, []);

    // All possible task statuses
    const possibleStatuses = ['TO_DO', 'IN_PROGRESS', 'REVIEW', 'DONE']; 

    // Initialize tasksByStatus object with empty arrays for all possible statuses
    const initialTasksByStatus = possibleStatuses.reduce((acc, status) => {
        acc[status] = [];
        return acc;
    }, {});    
    
    // Use lodash to group tasks by status
    const groupedTasks = groupBy(tasks, 'status');

    // Merge grouped tasks with the initialTasksByStatus to ensure all swimlanes are shown
    const tasksByStatus = { ...initialTasksByStatus, ...groupedTasks };    
    
    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleProfileOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleProfileClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.clear();
        navigate("/sign-in");
      };

    const [showModal, setShowModal] = useState(false);
    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        // Clear the input fields after clicking Cancel button
        setTitle('');
        setDescription('');
        setDifficulty('');
        setStatus('');
    };

    // State to store the task data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [status, setStatus] = useState('');

    // For now, auto set dueDate to 1 week from creation
    const setDueDate = () => {
        const currentDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(currentDate.getDate() + 7);
        return dueDate;
    };

    const handleCreateTask = async () => {
        //If not authenticated send to sign-in page
        !user && navigate("/sign-in");
        // console.log({ user });

        // If user is authenticated create JSON object in the shape of TaskDto.java
        const taskDto = {
            userId: user?.userId,
            title: title,
            description: description,
            difficulty: difficulty,
            status: status,
            dueDate: setDueDate()
        };

        // Send the POST request to backend endpoint using TaskService and close modal
        try {
            const createdTask = await TaskService.createTask(taskDto);
            console.log('Created Task:', createdTask);
            setShowModal(false);

            // Clear the input fields after successful task creation
            setTitle('');
            setDescription('');
            setDifficulty('');
            setStatus('');

            // Refresh page after user publishes task
            window.location.reload();

        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
                        Task Management Board
                    </Typography>
                    <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleProfileOpen}>
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleProfileClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
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
                <List>{mainListItems}</List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Add Task
                </Button>

                <Dialog open={showModal} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <Modal
                        title={title}
                        description={description}
                        difficulty={difficulty}
                        status={status}
                        onTitleChange={(e) => setTitle(e.target.value)}
                        onDescriptionChange={(e) => setDescription(e.target.value)}
                        onDifficultyChange={(e) => setDifficulty(e.target.value)}
                        onStatusChange={(e) => setStatus(e.target.value)}
                        fieldDisabled={false}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleCreateTask} color="primary">
                            Publish
                        </Button>
                    </DialogActions>
                </Dialog>

                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={6}>
                                {/* Iterate over all possible statuses and display them */}
                                {possibleStatuses.map((status) => (
                                    <Grid key={status} item xs={3}>
                                        <Typography>{status}</Typography>
                                        <Paper className={classes.paper}>
                                            <List>
                                                {/* Render each task in the current status group */}
                                                {tasksByStatus[status].map((task) => (
                                                    <Cards key={task.id} task={task} currId={user.userId} />
                                                ))}
                                            </List>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </Box>
    );
}