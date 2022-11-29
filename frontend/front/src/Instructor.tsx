import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./navbar";
import LoggedInNavbar from "./LoggedInNavbar";
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


        </>
    )
}

export default Instructor