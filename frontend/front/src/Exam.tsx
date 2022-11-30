import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import React, { useEffect } from "react";
import Question from "./Question";
import { Button, TextField } from "@mui/material";
import LoggedInNavbar from "./LoggedInNavbar";

const Exam = (props:any) => {
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userInfo = new FormData(e.target)
        const belongsToCourse = Object.fromEntries(userInfo.entries()).belongsToCourse
        const belongsToExam = Object.fromEntries(userInfo.entries()).belongsToExam
        console.log(Object.fromEntries(userInfo.entries()))
        const question= Object.fromEntries(userInfo.entries()).question
        const c1= Object.fromEntries(userInfo.entries()).choice1
        const c2= Object.fromEntries(userInfo.entries()).choice2
        const c3= Object.fromEntries(userInfo.entries()).choice3
        const c4= Object.fromEntries(userInfo.entries()).choice4
        const solution= Object.fromEntries(userInfo.entries()).solution
        console.log(solution)
        axios.post('http://localhost:3001/add-exam', {
            belongsToCourse: belongsToCourse,
            belongsToExam: belongsToExam,
            question: question,
            c1: c1,
            c2: c2,
            c3: c3,
            c4: c4,
            solution: solution    
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
                navigate("../" +response.data);
            });
    }



    return (
        <>
            <LoggedInNavbar/>
            <form onSubmit={handleSubmit}>
            <TextField
                id="belongsToCourse"
                name="belongsToCourse"
                label="Course"
                placeholder="eg. Math 3"
                multiline
            />
            <TextField
                id="belongsToExam"
                name="belongsToExam"
                label="Exam Name"
                placeholder="eg. Exam 1"
                multiline
            />
            <Question/>
            <button>Add Exam</button>
            </form>

        </>
    )
}

export default Exam