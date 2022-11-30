import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar";
import Container from '@mui/material/Container';
import { Divider, Stack } from "@mui/material";
import ResponsiveNavBar from "./ResponsiveNavBar";
import Footer from "./Footer";
import Card from "./ExamCard";
import FilterBar from "./FilterBar";
import {useLocation} from "react-router-dom";

const ExamSession = (props:any) => {
    const [examsQuestions, setExamQuestions] = React.useState<any[]>([]);
    const location = useLocation();
    const data = location.state?.data;
    axios.post('http://localhost:3001/exam-session', {
            belongsToCourse: data[0] ,
            name: data[1] 
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
                console.log(response.data)
                setExamQuestions(response.data)
            });
    return (
        <>
        <ResponsiveNavBar/>
        
            
            <p/>
            <Footer></Footer>
        </>
    )
}

export default ExamSession