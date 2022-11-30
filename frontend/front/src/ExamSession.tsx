import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar";
import Container from '@mui/material/Container';
import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack } from "@mui/material";
import ResponsiveNavBar from "./ResponsiveNavBar";
import Footer from "./Footer";
import Card from "./ExamCard";
import FilterBar from "./FilterBar";
import {useLocation, useNavigate} from "react-router-dom";
import { response } from 'express';

const ExamSession = (props:any) => {
    //const navigate = useNavigate();
    const [examsQuestions, setExamQuestions] = React.useState<any[]>([]);
    const location = useLocation();
    const data = location.state?.data;
    var s1;
    var s2;
    var s3;
    var s4;
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userInfo = new FormData(e.target)
         s1 = Object.fromEntries(userInfo.entries()).A
         s2 = Object.fromEntries(userInfo.entries()).B
         s3 = Object.fromEntries(userInfo.entries()).C
         s4 = Object.fromEntries(userInfo.entries()).D
    }
    axios.post('http://localhost:3001/exam-session', {
            belongsToCourse: data[0] ,
            name: data[1] ,
            s1: s1,
            s2: s2,
            s3: s3,
            s4: s4

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
        
        <Stack marginTop={0.6} direction={"row"}>
                <FilterBar/>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 15 }}>
                    {examsQuestions && examsQuestions.map((examsQuestion) => (
                        <><Grid marginTop={2} item xs={2} sm={4} md={4} key={examsQuestion._id}>
                            question: {examsQuestion.question} A: {examsQuestion.c1} B: {examsQuestion.c2} C: {examsQuestion.c3} D: {examsQuestion.c4}
                        </Grid>
                        <form onSubmit={handleSubmit}>
                        <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Answer</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="A" control={<Radio />} label="A" name="A"/>
                                    <FormControlLabel value="B" control={<Radio />} label="B" name="B"/>
                                    <FormControlLabel value="C" control={<Radio />} label="C" name="C"/>
                                    <FormControlLabel value="D" control={<Radio />} label="D" name="D"/>
                                </RadioGroup>
                            </FormControl>
                            </form>
                            </>
                    ))}
                </Grid>
            </Stack>
            <Button variant="contained"
                onClick={() => {
                    alert('clicked');
                }}
            >
                Submit Answers
            </Button>
            <p/>
            <Footer></Footer>
        </>
    )
}

export default ExamSession