import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import RatingRead from './RatingRead';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image="/GameCourse.jpg"
          alt="Game Course"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Game Course
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Build Combat for Role Playing Game (RPG) in Unity. Tutorials Cover Code Architecture & Video Game Design.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Course
        </Button>
        <RatingRead/>
      </CardActions>
    </Card>
  );
}