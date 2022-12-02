import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import React, { useEffect } from "react";
import Question from "../components/Question";
import { Button, Stack, TextField } from "@mui/material";
import LoggedInNavbar from "../components/LoggedInNavbar";
import ResponsiveNavBar from "../components/ResponsiveNavBar";

const AddCourse = (props:any) => {
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userInfo = new FormData(e.target)
        const title = Object.fromEntries(userInfo.entries()).title
        const subtitle = Object.fromEntries(userInfo.entries()).subtitle
        const price= Object.fromEntries(userInfo.entries()).price
        const shortSummary= Object.fromEntries(userInfo.entries()).shortSummary
        const totalHours= Object.fromEntries(userInfo.entries()).totalHours
        const courseRating= Object.fromEntries(userInfo.entries()).courseRating
        const subject= Object.fromEntries(userInfo.entries()).subject
        const givenBy= Object.fromEntries(userInfo.entries()).givenBy
        const reviews= Object.fromEntries(userInfo.entries()).reviews
        axios.post('http://localhost:3001/add-course', {
            title: title,
            subtitle: subtitle,
            price: price,
            shortSummary: shortSummary,
            totalHours: totalHours,
            rating: courseRating,
            subject: subject,
            givenBy: givenBy,
            reviews: reviews   
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
                alert('Course added successfully')
            });
    }



    return (
        <>
        <ResponsiveNavBar/>
            <form onSubmit={handleSubmit}>
            <Stack spacing={1.5} direction="column"
                justifyContent="space-evenly"
                alignItems="baseline" marginTop={1.5} marginLeft={1.5}>
            <TextField
                id="title"
                name="title"
                label="Title"
                placeholder="eg. Math 3"
                multiline
            />
            <TextField
                id="subtitle"
                name="subtitle"
                label="Subtitle"
                //placeholder="eg. Exam 1"
                multiline
            />
            <TextField
                id="price"
                name="price"
                label="Price"
                //placeholder="eg. Exam 1"
                multiline
            />
            <TextField
                id="shortSummary"
                name="shortSummary"
                label="Short Summary"
                //placeholder="eg. Exam 1"
                multiline
            />
            <TextField
                id="totalHours"
                name="totalHours"
                label="Total Hours"
                //placeholder="eg. Exam 1"
                multiline
            />
            <TextField
                id="subject"
                name="subject"
                label="Subject"
                placeholder="eg. Math"
                multiline
            />
            <TextField
                id="givenBy"
                name="givenBy"
                label="Given By"
                //placeholder="eg. Exam 1"
                multiline
            />
            </Stack>
            <button className="ms-2 mt-1 btn btn-primary">Add Course</button>
            </form>
        </>
    )
}

export default AddCourse