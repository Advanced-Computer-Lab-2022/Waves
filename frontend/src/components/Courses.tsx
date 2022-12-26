import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import Course from "./Course";

const Courses = (props: any) => {
    let currencySymbol: string;
    let changeRate: number;
    let currencySlice: number;
    const [country, setCountry] = React.useState<string>();

    axios.get('http://localhost:3001/getCountry', { withCredentials: true }).then(response => {
        setCountry(response.data)
    });

    if(country=='Egypt'){
        currencySymbol='ج.م'
        changeRate=25
        currencySlice=3
    } 
    else if(country=='Germany'){
        currencySymbol='€'
        changeRate=0.94
        currencySlice=1
    } 
    else if(country=='United Kingdom'){
        currencySymbol='£'
        changeRate=0.8
        currencySlice=1
    } 
    else{
        currencySymbol='$'
        changeRate=1
        currencySlice=1
    } 
    
    return (
        <Grid style={{ paddingBottom: '30px' }} container columnSpacing={{ xs: 2, sm: 5, md: 45, lg: 45 }} rowSpacing={{ xs: 2, md: 2 }} columns={{ sm: 7, md: 14, lg: 24 }}>
            {props.courses && props.courses.map((course: any) => (
                <Grid marginTop={2} item xs={2} sm={4} md={5} key={course._id}>
                    <Course id={course._id} noPrice={props.noPrice} courseName={course.title} courseDescription={course.description} courseSubject={course.subject} courseRating={course.rating} courseImg={course.img} courseInstructor={course.givenBy} courseTotalHours={course.totalHours} courseSubtitles={course.subtitles} coursePrice={currencySymbol+""+(course.price*changeRate).toFixed(2)} courseVideoLinks={course.videoLinks} courseVideoPreview={course.videoPreview} courseDiscount={course.discountPercentage} currencySlice={currencySlice} courseReviews={course.reviews} courseReports={course.reports}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Courses