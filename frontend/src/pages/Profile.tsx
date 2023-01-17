import { Rating, Typography } from '@mui/material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Profile = (props: any) => {

    const [instructorRating, setInstructorRating] = React.useState(0);

    axios.get('http://localhost:3001/getInstructorRating',{ withCredentials: true }).then(response => {
        setInstructorRating(response.data);
    });

    return (
        <>
            <Typography component="legend">Your Rating</Typography>
            <Rating name="read-only" value={instructorRating} readOnly />
        </>
    )
}

export default Profile