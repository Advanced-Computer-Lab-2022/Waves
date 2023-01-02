import * as React from "react";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Rating,
  Stack,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import { useLocation } from "react-router-dom";
import CourseContent from "../components/CourseContent";
import Footer from "../components/Footer";
import ReviewsReports from "../components/ReviewsReports";
import "../components/styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const background: React.CSSProperties = {
  minWidth: "100%",
  width: "122rem",
};

const customRed = "rgb(180,40,40)";

const theme = createTheme({
  status: {
    danger: "rgb(200,25,25)",
  },
  palette: {
    secondary: {
      main: customRed,
      darker: "rgb(255,255,255)",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const ViewCourseUnpurchased = (props: any) => {
  const location = useLocation();
  const course = location.state?.data;

  const courseRating = course.courseRating;
  const courseReviews = course.courseReviews;
  const courseReports = course.courseReports;

  const [type, setType] = React.useState("");

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/getType", { withCredentials: true })
      .then((res) => {
        setType(res.data);
      });
  }, []);

  function requestAccess() {
    axios
      .post("http://localhost:3001/requestAccess", {
        courseTitle: course.courseName,
        courseImg: course.courseImg,
      }, {withCredentials: true})
      .then((res) => {
        console.log(res.data);
      });
  }

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div className="grad" style={background}>
        <ResponsiveNavBar />
        <Stack direction={"row"} marginBottom={2} marginTop={2}>
          <Stack
            direction={"column"}
            marginLeft={"auto"}
            marginBottom={2}
            marginTop={2}
          >
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
        <CourseContent course={course} isNotPurchased={true} />
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
          <Stack direction="row">
            <Typography
              style={{ maxWidth: "40px", color: "rgb(200,150,0)" }}
              marginTop={0.25}
              component="legend"
            >
              {courseRating[0]}
            </Typography>
            <Rating
              style={{ color: "rgb(200,150,0)" }}
              name="read-only"
              value={courseRating[0]}
              readOnly
              precision={0.1}
            />
            <Typography
              marginLeft={1}
              marginTop={0.25}
              color="rgb(100,100,100)"
              variant="body2"
              component="legend"
            >
              {"(" + courseRating[1] + ")"}
            </Typography>
          </Stack>

          <Typography marginTop={4} marginBottom={1} fontSize={35}>
            Course Name: {course.courseName}
          </Typography>
          <Stack direction="row">
            <Typography
              style={{ maxWidth: "40px", color: "rgb(200,150,0)" }}
              marginTop={0.25}
              component="legend"
            >
              {courseRating[0]}
            </Typography>
            <Rating
              style={{ color: "rgb(200,150,0)" }}
              name="read-only"
              value={courseRating[0]}
              readOnly
              precision={0.1}
            />
            <Typography
              marginLeft={1}
              marginTop={0.25}
              color="rgb(100,100,100)"
              variant="body2"
              component="legend"
            >
              {"(" + courseRating[1] + ")"}
            </Typography>
            <Stack direction="row" spacing={3} marginRight={2}>
              {type === "corporateTrainee" ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={requestAccess}
                >
                  Request Access
                </Button>
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  navigate("/payment-information", {
                    state: {
                      data: {
                        courseName: course.courseName,
                        coursePrice: course.coursePrice,
                        courseDiscount: course.courseDiscount,
                        currencySlice: course.currencySlice,
                        courseChapters: course.courseChapters,
                        courseInstructor: course.courseInstructor,
                      },
                    },
                  })
                }
              >
                Purchase Course
              </Button>
            </Stack>
          </Stack>
        </div>
        <ReviewsReports
          courseReviews={courseReviews}
          courseReports={courseReports}
        />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ViewCourseUnpurchased;
