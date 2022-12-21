import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Avatar, Button, Stack, ThemeProvider, createTheme } from "@mui/material";

const ViewReport = (props: any) => {
  const { report, courseTitle } = props;

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

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>{courseTitle}</h1>
        {report.reporter}
        {report.description}
        <Avatar src={report.profilePic}></Avatar>
        {report.type}
        {report.status == "Pending" ? (
          <PendingIcon color="warning" />
        ) : (
          <CheckCircleIcon color="success" />
        )}
        <Stack spacing={1} direction="row">
          <Button variant="contained" color="success">Mark As Resolved</Button>
          <Button variant="contained" color="warning">Mark As Pending</Button>
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default ViewReport;
