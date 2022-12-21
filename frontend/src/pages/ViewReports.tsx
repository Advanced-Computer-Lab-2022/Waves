import { Avatar, List, ListItemButton, Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import CircleIcon from "@mui/icons-material/Circle";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ViewReport from "../components/ViewReport";

const ViewReports = () => {
  const adminPages = [
    "All Courses",
    "Instructors",
    "Corporate Trainees",
    "Add User",
    "View Reports",
    "About Us",
  ];

  const [coursesReports, setCoursesReports] = React.useState([]);

  const [selectedReport, setSelectedReport] = React.useState({});

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/getReports", { withCredentials: true })
      .then((response) => {
        setCoursesReports(response.data);
      });
  }, []);

  function handleOnClick(report:any) {
    setSelectedReport(report);
  }
  return (
    <>
      <ResponsiveNavBar pages={adminPages} />
      <Stack direction={"row"} className="grad" marginTop={0.3}>
        <List
          className="listGrad"
          sx={{
            minHeight: "60rem",
            marginRight: "auto%",
            width: "20%",
            bgcolor: "rgb(200, 200, 200)",
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
                    <ListItemButton onClick={() => handleOnClick(report)}>
                      <Stack style={{ marginTop: "10px" }} spacing={2.25}>
                        <Stack direction={"row"} spacing={3}>
                          {report.seen ? (
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
          report={selectedReport}
        ></ViewReport>
      </Stack>
      <Footer />
    </>
  );
};

export default ViewReports;
