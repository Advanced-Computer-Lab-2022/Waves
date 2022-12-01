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
import FilterBar from "../components/FilterBar";

const Rating = (props:any) => {
    const [ratings, setRating] = React.useState<any[]>([]);

    useEffect(() => {
    axios.get('http://localhost:3001/view-rating').then (response => {
        setRating(response.data);
        console.log(response.data);
        })
    }, []);

    return (
        <>  
            <ResponsiveNavBar/>
            <h1>{ratings}</h1>
            <p/>
            <Footer/>
        </>
    )
}

export default Rating