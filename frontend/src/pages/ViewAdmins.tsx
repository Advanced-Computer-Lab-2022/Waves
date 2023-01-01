import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";
import Search from "../components/Search";
import Users from "../components/Users2";
import DialogContentText from '@mui/material/DialogContentText';

const ViewAdmins = (props: any) => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<any[]>([]);
  const [username, setName] = React.useState("");
  const [password, setPass] = React.useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/getAdmins").then((response) => {
      setUsers(response.data);
    });
  }, [search]);

  const add = () => {
    axios
      .post(
        "http://localhost:3001/addAdmin",
        {
          username: username,
          password: password,
        },
      )
      .then((response) => {
        alert("Discount Added Successfully!");
      });
  };


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ResponsiveNavBar />
      <Search setSearch={setSearch} />
      <div style={{ marginLeft: "auto", display: "flex" }}>
            <Button
              onClick={handleClickOpen}
              sx={{
                marginLeft: "5px",   
              }}
              variant={"outlined"}
            >
              Add Admin

            </Button>
          </div>
        <Stack alignItems={"end"} direction="column">
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogContent>
              <Stack direction="column" spacing={1} marginTop={0.7}>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => setPass(e.target.value)}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={add} href="/admin">
                Add Admin
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      <Users users={users} />
      <p />
      <Footer />
    </>
  );
}

export default ViewAdmins;
