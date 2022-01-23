import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LnmiitLogo from "../../assets/lnmiit_logo-01.png";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://lnmiit.ac.in/">
        The LNMIIT, Jaipur | Virtual Labs
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  var userDict = {
    username: "",
    passwd: "",
  };

  const [user, setUser] = useState(userDict);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8001/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ ...user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) navigate("/", { replace: true });
      });
  };

  const { googleLogin } = useContext(AuthContext);

  return (
    <Container component="main" maxWidth="xs" style={{ height: "100%" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src={LnmiitLogo}
          style={{ width: "16em", marginBottom: "1em" }}
        ></img>
        <Typography component="h1" variant="h4">
          Virtual Labs
        </Typography>
        <form
          style={{ paddingBottom: "100px" }}
          className={classes.form}
          onSubmit={submit}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="user[username]"
            autoComplete="email"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="user[password]"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setUser({ ...user, passwd: e.target.value })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={googleLogin}
          onFailure={() => {
            alert("Sign in failed!");
          }}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
