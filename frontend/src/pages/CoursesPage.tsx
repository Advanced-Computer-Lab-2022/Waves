import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";

const CoursePage = (props: any) => {
    const [courses, setCourses] = React.useState<any[]>([]);
    const [pages, setPages] = React.useState<string[]>();
    const [isNotLoggedIn, setIsNotLoggedIn] = React.useState<boolean>(true);

    const adminPages = ['All Courses', 'Instructors', 'Corporate Trainees', 'Add User', 'About Us'];
    const instructorPages = ['My Courses', 'All Courses', 'Add Course', 'Add Exam', 'Review Rating', 'About Us'];
    const individualPages = ['My Courses', 'All Courses', 'About Us'];
    const corporatePages = ['My Courses', 'All Courses', 'About Us'];
    const guestPages = ['All Courses', 'About Us'];
    useEffect(() => {

        axios.get('http://localhost:3001/getCourses').then(response => {
            setCourses(response.data);
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

            else{
                setPages(guestPages);
                setIsNotLoggedIn(true);
            }
        })
    }, []);

    const filterCourses = (filteredCourses: any) => { setCourses(filteredCourses) }
    return (
        <>
            <ResponsiveNavBar isNotLoggedIn={isNotLoggedIn} pages={pages} />
            <Stack marginTop={0.6} direction={"row"}>
                <FilterBar setCourses={filterCourses} />
                <Courses courses={courses} />
            </Stack>
            <p />
            <Footer />
        </>
    )
}

export default CoursePage
