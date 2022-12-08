import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import { Button, Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";

const Instructor = (props:any) => {
    
    const pages = ['My Courses', 'Add User', 'Add Course', 'Add Exam', 'Review Rating', 'About Us'];

    const [courses, setCourses] = React.useState<any[]>([]);

    useEffect(() => {
      axios.get('http://localhost:3001/instructor').then (response => {
          setCourses(response.data);
          console.log(response.data);
          })
      },[]);

      const doSome = (filteredCourses:any) => {setCourses(filteredCourses)}
      
    return (
        <>
            <ResponsiveNavBar pages ={pages}/>
            <Stack marginTop={0.6} direction={"row"}>
                <FilterBar setCourses={doSome}/>
                <Courses courses={courses}/>
            </Stack>
            <p/>
            <Footer/>
        </>
    )
}

export default Instructor