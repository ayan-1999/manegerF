import { Box, Button, Link, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react";
import loginImg from "../assets/si.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { theme } from "../utils/theme";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5001/api/users/register",
        signUpData
      );
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong");
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
          display={"flex"}
          flexDirection={"column"}
          width={500}
          gap={2}
        >
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography>Name</Typography>
            <OutlinedInput
              value={signUpData.userName}
              onChange={(e) =>
                setSignUpData({ ...signUpData, userName: e.target.value })
              }
              variant="outlined"
              placeholder="Give Your Name"
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
            <Typography>Email</Typography>
            <OutlinedInput
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
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
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
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
              variant="contained"
              sx={{ mt: 2, width: 100, textTransform: "none" }}
              onClick={handleSignUp}
            >
              <Typography>Signup</Typography>
            </Button>
            <Typography mt={2}>
              Already have an account? <a href="/login">Login</a>
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

export default Signup;
