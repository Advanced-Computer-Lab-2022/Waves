import axios from "axios";
import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Users from "../components/Users2";

const ViewIndividualTrainees = (props: any) => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<any[]>([]);
  const [username, setName] = React.useState("");
  const [password, setPass] = React.useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getIndividualTrainees")
      .then((response) => {
        setUsers(response.data);
      });
  }, [search]);

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
          <DialogActions></DialogActions>
        </Dialog>
      </Stack>
      <Users users={users} type='individualTrainee'/>
      <p />
      <Footer />
    </>
  );
};

export default ViewIndividualTrainees;
