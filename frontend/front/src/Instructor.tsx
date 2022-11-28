import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./navbar";
import LoggedInNavbar from "./LoggedInNavbar";

const Instructor = (props:any) => {
    return (
        <>
            <LoggedInNavbar/>
        </>
    )
}

export default Instructor