import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import RatingRead from '../components/RatingRead';
import { Stack } from '@mui/material';
//var Blur = require('react-blur');

const ViewCourse = (props:any) => {
    return (
        <>
            <ResponsiveNavBar/>

            {/* <div
                style={{
                    backgroundColor: 'rgb(25, 25, 25)',
                    height: '250px'
                }}
            >      
            
            </div> */}
            {/* <img src={require('./PhysicsCourse.jpg')} style={{width: 1270, height: 200}}>
            </img> */}
            <Card sx={{ maxWidth: 585 }}>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Course Name
            </Typography>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                Subtitle:  
            </Typography>
            </Stack>
            <Stack marginTop={1.5}>
            <Typography variant="h6" color="text.secondary">
                Summary: 
                <div/>
                <Stack marginTop={1.5}></Stack>
                Learn Unity in C# & Code Your First Five 2D Video Games for Web, Mac & PC. The Tutorials Cover Tilemap
            </Typography>
            </Stack>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                Total Hours:  
            </Typography>
            </Stack>
            <RatingRead rating={[]}/>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                Given By : 
            </Typography>
            </Stack>
            <Stack marginTop={1.5}></Stack>
            <Typography variant="body2" color="text.secondary">
                Price : 
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
            />
            <Typography gutterBottom variant="h5" component="div">
                Reviews
            </Typography>      
        </>
    )
}

export default ViewCourse