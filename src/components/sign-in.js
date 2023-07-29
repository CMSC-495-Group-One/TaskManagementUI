import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useAuth} from "../context";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputField from "./InputField";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {IconButton, InputAdornment} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import {Alert} from "@material-ui/lab";

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
            <Link color="inherit" href="https://github.com/CMSC-495-Group-One">
                {/* Your Website */}
                Git Repo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignInForm() {
    const classes = useStyles();
        const formMethods = useForm();
        const { signIn } = useAuth();
        const navigate = useNavigate();

        const {
            control,
            register,
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
                // handle error, e.g. show a message to the user
                setLoginError("Invalid username or password.");
            }
        };

    // Error Message Div:
    const errorDiv =loginError
        ? <Alert severity="error">{loginError}</Alert>
        : '';

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>{errorDiv}</Grid>
                        <Grid item xs={12}>
                            <InputField
                                {...register("username")}
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
                            <TextField
                                {...register("password")}
                                name="password"
                                label="Password"
                                control={control}
                                defaultValue=""
                                required
                                fullWidth
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
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
                <Copyright/>
            </Box>
        </Container>
    );
}
