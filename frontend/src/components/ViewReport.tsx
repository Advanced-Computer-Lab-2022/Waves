import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Avatar,
  Button,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import React from "react";

const ViewReport: React.FC<{
  selectedReport: any;
  setSelectedReport: any;
  courseTitle: any;
  setCoursesReports: any;
}> = (props) => {
  const report = props.selectedReport;
  const setReport = props.setSelectedReport;
  const courseTitle = props.courseTitle;
  const setCoursesReports = props.setCoursesReports;

  const customRed = "rgb(150,40,40)";

  const theme = createTheme({
    status: {
      danger: "rgb(200,25,25)",
    },
    palette: {
      primary: {
        main: customRed,
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

  useEffect(() => {
    console.log(report);
    axios
      .get("http://localhost:3001/getReports", { withCredentials: true })
      .then((response) => {
        setCoursesReports(response.data);
      });
  }, [report]);

  function resolveProblem() {
    axios
      .post("http://localhost:3001/updateReportStatus", {
        report: report,
        status: "Resolved",
      })
      .then((response) => {
        setReport((prevState: any) => ({ ...prevState, status: "Resolved" }));
      });
  }

  function pendProblem() {
    axios
      .post("http://localhost:3001/updateReportStatus", {
        report: report,
        status: "Pending",
      })
      .then((response) => {
        setReport((prevState: any) => ({ ...prevState, status: "Pending" }));
      });
  }

  return (
    <ThemeProvider theme={theme}>
      {report ? (
        <div style={{ marginLeft: "auto", marginRight: "auto", width: "30%" }}>
          <Typography variant="h1">{courseTitle}</Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Stack
              marginLeft={"auto"}
              marginRight={"auto"}
              direction={"row"}
              spacing={1}
            >
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                src={report.profilePic}
              ></Avatar>
              <div style={{ display: "flex" }}>
                <Typography
                  marginLeft={"15px"}
                  marginTop={"auto"}
                  marginBottom={"auto"}
                  variant="h3"
                >
                  {report.reporter}
                </Typography>
              </div>
            </Stack>
            <Typography
              marginTop={2}
              marginLeft={"auto"}
              marginRight={"auto"}
              variant="h5"
            >
              {report.description}
            </Typography>

            <Stack
              marginTop={1}
              marginLeft={"auto"}
              marginRight={"auto"}
              direction={"row"}
              spacing={1}
            >
              <Typography variant="h5">{report.type} Problem</Typography>
              <Typography variant="h5">{report.status}</Typography>
              {report.status == "Pending" ? (
                <>
                  <PendingIcon color="warning" />
                </>
              ) : (
                <>
                  <CheckCircleIcon
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                    color="success"
                  />
                </>
              )}
            </Stack>
            <Stack
              marginTop={3}
              marginLeft={"auto"}
              marginRight={"auto"}
              spacing={5}
              direction="row"
            >
              <Button
                onClick={resolveProblem}
                variant="contained"
                color="success"
              >
                Mark As Resolved
              </Button>
              <Button onClick={pendProblem} variant="contained" color="warning">
                Mark As Pending
              </Button>
            </Stack>
          </div>
        </div>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
};

export default ViewReport;
