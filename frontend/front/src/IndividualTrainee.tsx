import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedInNavbar from "./LoggedInNavbar";
import { Button, Card, Container, Divider, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import ResponsiveAppBar from "./ResponsiveNavBar";
import Footer from "./Footer";

const IndividualTrainee = (props:any) => {
    const navigate = useNavigate();
    const [courses, setCourses] = React.useState<any[]>([]);

    useEffect(() => {
    axios.get('http://localhost:3001/admin').then (response => {
        setCourses(response.data);
        console.log(response.data);
        })
    }, []);
    return (
        <>
            <ResponsiveAppBar/>
            
            <Container>
                <Stack spacing ={5} divider={<Divider orientation="vertical" flexItem />}>
                    {courses && courses.map((course) => (
                        <p key={course._id}>{course.title} {course.subtitle}</p>
                    ))}
                </Stack>
                <Card/>
                
            </Container>

            <Button variant="contained"
                onClick={() => {
                navigate("../exams");
            }}
            >
                 Exams
            </Button>
            
            <p/>
            <Footer></Footer>
        </>
    )
}

export default IndividualTrainee