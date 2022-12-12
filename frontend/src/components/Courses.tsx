import {Grid } from "@mui/material";
import Course from "./Course";

const Courses = (props:any) => {


    return(
        <Grid container columnSpacing={{ xs: 2, sm:5, md: 45, lg: 45 }} rowSpacing={{ xs: 2, md: 2 }} columns={{sm: 7, md: 14, lg: 24 }}>
        {props.courses && props.courses.map((course:any) => (
            <Grid marginTop={2} item xs={2} sm={4} md={5} key={course._id}>
                <Course noPrice = {props.noPrice} courseName={course.title} courseDescription={course.description} courseSubject={course.subject} courseRating={course.rating} courseImg={course.img} courseInstructor={course.givenBy} courseTotalHours={course.totalHours} courseSubtitles={course.subtitles} coursePrice={"$" +course.price} courseVideoLinks ={course.videoLinks} courseVideoPreview= {course.videoPreview}/>
            </Grid>
        ))}
        </Grid>
    )
}

export default Courses