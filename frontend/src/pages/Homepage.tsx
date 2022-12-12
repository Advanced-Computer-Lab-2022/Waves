import { Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import ResponsiveNavBar from "../components/ResponsiveNavBar";

const Homepage = (props: any) => {

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getType', { withCredentials: true }).then(response => {
            console.log(response.data)
            if (response.data != 'notLoggedIn')
                navigate('/' + response.data);
        })
    }, []);

    const [courses, setCourses] = React.useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3001/admin').then(response => {
            setCourses(response.data);
            console.log(response.data);
        })
    }, []);

    const doSome = (filteredCourses: any) => { setCourses(filteredCourses) }
    const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

    return (
        <>
            <ResponsiveNavBar isNotLoggedIn={true} pages={pagesArr} />
            <Stack marginTop={0.6} direction={"row"}>
                <FilterBar setCourses={doSome} />
                <Courses courses={courses} />
            </Stack>
            <p />
            <Footer />
        </>
    )


}
export default Homepage;