import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from 'axios';
import React, { useEffect, useState } from "react";
//import Question from "../components/Question";
import { Button, Stack, TextField } from "@mui/material";
import LoggedInNavbar from "../components/LoggedInNavbar";
import ResponsiveNavBar from "../components/ResponsiveNavBar";

// const Exam = (props:any) => {
//     const navigate = useNavigate();

//     const pages = ['My Courses', 'Add User', 'Add Course', 'Add Exam', 'Review Rating', 'About Us'];

//     const [count, setCount] = React.useState(1);
//     const [course, setCourse] = React.useState("");
//     const [exam, setExam] = React.useState("");

//         axios.put('http://localhost:3001/add-exam', {
//             belongsToCourse: course,
//             belongsToExam: exam,
//             question: question,
//             c1: c1,
//             c2: c2,
//             c3: c3,
//             c4: c4,
//             solution: solution    
//           }, {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//           })
//             .then(response => {
//                 navigate("../" +response.data);
//             });
    
//     return (
//         <>
//             <ResponsiveNavBar pages={pages}/>
//             <Stack spacing={1.5} direction="column"
//                 justifyContent="space-evenly"
//                 alignItems="baseline" marginTop={1.5} marginLeft={1.5}>
//             <TextField
//                 id="belongsToCourse"
//                 onChange={(e) => setCourse(e.target.value)}
//                 label="Course"
//                 placeholder="eg. Math 3"
//                 multiline
//             />
//             <TextField
//                 id="belongsToExam"
//                 onChange={(e) => setExam(e.target.value)}
//                 label="Exam Name"
//                 placeholder="eg. Exam 1"
//                 multiline
//             />
//             <Question/>
//             </Stack>
//             <Button onClick={() => setCount(count + 1)}>Add Exam</Button>

//         </>
//     )
// }

// export default Exam
