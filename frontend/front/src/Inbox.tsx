import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedInNavbar from "./LoggedInNavbar";
import axios from "./api/axios";


const Inbox = (props:any) => {
    const navigate = useNavigate();
    
    axios.get('http://localhost:3001/inbox').then(response => {
                console.log(response.data);
            });

    return (
        <>
            <LoggedInNavbar/>
        </>
    )
}

export default Inbox