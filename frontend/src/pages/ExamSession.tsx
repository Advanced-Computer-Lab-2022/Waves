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
    const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];
    let fifo: string[]=[];
    fifo.push("A")
    fifo.push("B")
    fifo.push("C")
    fifo.push("D")
    //fifo.pop()
    //(fifo:any)[0]
    //const navigate = useNavigate();
    const [examsQuestions, setExamQuestions] = React.useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [answers, setAnswers] = React.useState(["A","B","C","D"]);
    const [values, setValue] = React.useState('');
    //var [score, setScore] = React.useState(0);
    const [error, setError] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [helperText, setHelperText] = React.useState('Choose wisely');
    const location = useLocation();
    const data = location.state?.data;
    let flag=0;

    const optionClicked = (ansGiven: string) => {
      const x=answers.shift()
      console.log(x + " " +ansGiven)
      setAnswers(answers)  
      if(ansGiven==x && answers.length>=0) {setScore(score + 1)}
    }
   
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      //fifo.push(((event.target as HTMLInputElement).value))
      //setValue((event.target as HTMLInputElement).value);
      setHelperText(' ');
      setError(false);
    };
    // var s1;
    // var s2;
    // var s3;
    // var s4;
    const handleSubmit = (e: any) => {
        e.preventDefault();
         
        axios.post('http://localhost:3001/exam-session', {
           // solution : value
            
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
                console.log()
            });
       
    }
    axios.post('http://localhost:3001/exam-session', {
            belongsToCourse: data[0] ,
            name: data[1] 
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
        <ResponsiveNavBar pages={pagesArr}/>
        <h1>{score}</h1>
        <Stack marginTop={5} marginLeft={40} direction="column">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 15 }}>
                <Card2 style={cardStyle}>
                    {examsQuestions && examsQuestions.map((examsQuestion) => (
                        <><Grid marginTop={2} item xs={2} sm={4} md={4} key={examsQuestion._id}>
                          
                            <Stack direction="column" marginLeft={2}>
                            question: {examsQuestion.question} 
                            <div/>
                            <List>
                            <ListItemButton component="a" onClick={() => optionClicked('A')}>
                                <ListItemText primary={examsQuestion.c1} />
                            </ListItemButton>
                            <ListItemButton component="a" onClick={() => optionClicked('B')}>
                                <ListItemText primary={examsQuestion.c2} />
                            </ListItemButton>
                            <ListItemButton component="a" onClick={() => optionClicked('C')}>
                                <ListItemText primary={examsQuestion.c3} />
                            </ListItemButton>
                            <ListItemButton component="a" onClick={() => optionClicked('D')}>
                                <ListItemText primary={examsQuestion.c4} />
                            </ListItemButton>
                            </List>                       
                            </Stack>
                            
                        </Grid>
                            </>
                    ))}
                    </Card2>
                </Grid>
            </Stack>
            <Stack marginTop={4}></Stack>
            <Button variant="contained">
              <Link to="/results" state={{ data: [score,examsQuestions.length]}} className="link" color="#f5f5f5">
                Submit results
              </Link>
            </Button>
            
            
            <p/>
            <Footer></Footer>
        </>
    )
                    
}

export default ExamSession