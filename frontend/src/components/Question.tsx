import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveNavBar from './ResponsiveNavBar';
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

//   const Question = (props:any) => {
//     const navigate = useNavigate();
//     const [question, setQuestion] = React.useState("");
//     const [choice1, setChoice1] = React.useState("");
//     const [choice2, setChoice2] = React.useState("");
//     const [choice3, setChoice3] = React.useState("");
//     const [choice4, setChoice4] = React.useState("");
    
//     return (
//         <>
//             <div/>
//                 <TextField
//                     id="question"
//                     onChange={(e) => setQuestion(e.target.value)}
//                     label="Question"
//                     multiline
//                     rows={4}
//                     defaultValue=""
//                 />
                
//                 <TextField
//                     id="choice1"
//                     onChange={(e) => setChoice1(e.target.value)}
//                     label="Choice 1"
//                     placeholder=""
//                     multiline
//                 />
//                 <TextField
//                     id="choice2"
//                     onChange={(e) => setChoice2(e.target.value)}
//                     label="Choice 2"
//                     placeholder=""
//                     multiline
//                 />
//                 <TextField
//                     id="choice3"
//                     onChange={(e) => setChoice3(e.target.value)}
//                     label="Choice 3"
//                     placeholder=""
//                     multiline
//                 />
//                 <TextField
//                     id="choice4"
//                     onChange={(e) => setChoice4(e.target.value)}
//                     label="Choice 4"
//                     placeholder=""
//                     multiline
//                 />
//                 <FormControl>
//                     <FormLabel id="demo-row-radio-buttons-group-label">Correct Answer</FormLabel>
//                     <RadioGroup
//                     row
//                     aria-labelledby="demo-row-radio-buttons-group-label"
//                     onChange={(e) => setSolution(e.target.value)}
//                 >
//                     <FormControlLabel value="A" control={<Radio />} label="choice 1" />
//                     <FormControlLabel value="B" control={<Radio />} label="choice 2" />
//                     <FormControlLabel value="C" control={<Radio />} label="choice 3" />
//                     <FormControlLabel value="D" control={<Radio />} label="choice 4" />
//                 </RadioGroup>
//             </FormControl>
//         </>
//     )
// }

// export default Question