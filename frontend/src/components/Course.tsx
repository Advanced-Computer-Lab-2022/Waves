import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Rating, Stack, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  courseDiscount: number;
  currencySlice: number;
  noPrice?: boolean;
  children?: React.ReactNode;
  customChild?: React.ReactNode;
}

const Course: React.FC<props> = ({ courseName, coursePrice, courseDescription, courseSubject, courseRating, courseInstructor, courseTotalHours, courseImg, courseSubtitles, courseVideoLinks, courseVideoPreview, courseDiscount, noPrice, currencySlice }) => {

  const navigate = useNavigate();

  const course = { courseName: courseName, coursePrice: coursePrice, courseDescription: courseDescription, courseSubject: courseSubject, courseRating: courseRating, courseInstructor: courseInstructor, courseTotalHours: courseTotalHours, courseImg: courseImg, courseSubtitles: courseSubtitles, courseVideoLinks: courseVideoLinks, courseVideoPreview: courseVideoPreview, courseDiscount: courseDiscount, currencySlice: currencySlice };

  const [type, setType] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [percent, setPercent] = React.useState("");
  const [duration, setDuration] = React.useState("");

  if (courseDiscount == 0) {
    var priceStyle = { justifySelf: 'end', alignSelf: 'end', textDecorationLine: '' }
  }
  else {
    priceStyle = { justifySelf: 'end', alignSelf: 'end', textDecorationLine: 'line-through' }
  }

  var regPriceStyle = {
    justifySelf: 'end',
    alignSelf: 'end'
  }

  const add = () => {
    axios.put('http://localhost:3001/add-discount', {
      courseName: course.courseName,
      discountPercentage: percent,
      discountDuration: duration
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        
      });
  }

  React.useEffect(() => {

    axios.get('http://localhost:3001/getType', { withCredentials: true }).then(response => {

      if (response.data == 'admin' || response.data == 'instructor') {
        setType(1);
      }
    })

  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ backgroundColor: 'rgb(180,180,180)', minWidth: 350, maxWidth: 350, minHeight: 480, maxHeight: 580 }}>
      <CardActionArea sx={{ minWidth: 350, maxWidth: 350, minHeight: 480, maxHeight: 580 }} onClick={() => {
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
            <Typography variant="body2" color="rgb(100,100,100)">
              {"• Given by " + courseInstructor}
            </Typography>
            <p />

            <Typography variant="body2" color="rgb(100,100,100)">
              {"• Subject " + courseSubject}
            </Typography>

            <p />
            <Typography variant="body2" color="rgb(100,100,100)">
              {" • " + courseTotalHours + " Total Hours"}
            </Typography>

            <p />
            <Typography variant="body2" color="rgb(100,100,100)">
            </Typography>
            <Typography component="legend">Rating</Typography>
            <Stack direction="row">
              <Typography style={{ maxWidth: '40px', color: "rgb(200,150,0)" }} marginTop={0.25} component="legend">{courseRating[0]}</Typography>
              <Rating style={{ color: "rgb(200,150,0)" }} name="read-only" value={courseRating[0]} readOnly precision={0.1} />
              <Typography marginLeft={1} marginTop={0.25} color="rgb(100,100,100)" variant="body2" component="legend">{"(" + courseRating[1] + ")"}</Typography>
            </Stack>
            <br />
            <Stack alignItems={'end'} direction="column">
              <Typography style={regPriceStyle} variant="h6" color='rgb(150,40,40)'>
                {courseDiscount > 0 ? <>{coursePrice.slice(0,currencySlice)+""+((((courseDiscount / 100) * +coursePrice.slice(currencySlice).valueOf()) * (-1)) + (+coursePrice.slice(currencySlice)).valueOf()).toFixed(2)}</> : <></>}
              </Typography>
              {noPrice ? <></>
                : <Typography style={priceStyle} variant="h6" color='rgb(150,40,40)'>
                  {coursePrice}
                </Typography>}
            </Stack>
          </CardContent>
        </div>
      </CardActionArea>
      <Stack alignItems={'end'} direction="column">
        <Typography variant="h6" color='rgb(150,40,40)'>
          {type == 1 ? <Button variant="contained" style={{ width: '6vw' }} onClick={handleClickOpen}>Add Discount</Button> : <></>}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Discount to {course.courseName}</DialogTitle>
            <DialogContent>
              <Stack direction="column" spacing={1} marginTop={0.7}>
                <TextField id="outlined-basic" label="Discount Percentage" variant="outlined" onChange={(e) => setPercent(e.target.value)} />
                <TextField id="outlined-basic" label="Discount Duration (days)" variant="outlined" onChange={(e) => setDuration(e.target.value)} />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={add} href='/admin'>Add Discount</Button>
            </DialogActions>
          </Dialog>
        </Typography>
      </Stack>
    </Card>
  );
}

export default Course;