import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

const ViewAccessRequests = (props: any) => {
  const { username, open, setOpen } = props;
  const [accessRequests, setAccessRequests] = React.useState([]);

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  React.useEffect(() => {
    console.log(username);
    if (open) {
      axios
        .post("http://localhost:3001/getAccessRequests", { username: username })
        .then((response) => {
          setAccessRequests(response.data);
        });
    }
  }, [open]);

  function grantHandle(accessRequest: any): void {
    axios
      .post("http://localhost:3001/grantAccessRequest", {
        accessRequest: accessRequest,
        username: username,
      })
      .then((response) => {
        axios
          .post("http://localhost:3001/getAccessRequests", {
            username: username,
          })
          .then((response) => {
            setAccessRequests(response.data);
          });
      });
  }

  function denyHandle(accessRequest: any): void {
    axios
      .post("http://localhost:3001/denyAccessRequest", {
        accessRequest: accessRequest,
      })
      .then((response) => {
        axios
          .post("http://localhost:3001/getAccessRequests", {
            username: username,
          })
          .then((response) => {
            setAccessRequests(response.data);
          });
      });
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            height: "50rem",
          },
        }}
      >
        <DialogTitle fontSize={30} id="responsive-dialog-title">
          {"View Access Requests"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={16} marginLeft={"5%"}>
              <Typography variant="h5">User</Typography>
              <Typography variant="h5">Course</Typography>
            </Stack>

            {accessRequests &&
              accessRequests.map((request: any) => (
                <>
                  <span className="horizontal-line-thin"></span>
                  <Stack
                    direction="row"
                    spacing={7}
                    style={{ marginLeft: "6%" }}
                  >
                    <Typography variant="h6" marginTop={"2%"}>
                      {request.username}
                    </Typography>

                    <Stack direction={"row"} spacing={2}>
                      <img
                        src={request.courseImg}
                        style={{
                          boxShadow: "1px 1px",
                          borderRadius: "10px",
                          border: "solid rgb(170,170,170) 1px",
                          width: "40%",
                          height: "100%",
                        }}
                      />
                      <Typography variant="h6" marginTop={"2%"}>
                        {request.courseTitle}
                      </Typography>
                    </Stack>
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <Button
                        onClick={() => grantHandle(request)}
                        color="success"
                      >
                        Grant
                      </Button>
                      <Button onClick={() => denyHandle(request)} color="error">
                        Deny
                      </Button>
                    </div>
                  </Stack>
                </>
              ))}
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewAccessRequests;
