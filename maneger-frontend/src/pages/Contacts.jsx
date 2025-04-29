import {
  Box,
  Button,
  Grid,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { theme } from "../utils/theme";
import ContactCard from "../components/ContactCard";
import NavBar from "../components/NavBar";
import axios from "axios";

const Contacts = () => {
  const [openForm, setOpenFrom] = useState(false);
  const [addContactForm, setAddContactForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5001/api/contacts",
        addContactForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenFrom(false);
      fetchContacts();
      setAddContactForm({
        name: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      setError(err);
    }
  };


  return (
    <>
      <NavBar />
      <Box paddingX={4} mt={2} position={"relative"}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.color.bg1,
            color: theme.color.text,
            boxShadow: "none",
          }}
          onClick={() => {
            setOpenFrom(true);
          }}
        >
          <Typography>Add new Contact</Typography>
        </Button>
        {loading ? (
          <Typography fontSize={16} fontWeight={600} mt={2}>
            Loading...
          </Typography>
        ) : (
          <>
            <Typography fontSize={16} fontWeight={600} mt={2}>
              My Contacts ({contacts.length})
            </Typography>
            <Grid container spacing={2} mt={2}>
              {contacts.map((contact, i) => {
                return (
                  <Grid key={i + 1} size={3}>
                    <ContactCard {...contact} fetchContacts={fetchContacts} />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
        <Modal open={openForm} onClose={() => setOpenFrom(false)}>
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
              Contact Details
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
                value={addContactForm.name}
                onChange={(e) =>
                  setAddContactForm({ ...addContactForm, name: e.target.value })
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
                value={addContactForm.email}
                onChange={(e) =>
                  setAddContactForm({
                    ...addContactForm,
                    email: e.target.value,
                  })
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
                value={addContactForm.phone}
                onChange={(e) =>
                  setAddContactForm({
                    ...addContactForm,
                    phone: e.target.value,
                  })
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
                onClick={addContact}
              >
                <Typography>ADD</Typography>
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Contacts;
