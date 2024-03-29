import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedInNavbar from "../components/LoggedInNavbar";
import axios from "axios";
import LeftNav from "../components/LeftNav";

const Inbox = (props:any) => {
    const navigate = useNavigate();
    
    axios.get('http://localhost:3001/inbox').then(response => {

            });

    return (
        <>
            <LoggedInNavbar/>
            <LeftNav/>
        </>
    )
}

export default Inbox