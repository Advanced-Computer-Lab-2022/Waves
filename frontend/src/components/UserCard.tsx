import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Stack } from "@mui/material";
import CoursesAutocomplete from "./CoursesAutocomplete";
import axios from "axios";
import ViewAccessRequests from "./ViewAccessRequests";

interface props {
  profilePic?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  courses?: Array<string>;
}

const User: React.FC<props> = ({
  username,
  email,
  firstName,
  lastName,
  profilePic,
  courses,
}) => {
  const user = {
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    profilePic: profilePic,
    courses: courses,
  };

  function grantCourseAccess() {
    axios
      .put("http://localhost:3001/addCourseToCopTrainee", {
        username: user.username,
        title: selectedCourse,
        // courseSubtitles:
      })
      .then((response) => {});
  }

  const [selectedCourse, setSelectedCourse] = React.useState(null);

  const handleCourseSelection = (course: React.SetStateAction<null>) => {
    setSelectedCourse(course);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ marginLeft: "5px", width: "22rem", height: "33rem" }}>
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
          <p />
          {user.courses &&
            user.courses.map((course: any) => (
              <Typography variant="body2" color="grey">
                {course.courseTitle}
                <p />
              </Typography>
            ))}
          <div style={{ marginTop: "10px" }}>
            <CoursesAutocomplete
              setSelectedCourse={setSelectedCourse}
              selectedCourse={selectedCourse}
            />
            <Stack
              marginLeft={"15px"}
              marginTop={"20px"}
              spacing={"20px"}
              direction={"row"}
            >
              <Button
                onClick={grantCourseAccess}
                variant="outlined"
                color="success"
              >
                Grant Access
              </Button>
              <Button variant="outlined" color="error">
                Ban User
              </Button>
            </Stack>
            <div style={{ display: "flex" }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  marginTop: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={() => {
                  handleClickOpen();
                }}
              >
                View Requests
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
      <div>
        <ViewAccessRequests
          username={user.username}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </Card>
  );
};

export default User;
