import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";

const CoursePage = (props: any) => {
  const [courses, setCourses] = React.useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/getCourses").then((response) => {
      setCourses(response.data);
    });
  }, []);

  return (
    <>
      <ResponsiveNavBar />
      <Stack
        sx={{ minWidth: "100%", width: "122rem" }}
        className="grad"
        marginTop={0.3}
        direction={"row"}
      >
        <FilterBar setCourses={setCourses} />
        <span className="vertical-line"></span>
        <Courses courses={courses} />
      </Stack>
      <p />
      <Footer />
    </>
  );
};

export default CoursePage;
