import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import LoggedInNavbar from './LoggedInNavbar';
import React from 'react';

  const Question = (props:any) => {
    const navigate = useNavigate();
    
    return (
        <>
            <div/>
                <TextField
                    id="question"
                    name="question"
                    label="Question"
                    multiline
                    rows={4}
                    defaultValue=""
                />
                
                <TextField
                    id="choice1"
                    name="choice1"
                    label="Choice 1"
                    placeholder=""
                    multiline
                />
                <TextField
                    id="choice2"
                    name="choice2"
                    label="Choice 2"
                    placeholder=""
                    multiline
                />
                <TextField
                    id="choice3"
                    name="choice3"
                    label="Choice 3"
                    placeholder=""
                    multiline
                />
                <TextField
                    id="choice4"
                    name="choice4"
                    label="Choice 4"
                    placeholder=""
                    multiline
                />
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Correct Answer</FormLabel>
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="solution"
                >
                    <FormControlLabel value="A" control={<Radio />} label="choice 1" />
                    <FormControlLabel value="B" control={<Radio />} label="choice 2" />
                    <FormControlLabel value="C" control={<Radio />} label="choice 3" />
                    <FormControlLabel value="D" control={<Radio />} label="choice 4" />
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default Question