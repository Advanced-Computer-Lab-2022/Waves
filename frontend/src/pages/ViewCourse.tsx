import * as React from "react";
import jsPDF from "jspdf";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FormControl,
  OutlinedInput,
  Rating,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
//var Blur = require('react-blur');
import "bootstrap/dist/css/bootstrap.min.css";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import { useLocation } from "react-router-dom";
import CourseContent from "../components/CourseContent";
import Footer from "../components/Footer";
import DownloadIcon from "@mui/icons-material/Download";
import ReviewsReports from "../components/ReviewsReports";
import "../components/styles.css";
import ReviewOrReport from "../components/ReviewOrReport";
import axios from "axios";
import Progress from "../components/CourseProgress";

const customRed = "rgb(180,40,40)";

const theme = createTheme({
  status: {
    danger: "rgb(200,25,25)",
  },
  palette: {
    primary: {
      main: customRed,
      darker: "#053e85",
    },
    secondary: {
      main: "rgb(255,255,255)",
      darker: "rgb(255,255,255)",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const background: React.CSSProperties = {
  minWidth: "100%",
  width: "122rem",
};

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const ViewCourse = (props: any) => {
  const location = useLocation();
  const course = location.state?.data;

  const [instructorRating, setInstructorRating] = React.useState(0);

  const [courseRating, setCourseRating] = React.useState(0);

  const [courseReviews, setCourseReviews] = React.useState(
    course.courseReviews
  );

  const [courseReports, setCourseReports] = React.useState(
    course.courseReports
  );

  const [courseProgress, setCourseProgress] = React.useState(0);

  const [notes, setNotes] = React.useState<string>("");

  const [open, setOpen] = React.useState(false);

  const downloadPDFFile = () => {
    let doc = new jsPDF("landscape", "px", "a4", false);
    doc.text(notes, 20, 20);
    doc.save("My Notes.pdf");
  };

  React.useEffect(() => {
    axios
      .post(
        "http://localhost:3001/getProgress",
        { courseName: course.courseName },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data)
        setCourseProgress(response.data);
      });
  }, []);

  return (
    <div className="grad" style={background}>
      <ResponsiveNavBar />
      <Stack direction={"row"} marginTop={2}>
        <Stack direction={"column"} marginLeft={"auto"}>
          <Typography
            sx={{ textShadow: "2px 2px black" }}
            marginTop={"auto"}
            marginBottom={"auto"}
            fontFamily={"Cairo"}
            color={"rgb(200,200,200)"}
            fontSize={60}
          >
            {course.courseName}
          </Typography>
          <Typography
            sx={{ textShadow: "2px 2px black" }}
            marginTop={"auto"}
            marginBottom={"auto"}
            fontFamily={"Cairo"}
            color={"rgb(200,200,200)"}
            fontSize={60}
          >
            {"Instructor " + course.courseInstructor}
          </Typography>
        </Stack>

        <img
          src={course.courseImg}
          style={{
            boxShadow: "2px 2px",
            borderRadius: "30px",
            border: "solid rgb(170,170,170) 5px",
            marginRight: "5%",
            width: "35%",
            height: "20%",
            marginLeft: "auto",
          }}
        />
      </Stack>
      <div style={{ display: "flex" }}>
        <ThemeProvider theme={theme}>
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ marginRight: "50rem" }}>
              <Progress
                progress={courseProgress}
                size={150}
                fontVariant={"h4"}
              />
            </div>
          </div>
        </ThemeProvider>
      </div>
      <CourseContent course={course} />

      <div
        className="ratingGrad"
        style={{
          opacity: "80%",
          padding: "1%",
          margin: "1%",
          boxShadow: "2px 2px",
          borderRadius: "5px",
          border: "solid rgb(170,170,170) 3px",
          width: "98%",
          backgroundColor: "rgb(230, 230, 230)",
        }}
      >
        <Typography marginLeft={1} gutterBottom variant="h5" component="div">
          Notes
        </Typography>
        <FormControl style={{ width: "100%" }}>
          <OutlinedInput
            rows={5}
            multiline
            placeholder="Write here.."
            style={{ fontSize: "20px" }}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
        </FormControl>
        <div style={{ display: "flex", paddingTop: "10px" }}>
          <DownloadIcon
            fontSize="large"
            sx={{
              marginLeft: "auto",
              marginRight: "0.5%",
              cursor: "pointer",
            }}
            onClick={downloadPDFFile}
          />
        </div>
      </div>
      <div
        className="ratingGrad"
        style={{
          opacity: "100%",
          paddingLeft: "3%",
          paddingBottom: "2%",
          margin: "1%",
          boxShadow: "2px 2px",
          borderRadius: "5px",
          border: "solid rgb(170,170,170) 3px",
          marginLeft: "auto",
          marginRight: "auto",
          maxHeight: "40%",
          width: "40%",
          backgroundColor: "rgb(200, 200, 200)",
        }}
      >
        <Typography marginTop={4} marginBottom={1} fontSize={35}>
          Instructor: {course.courseInstructor}
        </Typography>
        <Typography marginBottom={1} fontSize={25} component="legend">
          Rate Instructor
        </Typography>
        <Rating
          size="large"
          name="simple-controlled"
          value={instructorRating}
          onChange={(event, newValue) => {
            setInstructorRating(newValue ? newValue : 0);
          }}
        />
        <Typography marginTop={4} marginBottom={1} fontSize={35}>
          Course Name: {course.courseName}
        </Typography>
        <Typography marginBottom={1} fontSize={25} component="legend">
          Rate Course
        </Typography>
        <Rating
          size="large"
          name="simple-controlled"
          value={courseRating}
          onChange={(event, newValue) => {
            setCourseRating(newValue ? newValue : 0);
          }}
        />
        <Stack flexDirection={"row"}>
          <ReviewOrReport
            courseID={course.id}
            rating={courseRating}
            courseReviews={courseReviews}
            courseReports={courseReports}
            setCourseReports={setCourseReports}
            setCourseReviews={setCourseReviews}
            setOpen={setOpen}
            open={open}
          />
        </Stack>
      </div>
      <ReviewsReports
        courseReviews={courseReviews}
        courseReports={courseReports}
      />
      <Footer />
    </div>
  );
};

export default ViewCourse;
