import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar";
import Container from '@mui/material/Container';
import { Divider, Stack } from "@mui/material";
import ResponsiveNavBar from "./ResponsiveNavBar";
import Footer from "./Footer";
import Card from "./ExamCard";
import FilterBar from "./FilterBar";


const ExamsPage = (props:any) => {
    const [exams, setExams] = React.useState<any[]>([]);

    useEffect(() => {
    axios.get('http://localhost:3001/exams').then (response => {
        setExams(response.data);
        })
    }, []);
    return (
        <>  
            <ResponsiveNavBar/>
            
            <Container>
                <Stack spacing ={5} divider={<Divider orientation="vertical" flexItem />}>
                    {exams && exams.map((exam) => (
                        <div key={exam._id}>
                            <Card belongsToCourse={exam.belongsToCourse} name={exam.name} />
                        </div>
                    ))}
                </Stack>
                
            </Container>
            <p/>
            <Footer></Footer>
        </>
    )
}

export default ExamsPage