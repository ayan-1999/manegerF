import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  Modal,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { theme } from "../utils/theme";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleProfileClick = () => {
    setOpenProfile(true);
    handleCloseMenu();
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  return (
    <>
      <Box
        height={56}
        bgcolor={theme.color.bg1}
        px={4}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={20} fontWeight={700}>
          Contact.WEB
        </Typography>
        <Avatar onClick={handleAvatarClick} sx={{ cursor: "pointer" }} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Modal open={openProfile} onClose={handleCloseProfile}>
        <Box
          width={300}
          bgcolor="white"
          p={4}
          borderRadius={2}
          mx="auto"
          mt="20vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Typography variant="h6">User Profile</Typography>
          <Typography>Name: John Doe</Typography>
          <Typography>Email: john@example.com</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default NavBar;
