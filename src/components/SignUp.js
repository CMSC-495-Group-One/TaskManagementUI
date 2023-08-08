import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputField from './InputField';
import http from '../services/HttpService';
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    makeStyles,
    Typography
} from "@material-ui/core";

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

function isValidEmail(email) {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    // Password validation logic 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/;
    return passwordRegex.test(password);
}

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

export default function SignUp() {

    //Remove the access token from localStorage
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
        }
    }, []);

    const classes = useStyles();
    const { handleSubmit, control, formState: { errors }, getValues } = useForm();

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();
    const onSubmit = async (data) => {

        try {
            // Create JSON object in the shape of SignUpDto.java
            const signUpDto = {
                username: data.email, // Using email as the username for now
                firstname: data.firstName,
                lastname: data.lastName,
                password: data.password,
                email: data.email,
            };

            // Send the POST request to backend endpoint
            const response = await http.post('/auth/signup', signUpDto);
            console.log(response.data);
            setSuccessMessage("User Registered Successfully!");
            setErrorMessage("");

            // Catch username already exists error.
        } catch (error) {
            console.error('Error signing up:', error.response.data.message);
            setErrorMessage(error.response.data.message);
            setSuccessMessage("");

        }
    };

    // Tell user registeration successful and give link to sign in
    const successDiv = successMessage
        ? <Alert
            action={
                <Button color="inherit" size="small"
                    endIcon={<ExitToAppOutlinedIcon />}
                    aria-label="Click to Login"
                    onClick={() => {
                        navigate("/sign-in");
                    }}>
                    Login
                </Button>
            }
        >{successMessage}</Alert>
        : '';

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>{successDiv}</Grid>

                        <Grid item xs={12} sm={6}>
                            <InputField
                                name="firstName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'First Name is required' }}
                                autoComplete="fname"
                                label="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputField
                                name="lastName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Last Name is required' }}
                                autoComplete="lname"
                                label="Last Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Email Address is required',
                                    validate: value => isValidEmail(value) || 'Invalid Email Address',
                                }}
                                autoComplete="email"
                                label="Email Address"
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* Display username already exists error. */}
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Password is required',
                                    validate: value => isValidPassword(value) ||
                                        'Password must be at least 8 characters long' +
                                        ' and contain a lower case, uppercase, number,' +
                                        ' and at least one of these special char @$!%*?&',
                                }}
                                autoComplete="new-password"
                                label="Password"
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Confirm Password is required',
                                    validate: value => value === getValues('password') ||
                                        'Passwords do not match',
                                }}
                                autoComplete="new-password"
                                label="Confirm Password"
                                type="password"
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                Already have an account? Sign in
                            </Link>
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