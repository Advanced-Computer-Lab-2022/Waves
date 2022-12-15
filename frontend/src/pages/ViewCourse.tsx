import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingRead from '../components/RatingRead';
import { Rating, Stack } from '@mui/material';
//var Blur = require('react-blur');
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import { Link, useLocation } from "react-router-dom";
import CourseContent from '../components/CourseContent';

const pages = ['Courses', 'Instructors', 'Add User', 'About Us'];

const ViewCourse = (props: any) => {
    const location = useLocation();
    const course = location.state?.data;

    const [instructorRating, setInstructorRating] = React.useState(0);
    const [courseRating, setCourseRating] = React.useState(0);

    return (
        <>
            <ResponsiveNavBar pages={pages} />

            <img src={course.courseImg} style={{ width: 1270, height: 200 }} />
            
            <CourseContent course={course} />

            <Stack direction={'row'}>
                <Card sx={{ minWidth: '50%' }}>
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
                                <div />
                                <Stack marginTop={1.5}></Stack>

                            </Typography>
                        </Stack>
                        <Stack marginTop={1.5}>
                            <Typography variant="body2" color="text.secondary">
                                Total Hours :
                                {" " + course.courseTotalHours}
                            </Typography>
                        </Stack>
                        <RatingRead rating={course.courseRating} />
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
                            <Button variant="contained">
                                <Link to="/payment-information" style={{textDecoration: 'none', color: 'white'}} state={{ data: [course.courseName, course.coursePrice]}} className="link">
                                    Purchase Course
                                </Link>
                            </Button>
                        </Stack>

                    </CardContent>
                </Card>
                <div style={{ marginLeft: '1%', minWidth: '50%' }}>
                    <Typography marginTop={4} marginBottom={1} fontSize={35}>Instructor: {course.courseInstructor}</Typography>
                    <Typography marginBottom={1} fontSize={25} component="legend">Rate Instructor</Typography>
                    <Rating
                        size='large'
                        name="simple-controlled"
                        value={instructorRating}
                        onChange={(event, newValue) => {
                            setInstructorRating(newValue ? newValue : 0);
                        }}
                    />
                    <Typography marginTop={4} marginBottom={1} fontSize={35}>Course Name: {course.courseName}</Typography>
                    <Typography marginBottom={1} fontSize={25} component="legend">Rate Course</Typography>
                    <Rating
                        size='large'
                        name="simple-controlled"
                        value={courseRating}
                        onChange={(event, newValue) => {
                            setCourseRating(newValue ? newValue : 0);
                        }}
                    />
                </div>
            </Stack>
            <Typography marginTop={2} gutterBottom variant="h5" component="div">
                Reviews
            </Typography>
            <div
                style={{
                    marginTop: 10,
                    backgroundColor: 'rgb(25, 25, 25)',
                    height: '300px'
                }}
            >

            </div>
        </>
    )
}

export default ViewCourse