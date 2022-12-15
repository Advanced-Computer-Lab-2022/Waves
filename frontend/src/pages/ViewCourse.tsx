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
import Footer from '../components/Footer';

const pages = ['Courses', 'Instructors', 'Add User', 'About Us'];

const background: React.CSSProperties = {
    backgroundImage: `url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0ea6dc6b-661f-483c-a9ef-eac204799228/d4ugudv-7f412932-3e06-4cd3-a2c8-b57f398f59d1.jpg/v1/fill/w_1600,h_659,q_75,strp/gray_website_background_by_maruron_d4ugudv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjU5IiwicGF0aCI6IlwvZlwvMGVhNmRjNmItNjYxZi00ODNjLWE5ZWYtZWFjMjA0Nzk5MjI4XC9kNHVndWR2LTdmNDEyOTMyLTNlMDYtNGNkMy1hMmM4LWI1N2YzOThmNTlkMS5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.i5u4A7oBQ756gcNRl72YJkQaA4RQdC5X9-1Wi5HGrhI')`
}

const ViewCourse = (props: any) => {
    const location = useLocation();
    const course = location.state?.data;

    const [instructorRating, setInstructorRating] = React.useState(0);
    const [courseRating, setCourseRating] = React.useState(0);

    return (
        <div style={background}>
            <ResponsiveNavBar pages={pages} />
            <Stack direction={'row'} marginBottom={2} marginTop={2} >
                <Stack direction={'column'} marginLeft={'auto'} marginBottom={2} marginTop={2} >

                    <Typography marginTop={'auto'} marginBottom={'auto'} fontFamily={'Cairo'} color={'rgb(200,200,200)'} fontSize={60}>{course.courseName}</Typography>
                    <Typography marginTop={'auto'} marginBottom={'auto'} fontFamily={'Cairo'} color={'rgb(200,200,200)'} fontSize={60}>{"Given By " + course.courseInstructor}</Typography>
                </Stack>
                <img src={course.courseImg} style={{ borderRadius: '30px', border: 'solid rgb(170,170,170) 5px', marginRight: '5%', width: '35%', height: '20%', marginLeft: 'auto' }} />
            </Stack>
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
            <Footer />
        </div>
    )
}

export default ViewCourse