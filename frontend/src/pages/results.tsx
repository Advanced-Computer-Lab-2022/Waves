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
import { Grid, List, ListItemButton, ListItemText, Stack } from '@mui/material';
import axios from 'axios';

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
    const [examsQuestions, setExamQuestions] = React.useState<any[]>([]);

    axios.post('http://localhost:3001/exam-session', {
            belongsToCourse: data[2] ,
            name: data[3] 
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
                setExamQuestions(response.data)
            });

            var cardStyle = {
                width: '50vw', 
              } 
    return (
        <>  
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
        <Stack marginTop={5} marginLeft={40} direction="column">
                <Card style={cardStyle}>
                    {examsQuestions && examsQuestions.map((examsQuestion) => (

                        <Grid key={examsQuestion._id} marginTop={2} item xs={2} sm={4} md={4} alignItems="center">
                            <Stack direction="column" marginLeft={2}>
                            <Card style={cardStyle}>
                            <Typography sx={{ fontSize: 30, mb: 1.5 }} component="div">
                            Question: {examsQuestion.question} 
                            </Typography>
                            <Typography sx={{ fontSize: 20, mb: 1.5 }} component="div">
                            Choice 1: {examsQuestion.c1} 
                            </Typography>
                            <Typography sx={{ fontSize: 20, mb: 1.5 }} component="div">
                            Choice 2: {examsQuestion.c2}
                            </Typography>
                            <Typography sx={{ fontSize: 20, mb: 1.5 }} component="div">
                            Choice 3: {examsQuestion.c3} 
                            </Typography>
                            <Typography sx={{ fontSize: 20, mb: 1.5 }} component="div">
                            Choice 4: {examsQuestion.c4}
                            </Typography>
                            <Typography sx={{ fontSize: 20, mb: 1.5 }} component="div">
                            Correct Solution: {examsQuestion.solution} 
                            </Typography>  
                            </Card>               
                            </Stack>                           
                        </Grid>                
                    ))}
                    </Card>
            </Stack>
        </>
    )
}

export default Results