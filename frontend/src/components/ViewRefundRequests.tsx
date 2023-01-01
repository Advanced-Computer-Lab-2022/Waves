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

            {refundRequests &&
              refundRequests.map((refundRequest) => (
                <>
                  <span className="horizontal-line-thin"></span>
                  <Stack
                    direction="row"
                    spacing={7}
                    style={{ marginLeft: "6%" }}
                  >
                    <Typography variant="h6" marginTop={"2%"}>
                      {refundRequest.username}
                    </Typography>

                    <Stack direction={"row"} spacing={2}>
                      <img
                        src={refundRequest.courseImg}
                        style={{
                          boxShadow: "1px 1px",
                          borderRadius: "10px",
                          border: "solid rgb(170,170,170) 1px",
                          width: "40%",
                          height: "100%",
                        }}
                      />
                      <Typography variant="h6" marginTop={"2%"}>
                        {refundRequest.courseTitle}
                      </Typography>
                    </Stack>
                    <div style={{ display: "flex", marginLeft: "auto" }}>
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
                </>
              ))}
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewRefundRequests;
