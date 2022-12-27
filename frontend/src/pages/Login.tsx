import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";

const customRed = "rgb(180,40,40)";

const theme = createTheme({
  status: {
    danger: "rgb(200,25,25)",
  },
  palette: {
    primary: {
      main: customRed,
      darker: "#053e85",
    },
    secondary: {
      main: "rgb(255,255,255)",
      darker: "rgb(255,255,255)",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const Login = (props: any) => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        navigate("../" + response.data);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveNavBar />
      <div>
        <div
          className="grad"
          style={{
            minHeight: "100vh",
            display: "flex",
          }}
        >
          <Stack
            marginLeft={"auto"}
            marginRight={"auto"}
            marginTop={"auto"}
            marginBottom={"auto"}
            spacing={1}
          >
            <img
              style={{
                width: 90,
                height: 120,
                marginRight: "auto",
                marginLeft: "auto",
              }}
              src={"../AlienwareLogo.png"}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 1000,
                fontSize: 60,
                letterSpacing: ".4rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Alien Learning
            </Typography>
            <div
              style={{
                backgroundColor: "rgb(175,175,175)",
                border: "solid 1.5px",
                borderRadius: "1rem",
                width: "30rem",
                height: "35rem",
                marginLeft: "auto",
                marginRight: "auto",
                paddingTop: "5.5rem",
                padding: "3rem",
                boxShadow: "2px 2px 2px 2px rgb(70,70,70)",
              }}
            >
              <Stack
                marginLeft={"auto"}
                marginRight={"auto"}
                marginTop={"auto"}
                marginBottom={"auto"}
                style={{ width: "20rem" }}
                spacing={4}
              >
                <h2
                  style={{
                    textAlign: "center",
                    textShadow: "2px 2px rgb(200,200,200)",
                  }}
                >
                  Login
                </h2>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                ></TextField>
                <Link to="/reset-password">Forgot Password</Link>
                <Button variant="contained" onClick={handleSubmit}>
                  Login
                </Button>
              </Stack>
            </div>
          </Stack>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Login;
