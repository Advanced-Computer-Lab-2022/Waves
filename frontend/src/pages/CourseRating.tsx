import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import Container from '@mui/material/Container';
import { Card, Divider, Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ExamsPage from './ExamsPage';


const CourseRating = (props:any) => {
    const [courseratings, setRating] = React.useState<any[]>([]);
    
    const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

    useEffect(() => {
    axios.get('http://localhost:3001/view-instructorcourserating').then (response => {
        setRating(response.data);
        })
    }, []);
    return (
        <>  
            <ResponsiveNavBar pages={pagesArr}/>
            
            <Container>
                <Stack spacing ={5} divider={<Divider orientation="vertical" flexItem />}>
                    {courseratings && courseratings.map((courserating) => (
                        <div key={courserating._id}>
                            {/* <Card title={courserating.title} name={courserating.rating} /> */}
                        </div>
                    ))}
                </Stack>
                
            </Container>
            <p/>
            <Footer></Footer>
        </>
    )
}

export default CourseRating