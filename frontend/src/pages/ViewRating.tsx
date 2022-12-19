import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";

const Rating = (props:any) => {
    const [ratings, setRating] = React.useState<any[]>([]);
    const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

    useEffect(() => {
    axios.get('http://localhost:3001/view-rating').then (response => {
        setRating(response.data);
        console.log(response.data);
        })
    }, []);

    return (
        <>  
            <ResponsiveNavBar pages={pagesArr}/>
            <h1>{ratings}</h1>
            <p/>
            <Footer/>
        </>
    )
}

export default Rating