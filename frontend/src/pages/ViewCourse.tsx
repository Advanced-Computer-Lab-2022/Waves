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

const ViewCourse = (props:any) => {
    const location = useLocation();
    const data = location.state?.data;
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

            <img src={data[6]} style={{width: 1270, height: 200}}/>

            <Card sx={{ maxWidth: 585 }}>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {data[0]}
            </Typography>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                {data[7]}  
            </Typography>
            </Stack>
            <Stack marginTop={1.5}>
            <Typography variant="h6" color="text.secondary">
                {data[2]} 
                <div/>
                <Stack marginTop={1.5}></Stack>
               
            </Typography>
            </Stack>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                Total Hours :  
                {" " + data[5]}  
            </Typography>
            </Stack>
            <RatingRead rating={data[3]}/>
            <Stack marginTop={1.5}>
            <Typography variant="body2" color="text.secondary">
                {data[4]} 
            </Typography>
            </Stack>
            <Stack marginTop={1.5}></Stack>
            <Typography variant="body2" color="text.secondary">
                {data[1]} 
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