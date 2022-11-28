import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from './api/axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar";

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
            
        </>
    )
}

export default Admin