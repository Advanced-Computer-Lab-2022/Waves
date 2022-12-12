import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import Container from '@mui/material/Container';
import { Divider, Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Card from "../components/ExamCard";
import FilterBar from "../components/FilterBar";


const ExamsPage = (props:any) => {
    const [exams, setExams] = React.useState<any[]>([]);

    useEffect(() => {
    axios.get('http://localhost:3001/exams').then (response => {
        setExams(response.data);
        })
    }, []);
    return (
        <>  
            
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