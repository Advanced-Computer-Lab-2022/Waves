import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import Container from '@mui/material/Container';
import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Card from "../components/ExamCard";
import FilterBar from "../components/FilterBar";
import {useLocation, useNavigate} from "react-router-dom";
import { response } from 'express';

const ExamSession = (props:any) => {
    const fifo=[];
    fifo.push(1);
    //const navigate = useNavigate();
    const [examsQuestions, setExamQuestions] = React.useState<any[]>([]);
    const [values, setValue] = React.useState('');
    //var [score, setScore] = React.useState(0);
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');
    const location = useLocation();
    const data = location.state?.data;
    var score=0;
   
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
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
                console.log(values)
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
           // console.log(s1)
    return (
        <>
        <ResponsiveNavBar/>
        
        <Stack marginTop={0.6} direction="column">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 15 }}>
                    {examsQuestions && examsQuestions.map((examsQuestion) => (
                        <><Grid marginTop={2} item xs={2} sm={4} md={4} key={examsQuestion._id}>
                            <Stack direction="column" marginLeft={2}>
                            question: {examsQuestion.question} 
                            <div/>
                            A: {examsQuestion.c1}
                            <div/> 
                            B: {examsQuestion.c2}
                            <div/> 
                            C: {examsQuestion.c3}
                            <div/> 
                            D: {examsQuestion.c4}
                            </Stack>
                            <form onSubmit={handleSubmit}>
                            <Stack marginTop={2} marginLeft={2}>
                        <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Answer</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="answer"
                                     //value={values}
                                    // onChange={handleRadioChange}
                                >
                                    <Stack marginTop={0.5} direction={"row"}>
                                    
                                    <FormControlLabel value="A" control={<Radio />} label="A" name="A"/>
                                    <FormControlLabel value="B" control={<Radio />} label="B" name="B"/>
                                    <FormControlLabel value="C" control={<Radio />} label="C" name="C"/>
                                    <FormControlLabel value="D" control={<Radio />} label="D" name="D"/>
        
                                    </Stack>
                                </RadioGroup> 
                            </FormControl>
                            </Stack>
                            </form>
                            
                        </Grid>
                            </>
                    ))}
                </Grid>
            </Stack>
            <Stack marginTop={4}></Stack>
            <Button variant="contained" href="/results">
                Submit Answers
            </Button>
            
            <p/>
            <Footer></Footer>
        </>
    )
}

export default ExamSession