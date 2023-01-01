import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

const ViewRefundRequests = (props: any) => {
  const { open, setOpen } = props;
  const [refundRequests, setRefundRequests] = React.useState<any[]>([]);
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  React.useEffect(() => {
    axios.get("http://localhost:3001/getRefundRequests").then((response) => {
      setRefundRequests(response.data);
    });
  }, []);

  function acceptHandle(refundRequest: any): void {
    axios
      .post("http://localhost:3001/acceptRefundRequest", {
        refundRequest: refundRequest,
      })
      .then((response) => {
        axios
          .get("http://localhost:3001/getRefundRequests")
          .then((response) => {
            setRefundRequests(response.data);
          });
      });
  }

  function rejectHandle(refundRequest: any): void {
    axios
      .post("http://localhost:3001/rejectRefundRequest", {
        refundRequest: refundRequest,
      })
      .then((response) => {
        axios
          .get("http://localhost:3001/getRefundRequests")
          .then((response) => {
            setRefundRequests(response.data);
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
            width: "50%",
            height: "50%",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"View Refund Requests"}
        </DialogTitle>
        <DialogContent>
          <Stack>
            {refundRequests &&
              refundRequests.map((refundRequest) => (
                <Stack direction="row">
                  <img
                    src={refundRequest.userProfilePic}
                    alt="profilePic"
                    width="50"
                    height="50"
                  />
                  <Typography>{refundRequest.username}</Typography>
                  <Typography>{refundRequest.courseTitle}</Typography>
                  <div style={{ display: "flex" }}>
                    <Button
                      onClick={() => acceptHandle(refundRequest)}
                      color="success"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => rejectHandle(refundRequest)}
                      color="error"
                    >
                      Reject
                    </Button>
                  </div>
                </Stack>
              ))}
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewRefundRequests;
