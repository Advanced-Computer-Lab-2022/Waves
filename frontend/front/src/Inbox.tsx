import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedInNavbar from "./LoggedInNavbar";
import axios from "axios";

const Inbox = (props:any) => {
    const navigate = useNavigate();
    
    axios.get('http://localhost:3001/inbox').then(response => {

            });

    return (
        <>
            <LoggedInNavbar/>
        </>
    )
}

export default Inbox