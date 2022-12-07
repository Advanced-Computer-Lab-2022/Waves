import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grid, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import RatingRead from './RatingRead';


interface props {
  courseName: string;
  courseDescription: string;
  coursePrice: string;
  courseRating: Array<number>;
  courseInstructor: string;
  courseTotalHours: string;
  courseImg: string;
  courseSubtitles: Array<String>;
  children?: React.ReactNode;
  customChild?: React.ReactNode;
}

const Course: React.FC<props> = ({courseName, coursePrice, courseDescription, courseRating, courseInstructor, courseTotalHours, courseImg, courseSubtitles}) => {

  const navigate = useNavigate();

  const course = {courseName: courseName, coursePrice: coursePrice, courseDescription: courseDescription, courseRating: courseRating, courseInstructor: courseInstructor, courseTotalHours: courseTotalHours, courseImg: courseImg, courseSubtitles:courseSubtitles};

  return (
    <Card sx={{ maxWidth: 350, minHeight: 440}}>
      <CardActionArea onClick={() => {navigate('../viewCourse', 
      
      {
        state: {
          //course: [courseName, coursePrice, courseDescription, courseRating, courseInstructor, courseTotalHours, courseImg, courseSubtitles]
          data: course
        }
      }
      )}}>
        <CardMedia
          component="img"
          height="170"
          image= {courseImg}
          alt={courseName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {courseName}
          </Typography>
          <Typography variant="body2">
            {courseDescription}
          </Typography>
          <p/>
          <Typography variant="body2" color="grey">
            {"Given by " + courseInstructor + " • " + courseTotalHours + " Total Hours • " + courseSubtitles![0] + " Subtitle"}
          </Typography>
          <p/>
          <Typography variant="body2" color="grey">
          </Typography>
          <Stack direction="row">
          <RatingRead rating={courseRating}/>
          <Box sx={{marginLeft: 5, justifyContent:'end', display: 'flex', alignItems: 'flex-end'}}>
            <Typography variant="h6" color="green">
              {coursePrice}
            </Typography>
          </Box>
          </Stack>
        </CardContent>
        </CardActionArea>
    </Card>
  );
}

export default Course;