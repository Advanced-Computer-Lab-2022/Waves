import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import Container from '@mui/material/Container';
import { Box, Divider, Grid, Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";

const Admin = (props:any) => {
    const [courses, setCourses] = React.useState<any[]>([]);

    useEffect(() => {
    axios.get('http://localhost:3001/admin').then (response => {
            setCourses(response.data);
        })
    }, []);

    return (
        <>  
            <ResponsiveNavBar/>
            <Stack marginTop={0.6} direction={"row"}>
                <FilterBar/>
                <Courses/>
            </Stack>
            <p/>
            <Footer/>
        </>
    )
}

export default Admin