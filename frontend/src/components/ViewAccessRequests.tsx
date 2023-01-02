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
  const { open, setOpen } = props;
  const [requestAccess, setRequestAccess] = React.useState([]);

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  React.useEffect(() => {
    axios.get("http://localhost:3001/getAccessRequests").then((response) => {
      setRequestAccess(response.data);
    });
  }, []);

  function grantHandle(requestAccess: any): void {
    axios
      .post("http://localhost:3001/grantAccessRequest", {
        requestAccess: requestAccess,
      })
      .then((response) => {
        axios
          .get("http://localhost:3001/getAccessRequests")
          .then((response) => {
            setRequestAccess(response.data);
          });
      });
  }

  function denyHandle(refundRequest: any): void {
    axios
      .post("http://localhost:3001/denyAccessRequest", {
        requestAccess: requestAccess,
      })
      .then((response) => {
        axios
          .get("http://localhost:3001/getAccessRequests")
          .then((response) => {
            setRequestAccess(response.data);
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
          {"View Refund Requests"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={16} marginLeft={"5%"}>
              <Typography variant="h5">User</Typography>
              <Typography variant="h5">Course</Typography>
            </Stack>

            {requestAccess &&
              requestAccess.map((request: any) => (
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
