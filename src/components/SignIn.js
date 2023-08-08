import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, makeStyles, Typography } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";

//Styling
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/CMSC-495-Group-One/TaskManagementUI.git">
                Git Repo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignInForm() {

    //Remove the access token from localStorage
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
        }
    }, []);

    const classes = useStyles();
    const formMethods = useForm();
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = formMethods;

    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError(null);
        try {
            await signIn(data);
            setIsLoading(false);
            navigate("/tasks");
        } catch (error) {
            setIsLoading(false);
            console.error('Error signing up:', error.response.data.message);
            // handle error, e.g. show a message to the user
            if (error.response.data.message.includes('Bad credentials')) {
                setLoginError("Invalid Username or Password");
            } else {
                setLoginError(error.response.data.message);
            }
        }
    };

    // Show/Hide password by clicking on the eye icon in the password field
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* Show user login error */}
                            {loginError && <Alert severity="error">{loginError}</Alert>}
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                name="username"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Username is required.',
                                }}
                                autoComplete="email"
                                label="Username"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                name="password"
                                label="Password"
                                control={control}
                                type={showPassword ? "text" : "password"}
                                //Show and hide password
                                InputProps={
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
