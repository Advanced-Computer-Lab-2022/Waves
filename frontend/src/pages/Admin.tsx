import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";

const Admin = (props:any) => {
    const [courses, setCourses] = React.useState<any[]>([]);

    useEffect(() => {
      axios.get('http://localhost:3001/admin').then (response => {
          setCourses(response.data);
          console.log(response.data);
          })
      },[]);

      const doSome = (filteredCourses:any) => {setCourses(filteredCourses)}
      const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

    return (
        <>  
            <ResponsiveNavBar pages={pagesArr}/>
            <Stack marginTop={0.6} direction={"row"}>
                <FilterBar setCourses={doSome}/>
                <Courses courses={courses}/>
            </Stack>
            <p/>
            <Footer/>
        </>
    )
}

export default Admin