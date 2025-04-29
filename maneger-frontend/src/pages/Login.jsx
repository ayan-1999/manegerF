import {
  Box,
  Button,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import loginImg from "../assets/si.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { theme } from "../utils/theme";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5001/api/users/login",
        loginForm
      );
      console.log(res.data.accessToken);
      localStorage.setItem("token", res.data.accessToken);
      const currentRes = await axios.get(
        "http://localhost:5001/api/users/current",
        {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
        }
      );
      navigate("/contacts");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Box
        flex={1}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize={30} fontWeight={500} mb={5}>
          Get Started Now
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleLogin}
          display={"flex"}
          flexDirection={"column"}
          width={500}
          gap={2}
        >
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography>Email</Typography>
            <OutlinedInput
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              variant="outlined"
              placeholder="Give Your Email"
              size="small"
              sx={{
                fontSize: "14px",
                "&::placeholder": {
                  fontSize: "12px",
                },
              }}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography>Password</Typography>
            <OutlinedInput
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              type="password"
              variant="outlined"
              placeholder="Give Your Password"
              size="small"
              sx={{
                fontSize: "14px",
                "&::placeholder": {
                  fontSize: "12px",
                },
              }}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, width: 100, textTransform: "none" }}
            >
              <Typography>Login</Typography>
            </Button>
            <Typography mt={2}>
              Don't have an account? <a href="/signup">SignUp</a>
            </Typography>
          </Box>
          {error && (
            <Box
              p={2}
              border={`1px solid ${theme.color.error}`}
              borderRadius={2}
              display={"flex"}
              justifyContent={"center"}
            >
              <Typography color={theme.color.error}>{error}</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box flex={1}>
        <Box
          component="img"
          src={loginImg}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;
