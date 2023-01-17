import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import Container from '@mui/material/Container';
import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, List, ListItemButton, ListItemText, Radio, RadioGroup, Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Card from "../components/ExamCard";
import Card2 from '@mui/material/Card';
import FilterBar from "../components/FilterBar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { response } from 'express';

const ExamSession = (props:any) => {
    var answersForExam: string[]=[];
    //answersForExam.push("A")
    // answersForExam.push("B")
    // answersForExam.push("C")
    // answersForExam.push("D")
    //fifo.pop()
    //(fifo:any)[0]
    //const navigate = useNavigate();
    const [examsQuestions, setExamQuestions] = React.useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [answers, setAnswers] = React.useState([""]);
    const [values, setValue] = React.useState('');
    //var [score, setScore] = React.useState(0);
    const [error, setError] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [helperText, setHelperText] = React.useState('Choose wisely');
    const location = useLocation();
    const data = location.state?.data;
    let flag=0;

    const optionClicked = (ansGiven: string, solution: string) => {  
      if(ansGiven==solution) {setScore(score + 1)}
    }
    
    axios.post('http://localhost:3001/exam-session', {
            belongsToCourse: data.belongsToCourse ,
            name: data.name 
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
              padding:10 
            }

    return (
        <>
        <Stack marginTop={5} marginLeft={40} direction="column">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 15 }}>
                <Card2 style={cardStyle}>
                    {examsQuestions && examsQuestions.map((examsQuestion) => (
                        <Grid key={examsQuestion._id} marginTop={2} item xs={2} sm={4} md={4}>  
                            <Stack direction="column" marginLeft={10}>
                            question: {examsQuestion.question} 
                            <div/>
                            <List>
                            <ListItemButton component="a" onClick={() => optionClicked('A',examsQuestion.solution)}>
                                <ListItemText primary={examsQuestion.c1} />
                            </ListItemButton>
                            <ListItemButton component="a" onClick={() => optionClicked('B',examsQuestion.solution)}>
                                <ListItemText primary={examsQuestion.c2} />
                            </ListItemButton>
                            <ListItemButton component="a" onClick={() => optionClicked('C',examsQuestion.solution)}>
                                <ListItemText primary={examsQuestion.c3} />
                            </ListItemButton>
                            <ListItemButton component="a" onClick={() => optionClicked('D',examsQuestion.solution)}>
                                <ListItemText primary={examsQuestion.c4} />
                            </ListItemButton>
                            </List>                       
                            </Stack>     
                        </Grid>
                    ))}
                    </Card2>
                </Grid>
            </Stack>
            <Stack marginTop={4}></Stack>
            <Button variant="contained">
              <Link  to="/results" style={{textDecoration: 'none', color: 'white'}} state={{ data: {score:score ,totalQuestions:examsQuestions.length, belongsToCourse:data.belongsToCourse, name:data.name}}} className="link">
                Submit results
              </Link>
            </Button>
            
            
            <p/>
            <Footer></Footer>
        </>
    )
                    
}

export default ExamSession