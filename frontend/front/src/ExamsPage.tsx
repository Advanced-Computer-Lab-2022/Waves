import React, { useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar";
import Container from '@mui/material/Container';
import { Divider, Stack } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveNavBar";
import Footer from "./Footer";
import Course from "./Course";
import axios from "axios";

const ExamsPage = (props:any) => {
    const [exams, setExams] = React.useState<any[]>([]);

    useEffect(() => {
    axios.get('http://localhost:3001/exams').then (response => {
        setExams(response.data);
        console.log(response.data);
        })
    }, []);

    return (
        <>  
            <ResponsiveAppBar/>
            
            <Container>
                <Stack spacing ={5} divider={<Divider orientation="vertical" flexItem />}>
                    {exams && exams.map((exam) => (
                        <p key={exam._id}>{exam.belongsToCourse} {exam.name}</p>
                    ))}
                </Stack>
                
            </Container>
            <p/>
            <Footer></Footer>
        </>
    )
}

export default ExamsPage