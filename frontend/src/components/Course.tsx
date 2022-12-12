import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grid, Rating, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


interface props {
  courseName: string;
  courseDescription: string;
  coursePrice: string;
  courseRating: Array<number>;
  courseInstructor: string;
  courseSubject: string;
  courseTotalHours: string;
  courseImg: string;
  courseSubtitles: Array<String>;
  courseVideoLinks: Array<String>;
  courseVideoPreview: string;
  noPrice?: boolean;
  children?: React.ReactNode;
  customChild?: React.ReactNode;
}

const Course: React.FC<props> = ({ courseName, coursePrice, courseDescription, courseSubject, courseRating, courseInstructor, courseTotalHours, courseImg, courseSubtitles, courseVideoLinks, courseVideoPreview, noPrice }) => {

  const navigate = useNavigate();

  const course = { courseName: courseName, coursePrice: coursePrice, courseDescription: courseDescription, courseSubject: courseSubject, courseRating: courseRating, courseInstructor: courseInstructor, courseTotalHours: courseTotalHours, courseImg: courseImg, courseSubtitles: courseSubtitles, courseVideoLinks: courseVideoLinks, courseVideoPreview: courseVideoPreview };

  return (
    <Card sx={{ minWidth: 350, maxWidth: 350, minHeight: 480, maxHeight: 480 }}>
      <CardActionArea sx={{ minWidth: 350, maxWidth: 350, minHeight: 480, maxHeight: 480 }} onClick={() => {
        navigate('../viewCourse',
          {
            state: {
              data: course
            }
          }
        )
      }}>
        <div>
          <CardMedia
            component="img"
            height="170"
            image={courseImg}
            alt={courseName}
            style={{ alignSelf: 'start', justifySelf: 'start' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {courseName}
            </Typography>
            <Typography variant="body2">
              {courseDescription}
            </Typography>
            <p />
            <Typography variant="body2" color="grey">
              {"• Given by " + courseInstructor}
            </Typography>
            <p />

            <Typography variant="body2" color="grey">
              {"• Subject " + courseSubject}
            </Typography>

            <p />
            <Typography variant="body2" color="grey">
              {" • " + courseTotalHours + " Total Hours"}
            </Typography>

            <p />
            <Typography variant="body2" color="grey">
            </Typography>
            <Typography component="legend">Rating</Typography>
            <Stack alignItems={'end'} direction="row">
              <Typography style={{ maxWidth: '40px' }} marginTop={0.25} color="orange" component="legend">{courseRating[0]}</Typography>
              <Rating name="read-only" value={courseRating[0]} readOnly precision={0.1} />
              <Typography marginLeft={1} marginTop={0.25} color="grey" variant="body2" component="legend">{"(" + courseRating[1] + ")"}</Typography>
              {noPrice ? <></>
                : <Typography style={{ justifySelf: 'end', alignSelf: 'end' }} variant="h6" color="green">
                  {coursePrice}
                </Typography>}
            </Stack>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}

export default Course;