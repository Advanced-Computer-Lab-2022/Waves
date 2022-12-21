import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Avatar, Button, Stack } from "@mui/material";

const ViewReport = (props: any) => {
  const { report, courseTitle } = props;
  return (
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
        <Button variant="outlined">Mark As Resolved</Button>
        <Button variant="outlined">Mark As Pending</Button>
      </Stack>
    </div>
  );
};

export default ViewReport;
