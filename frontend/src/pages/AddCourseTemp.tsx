import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import ResponsiveNavBar from '../components/ResponsiveNavBar';
import AddExerciseDialog from './AddExerciseDialog';

/*<Copyright sx={{ mt: 5 }} />  return to line 122      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
          </Avatar>53 and 55 <LockOutlinedIcon /> line 54*/
/*function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}*/
/*<Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>*/

//    InstructorController.addCourse(req.body.courseTitle, req.body.courseSubject, req.body.username, req.body.courseSummary, req.body.courseSubtitles, req.body.coursePrice, req.body.previewLink);

// {choices: [], correctAnswerIndex:number}[]

export default function AddCourse() {
  const [title, setTitle] = React.useState();
  const [price, setPrice] = React.useState();
  const [totalHours, setTotalHours] = React.useState();
  const [summary, setsummary] = React.useState();
  const [subject, setSubject] = React.useState();

  const [preview, setPreview] = React.useState();
  const [image, setImage] = React.useState();
  const [subtitle1, setSubtitle1] = React.useState();
  const [subtitle2, setSubtitle2] = React.useState();
  const [subtitle3, setSubtitle3] = React.useState();

  const [subtitleDescription1, setSubtitleDescription1] = React.useState();
  const [subtitleDescription2, setSubtitleDescription2] = React.useState();
  const [subtitleDescription3, setSubtitleDescription3] = React.useState();

  const [subtitleVideo1, setSubtitleVideo1] = React.useState();
  const [subtitleVideo2, setSubtitleVideo2] = React.useState();
  const [subtitleVideo3, setSubtitleVideo3] = React.useState();

  const [questions1, setQuestions1] = React.useState([]); //should be setExercise
  const [questions2, setQuestions2] = React.useState([]);
  const [questions3, setQuestions3] = React.useState([]);
  console.log(questions1);
  console.log(questions2);
  console.log(questions3);

  const handleChange = (event:any) => {
    setSubject(event.target.value);
  };


  function handleSubmit() {
    axios.post('http://localhost:3001/addCourse', {
      courseTitle: title,
      coursePrice: price,
      courseTotalHours: totalHours,
      courseSummary: summary,
      courseSubject: subject,
      previewLink: preview,
      courseImage: image,
      courseSubtitles: [subtitle1, subtitle2, subtitle3],
      subtitleDescriptions: [subtitleDescription1, subtitleDescription2, subtitleDescription3],
      subtitleVideos: [subtitleVideo1, subtitleVideo2, subtitleVideo3],
      examQuestions: [questions1, questions2, questions3]
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        withCredentials: true
      }
    })
      .then(response => {
        console.log(response);
      });
  }

  return (
    <>
      <ResponsiveNavBar />
      <Container component="main" maxWidth="xs">
        <a href='dsa'></a>

        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Add Course
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  autoComplete="given-name"
                  name="courseTitle"
                  required
                  fullWidth
                  id="courseTitle"
                  label="Course Title"
                  onChange={(e:any) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  type="number"
                  label="Price"
                  name="price"
                  onChange={(e:any) => setPrice(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  id="totalHours"
                  type="number"
                  label="Total Hours"
                  name="totalHours"
                  onChange={(e:any) => setTotalHours(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="summary"
                  label="Summary"
                  name="summary"
                  autoComplete="summary"
                  onChange={(e:any) => setsummary(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subject}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
                    <MenuItem value={'Math'}>Math</MenuItem>
                    <MenuItem value={'Physics'}>Physics</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="preview"
                  label="Image"
                  type="preview"
                  id="preview"
                  autoComplete="new-password"
                  onChange={(e:any) => setImage(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="preview"
                  label="Preview Link"
                  type="preview"
                  id="preview"
                  autoComplete="new-password"
                  onChange={(e:any) => setPreview(e.target.value)}
                />
              </Grid>
              <Stack direction={'row'}>
              </Stack>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="subtitle1"
                  label="Subtitle 1"
                  type="subtitle"
                  id="sub1"
                  onChange={(e:any) => setSubtitle1(e.target.value)}
                />

                <AddExerciseDialog buttonName={'Exercise 1'} questions={questions1} setQuestions={setQuestions1} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="preview"
                  label="Description"
                  type="preview"
                  id="dis1"
                  onChange={(e:any) => setSubtitleDescription1(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="preview"
                  label="Video"
                  type="preview"
                  id="vid1"
                  onChange={(e:any) => setSubtitleVideo1(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="subtitle2"
                  label="Subtitle 2"
                  type="subtitle"
                  id="sub2"
                  onChange={(e:any) => setSubtitle2(e.target.value)}

                />
                <AddExerciseDialog buttonName={'Exercise 2'} questions={questions2} setQuestions={setQuestions2} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="preview"
                  label="Description"
                  type="preview"
                  id="dis2"
                  onChange={(e:any) => setSubtitleDescription2(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="preview"
                  label="Video"
                  type="preview"
                  id="vid2"
                  onChange={(e:any) => setSubtitleVideo2(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="subtitle3"
                  label="Subtitle 3"
                  type="subtitle"
                  id="sub3"
                  onChange={(e:any) => setSubtitle3(e.target.value)}
                />
                <AddExerciseDialog buttonName={'Exercise 3'} questions={questions3} setQuestions={setQuestions3} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="preview"
                  label="Description"
                  type="preview"
                  id="dis3"
                  onChange={(e:any) => setSubtitleDescription3(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="preview"
                  label="Video"
                  type="preview"
                  id="vid3"
                  onChange={(e:any) => setSubtitleVideo3(e.target.value)}
                />
              </Grid>

            </Grid>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label={<div>
                <span>I accept the contract's </span>
                <Link href='/contractTerms'>terms of use</Link>
                <span>.</span>
              </div>
              } />
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ >
  );
}