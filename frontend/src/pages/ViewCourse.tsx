import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingRead from '../components/RatingRead';
import { Stack } from '@mui/material';
//var Blur = require('react-blur');
import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import {useLocation} from "react-router-dom";
import CourseContent from '../components/CourseContent';

const pages = ['Courses', 'Instructors', 'Add User', 'About Us'];

const ViewCourse = (props:any) => {
    const location = useLocation();
    const course = location.state?.data;
    return (
        <>
            <ResponsiveNavBar pages = {pages}/>

            <img src={course.courseImg} style={{width: 1270, height: 200}}/>

            <Card sx={{ maxWidth: 585 }}>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {course.courseName}
            </Typography>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                {course.courseSubtitles}  
            </Typography>
            </Stack>
            <Stack marginTop={1.5}>
            <Typography variant="h6" color="text.secondary">
                {course.courseDescription} 
                <div/>
                <Stack marginTop={1.5}></Stack>
               
            </Typography>
            </Stack>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                Total Hours :  
                {" " + course.courseTotalHours}  
            </Typography>
            </Stack>
            <RatingRead rating={course.courseRating}/>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                {course.courseInstructor} 
            </Typography>
            </Stack>
            <Stack marginTop={1.5}></Stack>
            <Typography variant="body2" color="text.secondary">
                {course.coursePrice} 
            </Typography>
            <Stack marginTop={1.5} direction="row" spacing={2}>
            <Button variant="contained">Add To Cart</Button>
            <Button variant="contained">Buy Now</Button>
            </Stack>

            </CardContent>
            </Card>
            <div
                style={{
                    backgroundColor: 'rgb(25, 25, 25)',
                    height: '150px'
                }}
                
            >
                <CourseContent course = {course}/>
            </div>
            <Typography gutterBottom variant="h5" component="div">
                Reviews
            </Typography>      
            <div
                style={{
                    backgroundColor: 'rgb(25, 25, 25)',
                    height: '300px'
                }}
            >
                
            </div>
        </>
    )
}

export default ViewCourse