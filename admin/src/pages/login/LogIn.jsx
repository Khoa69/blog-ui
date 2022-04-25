import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./login.css";

const theme = createTheme();

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const alert = useAlert();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();


        await axios
            .post(
                "http://localhost:4000/api/auth/login",
                {
                    username,
                    password,
                },
                {
                    headers: {
                        accept: "application/json",
                    },
                }
            )
            .then((response) => {
                if (!response.data.roles.includes("ROLE_ADMIN")) {
                    throw Error("Must be admin to login this page");
                } else {
                    // setAdmin(response.data);
                    document.cookie = `doubleKToken=${
                        response.data.accessToken
                    };expires=${new Date().toUTCString()};max-age=${
                        3600 * 24 * 365
                    };Secure`;
                    localStorage.id = response.data.id;
                    localStorage.username = response.data.username;
                    localStorage.email = response.data.email;
                    localStorage.roles = response.data.roles;
                    alert.success(`Welcome back ${response.data.username}`);
                }
            })
            .then(() => navigate("/"))
            .catch((error) => alert.error("Invalid username or password!"));
    };

    return (
        <div className="login">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" className="h-screen">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User name"
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/resetpassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
