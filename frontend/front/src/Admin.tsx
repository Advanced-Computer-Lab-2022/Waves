import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar";
// import LoggedInNavbar from "./LoggedInNavbar";

const Admin = (props:any) => {
    const [courses, setCourses] = React.useState<any[]>([]);

    useEffect(() => {
    axios.get('http://localhost:3001/admin').then (response => {
        setCourses(response.data);
        console.log(response.data);
        })
    }, []);

    return (
        <>  
            <LoggedInNavbar/>
            <p>
            {courses && courses.map((course) => (
                <p key={course._id}>{course.title} {course.subtitle}</p>
            ))}
            </p>  
        </>
    )
}

export default Admin