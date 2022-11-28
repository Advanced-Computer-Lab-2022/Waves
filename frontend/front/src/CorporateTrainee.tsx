import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedInNavbar from "./LoggedInNavbar";

const CorporateTrainee = (props:any) => {
    return (
        <>
            <LoggedInNavbar/>
        </>
    )
}

export default CorporateTrainee