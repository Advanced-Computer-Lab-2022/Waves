import {Grid } from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import Course from "./Course";

const Courses = (props:any) => {

    const [courses, setCourses] = React.useState<any[]>([]);
    useEffect(() => {
    axios.get('http://localhost:3001/admin').then (response => {
        setCourses(response.data);
        console.log(response.data);
        })
    }, []);

    return(
        <Grid container columnSpacing={{ xs: 2, md: 2 }} rowSpacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 20 }}>
        {courses && courses.map((course) => (
            <Grid marginTop={2} item xs={2} sm={4} md={5} key={course._id}>
                <Course courseName={course.title} courseDescription={course.description} courseRating={course.rating} courseImg={course.img} courseInstructor={course.givenBy} courseTotalHours={course.totalHours} courseSubtitles={course.subtitles} coursePrice={"$" +course.price}/>
            </Grid>
        ))}
        </Grid>
    )
}

export default Courses