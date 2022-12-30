import { Avatar, List, ListItemButton, Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import CircleIcon from "@mui/icons-material/Circle";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ViewReport from "../components/ViewReport";
import { useEffect } from "react";

const ViewReports = () => {
  const [coursesReports, setCoursesReports] = React.useState([]);

  const [selectedCourseTitle, setSelectedCourseTitle] = React.useState("");

  const [selectedReport, setSelectedReport] = React.useState<any>();

  function updateReportSeen(report: any) {
    axios
      .post("http://localhost:3001/updateReportSeen", {
        report: report,
      })
      .then((response) => {});
  }

  function handleOnClick(report: any, courseTitle: any) {
    setSelectedReport(report);
    setSelectedCourseTitle(courseTitle);
    updateReportSeen(report);
  }
  return (
    <>
      <ResponsiveNavBar />
      <Stack direction={"row"} marginTop={0.5} style={{backgroundColor: "rgb(225, 225, 225)"}}>
        <List
          sx={{
            minHeight: "60rem",
            width: "20%",
            bgcolor: "rgb(205, 205, 205)",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <h1
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                marginLeft: "20px",
              }}
            >
              {" "}
              Reports{" "}
            </h1>
          }
        >
          {coursesReports &&
            coursesReports.map(
              (reportsObj: any, idx) =>
                reportsObj.reports &&
                reportsObj.reports.map((report: any) => (
                  <>
                    <ListItemButton
                      onClick={() => handleOnClick(report, reportsObj.title)}
                    >
                      <Stack style={{ marginTop: "10px" }} spacing={2.25}>
                        <Stack direction={"row"} spacing={3}>
                          {report.seen /* || report == selectedReport */ ? (
                            <CircleIcon
                              fontSize="small"
                              color="primary"
                              style={{ visibility: "hidden", marginTop: "8px" }}
                            />
                          ) : (
                            <CircleIcon
                              fontSize="small"
                              color="primary"
                              style={{ marginTop: "8px" }}
                            />
                          )}
                          <Avatar alt="Profile Pic" src={report.profilePic} />
                          <h2>{report.reporter}</h2>
                        </Stack>
                        <Stack
                          direction={"row"}
                          style={{ marginLeft: "3.25rem" }}
                        >
                          {report.status == "Pending" ? (
                            <PendingIcon color="warning" />
                          ) : (
                            <CheckCircleIcon color="success" />
                          )}
                          <h5 style={{ marginLeft: "0.8rem" }}>
                            {reportsObj.title + " (" + report.type + ")"}
                          </h5>
                        </Stack>
                      </Stack>
                    </ListItemButton>
                    <span className="horizontal-line-report"></span>
                  </>
                ))
            )}
        </List>
        <span className="vertical-line"></span>
        <ViewReport
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
          // coursesReports={coursesReports}
          setCoursesReports={setCoursesReports}
          courseTitle={selectedCourseTitle}
        ></ViewReport>
      </Stack>
      <Footer />
    </>
  );
};

export default ViewReports;
