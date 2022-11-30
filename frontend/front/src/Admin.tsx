import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar";
import Container from '@mui/material/Container';
import { Box, Divider, Grid, Stack } from "@mui/material";
import ResponsiveNavBar from "./ResponsiveNavBar";
import Footer from "./Footer";
import Card from "./Course";
import FilterBar from "./FilterBar";

const Admin = (props:any) => {
    const [courses, setCourses] = React.useState<any[]>([]);

    useEffect(() => {
    axios.get('http://localhost:3001/admin').then (response => {
        setCourses(response.data);
        console.log(response.data);
        })
    }, []);

    return (
        <>  
            <ResponsiveNavBar/>
            <Stack marginTop={0.6} direction={"row"}>
                <FilterBar/>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 15 }}>
                    {courses && courses.map((course) => (
                        <Grid marginTop={2} item xs={2} sm={4} md={4} key={course._id}>
                            <Card courseName={course.title} courseDescription={course.description} courseRating={course.rating} courseImg={course.img} courseInstructor={course.givenBy} courseTotalHours={course.totalHours} courseSubtitles={course.subtitles}/>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
            <p/>
            <Footer/>
        </>
    )
}

export default Admin