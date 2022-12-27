import {
    BrowserRouter as Router,
    Route,
    useNavigate
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import React, { useEffect } from "react";
//import Question from "../components/Question";
import { Button, Link, Checkbox, FormControlLabel, FormGroup, Stack, TextField } from "@mui/material";
import LoggedInNavbar from "../components/LoggedInNavbar";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import { Subtitles } from "@mui/icons-material";

const pages = ['My Courses', 'Add User', 'Add Course', 'Add Exam', 'Review Rating', 'About Us'];

const AddCourse = (props: any) => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userInfo = new FormData(e.target)
        const title = Object.fromEntries(userInfo.entries()).title
        const subtitle1 = Object.fromEntries(userInfo.entries()).subtitle1
        const subtitle1Video = Object.fromEntries(userInfo.entries()).subtitle1Video
        const subtitle1VideoDescription = Object.fromEntries(userInfo.entries()).subtitle1VideoDescription
        const subtitle2 = Object.fromEntries(userInfo.entries()).subtitle2
        const subtitle2Video = Object.fromEntries(userInfo.entries()).subtitle2Video
        const subtitle2VideoDescription = Object.fromEntries(userInfo.entries()).subtitle2VideoDescription
        const subtitle3 = Object.fromEntries(userInfo.entries()).subtitle3
        const subtitle3Video = Object.fromEntries(userInfo.entries()).subtitle3Video
        const subtitle3VideoDescription = Object.fromEntries(userInfo.entries()).subtitle3VideoDescription
        const price = Object.fromEntries(userInfo.entries()).price
        const description = Object.fromEntries(userInfo.entries()).description
        const totalHours = Object.fromEntries(userInfo.entries()).totalHours
        const courseRating = Object.fromEntries(userInfo.entries()).courseRating
        const subject = Object.fromEntries(userInfo.entries()).subject
        let givenBy = Object.fromEntries(userInfo.entries()).givenBy
        const img = Object.fromEntries(userInfo.entries()).img
        const videoPreview = Object.fromEntries(userInfo.entries()).videoPreview
        const reviews = Object.fromEntries(userInfo.entries()).reviews
        const videoLink = [subtitle1Video, subtitle2Video, subtitle3Video];
        const subtitles = [[subtitle1, subtitle1VideoDescription], [subtitle2, subtitle2VideoDescription], [subtitle3, subtitle3VideoDescription]];

        axios.get('http://localhost:3001/getUsername', { withCredentials: true }).then(response => {
            givenBy = response.data.user;
        });

        axios.post('http://localhost:3001/add-course', {
            title: title,
            subtitle: subtitles,
            price: price,
            img: img,
            videoLinks: videoLink,
            description: description,
            totalHours: totalHours,
            rating: courseRating,
            subject: subject,
            givenBy: givenBy,
            videoPreview: videoPreview,
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
            <ResponsiveNavBar pages={pages} />
            <form onSubmit={handleSubmit}>
                <Stack direction={'row'}>
                    <Stack style={{ width: '90%' }} spacing={1.5} direction="column"
                        justifyContent="space-evenly"
                        alignItems="baseline" marginTop={1.5} marginLeft={1.5}>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            placeholder="eg. Math 3"
                            multiline
                            style={{ width: '35%' }}
                        />
                        <TextField
                            id="price"
                            name="price"
                            label="Price"
                            //placeholder="eg. Exam 1"
                            multiline
                            style={{ width: '35%' }}
                        />
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            //placeholder="eg. Exam 1"
                            multiline
                            style={{ width: '35%' }}
                        />
                        <TextField
                            id="totalHours"
                            name="totalHours"
                            label="Total Hours"
                            //placeholder="eg. Exam 1"
                            multiline
                            style={{ width: '35%' }}
                        />
                        <TextField
                            id="subject"
                            name="subject"
                            label="Subject"
                            placeholder="eg. Math"
                            multiline
                            style={{ width: '35%' }}
                        />
                        <TextField
                            id="givenBy"
                            name="givenBy"
                            label="Given By"
                            //placeholder="eg. Exam 1"
                            multiline
                            style={{ width: '35%' }}
                        />

                        <TextField
                            id="img"
                            name="img"
                            label="Course Image"
                            //placeholder="eg. Exam 1"
                            multiline
                            style={{ width: '35%' }}
                        />

                        <TextField
                            id="videoPreview"
                            name="videoPreview"
                            label="Course Video Preview"
                            //placeholder="eg. Exam 1"
                            style={{ width: '95%' }}
                        />

                    </Stack>
                    <div style={{ width: '100%' }}>

                        <Stack spacing={5} direction={'column'}>
                            <Stack spacing={3} direction={'column'}>
                                <Stack spacing={1.5} direction={'row'}>
                                    <TextField style={{ width: "50%", marginLeft: "25%", marginTop: "2%" }}
                                        id="subtitle1"
                                        name="subtitle1"
                                        label="Subtitle 1"
                                        placeholder="Introduction To Game Course"
                                    />

                                </Stack>

                                <Stack spacing={1.5} direction={'row'}>
                                    <TextField style={{ width: "75%" }}
                                        id="subtitle1VideoLink"
                                        name="subtitle1Video"
                                        label="Subtitle 1 Video Link"
                                    />

                                    <TextField style={{ width: "22%" }}
                                        id="subtitle1VideoDescription"
                                        name="subtitle1VideoDescription"
                                        label="Subtitle 1 Video Description"
                                    />
                                </Stack>
                            </Stack>
                            <Stack spacing={3} direction={'column'}>
                                <Stack spacing={1.5} direction={'row'}>
                                    <TextField style={{ width: "50%", marginLeft: "25%", marginTop: "2%" }}
                                        id="subtitle2"
                                        name="subtitle2"
                                        label="Subtitle 2"
                                        placeholder="Introduction To Game Course"
                                    />

                                </Stack>

                                <Stack spacing={1.5} direction={'row'}>
                                    <TextField style={{ width: "75%" }}
                                        id="subtitle2VideoLink"
                                        name="subtitle2Video"
                                        label="Subtitle 2 Video Link"
                                    />

                                    <TextField style={{ width: "22%" }}
                                        id="subtitle2VideoDescription"
                                        name="subtitle2VideoDescription"
                                        label="Subtitle 2 Video Description"
                                    />
                                </Stack>
                            </Stack>
                            <Stack spacing={3} direction={'column'}>
                                <Stack spacing={1.5} direction={'row'}>
                                    <TextField style={{ width: "50%", marginLeft: "25%", marginTop: "2%" }}
                                        id="subtitle3"
                                        name="subtitle3"
                                        label="Subtitle 3"
                                        placeholder="Introduction To Game Course"
                                    />

                                </Stack>

                                <Stack spacing={1.5} direction={'row'}>
                                    <TextField style={{ width: "75%" }}
                                        id="subtitle3VideoLink"
                                        name="subtitle3Video"
                                        label="Subtitle 3 Video Link"
                                    />

                                    <TextField style={{ width: "22%" }}
                                        id="subtitle3VideoDescription"
                                        name="subtitle3VideoDescription"
                                        label="Subtitle 3 Video Description"
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </div>
                </Stack>

                <FormGroup>
                    <FormControlLabel sx={{ marginLeft: 11, marginTop: 1 }} control={<Checkbox />} label={<div>
                        <span>I accept the contract's </span>
                        <Link href='/instructor-terms'>terms of use</Link>
                        <span>.</span>
                    </div>
                    } />
                </FormGroup>
                <button className="ms-2 mt-1 btn btn-primary">Add Course</button>
            </form>
        </>
    )
}

export default AddCourse