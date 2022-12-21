import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";

const MyCourses = (props: any) => {
    const [courses, setCourses] = React.useState<any[]>([]);
    const [pages, setPages] = React.useState<string[]>();
    const [isNotLoggedIn, setIsNotLoggedIn] = React.useState<boolean>(true);
    const [username, setUsername] = React.useState<string>();
    const [courseTitles, setCourseTitles] = React.useState<Array<string>>();
    const [type, setType] = React.useState<string>();

    const adminPages = ['All Courses', 'Instructors', 'Corporate Trainees', 'Add User', 'About Us'];
    const instructorPages = ['My Courses', 'All Courses', 'Add Course', 'Add Exam', 'Review Rating', 'About Us'];
    const individualPages = ['My Courses', 'All Courses', 'About Us'];
    const corporatePages = ['My Courses', 'All Courses', 'About Us'];
    const guestPages = ['All Courses', 'About Us'];

    useEffect(() => {

        axios.get('http://localhost:3001/getUsername', { withCredentials: true }).then(response => {
            setUsername(response.data);
        })

        axios.get('http://localhost:3001/getMyCourses', { withCredentials: true }).then(response => {
            setCourseTitles(response.data);
        })

        axios.get('http://localhost:3001/getType', { withCredentials: true }).then(response => {

            if (response.data == 'admin') {
                setPages(adminPages);
                setIsNotLoggedIn(false);
            }

            else if (response.data == 'instructor') {
                setPages(instructorPages);
                setIsNotLoggedIn(false);
            }

            else if (response.data == 'individualTrainee') {
                setPages(individualPages);
                setIsNotLoggedIn(false);
            }

            else if (response.data == 'corporateTrainee') {
                setPages(corporatePages);
                setIsNotLoggedIn(false);
            }

            else {
                setPages(guestPages);
                setIsNotLoggedIn(true);
            }
            setType(response.data)
        })
    }, []);

    return (
        <>
            <ResponsiveNavBar isNotLoggedIn={isNotLoggedIn} pages={pages} />
            <Stack sx={{ minWidth: '100%', width: '122rem' }} className="grad" marginTop={0.3} direction={"row"}>
                <FilterBar type={type} username={username} setCourses={setCourses} courseTitles={courseTitles} />
                <span className="vertical-line"></span>
                <Courses noPrice={true} courses={courses} />
            </Stack>
            <p />
            <Footer />
        </>
    )
}

export default MyCourses
