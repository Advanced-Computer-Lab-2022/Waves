import { Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import ResponsiveNavBar from "../components/ResponsiveNavBar";

const Homepage = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getType", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data !== "notLoggedIn") navigate("/" + response.data);
      });
    axios.get("http://localhost:3001/getCourses").then((response) => {
      setCourses(response.data);
      console.log(response.data);
    });
  }, []);

  const [courses, setCourses] = React.useState<any[]>([]);

  const pages = ["All Courses", "About Us"];

  return (
    <>
      <ResponsiveNavBar isNotLoggedIn={true} pages={pages} />
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
export default Homepage;
