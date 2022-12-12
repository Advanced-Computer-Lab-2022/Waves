import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Stack} from '@mui/material';
import {useNavigate } from 'react-router-dom';
import CoursesAutocomplete from './CoursesAutocomplete';


interface props {
    profilePic?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    courses?: Array<string>;
}

const User: React.FC<props> = ({ username, email, firstName, lastName, profilePic, courses }) => {

    const user = { username: username, email: email, firstName: firstName, lastName: lastName, profilePic: profilePic, courses: courses };

    function grantCourseAccess() {
        
    }

    return (
        <Card sx={{ marginLeft:'5px', minWidth: 350, maxWidth: 350, minHeight: 480, maxHeight: 480 }}>
                <div>
                    <Avatar
                        sx={{ width: '125px', height: '125px', alignSelf: 'center', justifySelf: 'center', marginLeft:'112.5px', marginBottom:'10px' }}
                        alt={'Profile Pic'}
                        src={profilePic} />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {user.username}
                        </Typography>
                        <Typography variant="body2">
                            {user.firstName + " " + user.lastName}
                        </Typography>
                        <p />
                        <Typography variant="body2" color="grey">
                            {user.email}
                        </Typography>
                        <p />
                        {user.courses && user.courses.map((course: any) => (
                            <Typography variant="body2" color="grey">
                                {course}
                                <p />
                            </Typography>
                        ))}
                        <CoursesAutocomplete/>
                        <Stack marginLeft={'15px'} marginTop={'20px'} spacing={'20px'} direction={'row'}>
                            <Button onClick={grantCourseAccess} variant='outlined' color='primary'>Grant Access</Button>
                            <Button variant='outlined' color='error'>Ban User</Button>
                        </Stack>
                    </CardContent>
                </div>
        </Card >
    );
}

export default User;