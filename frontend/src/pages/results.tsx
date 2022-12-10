import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import { Link } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ResponsiveNavBar from '../components/ResponsiveNavBar';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const Results = (props:any) => {
    const location = useLocation();
    const data = location.state?.data;
    
    const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];
    return (
        <>
            <ResponsiveNavBar pages={pagesArr}/>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align='center'>
                        Score : 
                    </Typography>
                    <Typography variant="h5" component="div" align='center'>
                        {data[0]} / {data[1]}
                    </Typography>
                </CardContent> 
            </Card>
            
        </>
    )
}

export default Results