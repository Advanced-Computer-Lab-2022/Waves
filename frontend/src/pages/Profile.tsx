import { Rating, Typography } from '@mui/material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = (props: any) => {

    let instructorRating = 0;


    axios.get('http://localhost:3001/getInstructorRating').then(response => {
        instructorRating = response.data;
    });

    return (
        <>
            <Typography component="legend">Your Rating</Typography>
            <Rating name="read-only" value={instructorRating} readOnly />
        </>
    )
}

export default Profile