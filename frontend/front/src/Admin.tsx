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
import { Divider, Stack } from "@mui/material";
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
            <FilterBar/>
            
            <Container>
                <Stack spacing ={5} divider={<Divider orientation="vertical" flexItem />}>
                    {courses && courses.map((course) => (
                        <div key={course._id}>
                            <Card courseName={course.title} courseDescription={course.description} courseRating={course.rating} courseImg={course.img} courseInstructor={course.givenBy} courseTotalHours={course.totalHours} courseSubtitles={course.subtitles}/>
                        </div>
                    ))}
                </Stack>
                
            </Container>
            <p/>
            <Footer></Footer>
        </>
    )
}

export default Admin