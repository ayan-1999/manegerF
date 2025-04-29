import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { theme } from "../utils/theme";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

const ContactCard = ({ name, email, phone, _id, fetchContacts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: name,
    email: email,
    phone: phone,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    handleMenuClose();
    setOpenModal(true);
  };

  const handleDelete = async () => {
    handleMenuClose();
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.delete(
        `http://localhost:5001/api/contacts/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      setError(err);
    }
    setLoading(false);
    fetchContacts();
  };

  const handleUpdateForm = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5001/api/contacts/${_id}`,
        updateFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      setError(err);
    }
    setLoading(false);
    setOpenModal(false);
    fetchContacts();
  };

  return (
    <Box
      bgcolor={theme.color.bg2}
      padding={2}
      borderRadius={2}
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <Typography>Name: {name}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>Phone: {phone}</Typography>
      </Box>

      <Box>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleUpdate}>Update</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          sx={{ transform: "translate(-50%, -50%)" }}
          border={theme.color.text}
          bgcolor={theme.color.white}
          padding={2}
          borderRadius={2}
        >
          <Typography fontSize={16} fontWeight={600}>
            Update Contact Details
          </Typography>
          <Box
            component={"form"}
            display={"flex"}
            flexDirection={"column"}
            width={300}
            gap={2}
            mt={2}
          >
            <OutlinedInput
              value={updateFormData.name}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, name: e.target.value })
              }
              placeholder="Give Contact Name"
              size="small"
              sx={{
                fontSize: "14px",
                "&::placeholder": {
                  fontSize: "12px",
                },
              }}
            />
            <OutlinedInput
              value={updateFormData.email}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, email: e.target.value })
              }
              placeholder="Give Contact email"
              size="small"
              sx={{
                fontSize: "14px",
                "&::placeholder": {
                  fontSize: "12px",
                },
              }}
            />
            <OutlinedInput
              value={updateFormData.phone}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, phone: e.target.value })
              }
              placeholder="Give Contact Phone"
              size="small"
              sx={{
                fontSize: "14px",
                "&::placeholder": {
                  fontSize: "12px",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.color.bg1,
                color: theme.color.text,
                boxShadow: "none",
              }}
              onClick={handleUpdateForm}
            >
              <Typography>Update</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ContactCard;
