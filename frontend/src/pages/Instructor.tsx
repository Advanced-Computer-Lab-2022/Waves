import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/navbar";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { Button, Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";

const pages = ['My Courses', 'Add User', 'Add Course', 'About Us'];

const Instructor = (props:any) => {
    const navigate = useNavigate();
    return (
        <>
            <ResponsiveNavBar pages ={pages}/>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="baseline"
                spacing={0.5}
                marginTop={0.7}
            >
            <Button variant="contained"
                onClick={() => {
                navigate("../add-exam");
            }}
            >
                 Add Exam
            </Button>

            <Button variant="contained"
                onClick={() => {
                navigate("../view-rating");
            }}
            >
                 Review Rating
            </Button>

            <Button variant="contained"
                onClick={() => {
                navigate("../add-course");
            }}
            >
                 Add Course
            </Button>
            </Stack>
        </>
    )
}

export default Instructor