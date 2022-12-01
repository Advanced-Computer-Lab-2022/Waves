import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/navbar";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { Button } from "@mui/material";

const Instructor = (props:any) => {
    const navigate = useNavigate();
    return (
        <>
            <LoggedInNavbar/>

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


        </>
    )
}

export default Instructor