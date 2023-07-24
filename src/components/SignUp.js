import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

function isValidEmail(email) {
  // Basic email validation regex; we can use more comprehensive one if needed
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  // Password validation logic so far, but we can tweak as needed
//   return password.length >= 8;
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
  const classes = useStyles();
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Additional actions on form submission here
    // placemarker to call our API to chk and save data
    console.log(data);
  };

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
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: 'First Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="fname"
                    // name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    // id="firstName"
                    label="First Name"
                    autoFocus
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="lname"
                    // name="lastName"
                    variant="outlined"
                    required
                    fullWidth
                    // id="lastName"
                    label="Last Name"
                    autoFocus
                  />
                )}
              />
              {/* <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              /> */}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Email Address is required',
                  validate: value => isValidEmail(value) || 'Invalid Email Address',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="email"
                    // name="email"
                    variant="outlined"
                    required
                    fullWidth
                    // id="email"
                    label="Email Address"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Password is required',
                    validate: value => isValidPassword(value) || 
                    'Password must be at least 8 characters long' + 
                    '\n and contain a lower case, uppercase, number,' +
                    '\n and at least one of these special char @$!%*?&',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="current-password"
                    // name="email"
                    variant="outlined"
                    required
                    fullWidth
                    // id="email"
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Confirm Password is required',
                    validate: value => value === control.getValues('password') || 
                    'Passwords do not match',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="current-password"
                    // name="confirmPassword"
                    variant="outlined"
                    required
                    fullWidth
                    // id="confirmPassword"
                    label="Confirm Password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid>            
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
            </Grid> */}
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