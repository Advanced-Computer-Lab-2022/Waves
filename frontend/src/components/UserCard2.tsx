import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button
} from "@mui/material";

import ViewRefundRequests from "./ViewRefundRequests";

interface props {
  profilePic?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  courses?: Array<string>;
  type?: string;
}

const User: React.FC<props> = ({
  username,
  email,
  firstName,
  lastName,
  profilePic,
  courses,
  type
}) => {
  const user = {
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    profilePic: profilePic,
    courses: courses,
  };

  const [open, setOpen] = React.useState(false);

  function handleRefundRequestsClick(): void {
    setOpen(true);
  }

  return (
    <Card sx={{ marginLeft: "5px", width: "22rem", height: "20rem" }}>
      <div>
        <Avatar
          sx={{
            width: "125px",
            height: "125px",
            alignSelf: "center",
            justifySelf: "center",
            marginLeft: "112.5px",
            marginBottom: "10px",
          }}
          alt={"Profile Pic"}
          src={profilePic}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.username}
          </Typography>
          <Typography variant="body2">
            {user.firstName + " " + user.lastName}
          </Typography>
          <p />
          <Typography variant="body2" color="grey">
            {user.email}
          </Typography>
          {type === "individualTrainee" ? <Button onClick={handleRefundRequestsClick} variant='contained'>View Refund Requests</Button> : <></>}
        </CardContent>
        <ViewRefundRequests open={open} setOpen={setOpen} user={user} />
      </div>
    </Card>
  );
};

export default User;
