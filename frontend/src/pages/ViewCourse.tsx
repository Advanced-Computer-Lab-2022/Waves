import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveNavBar from "../components/ResponsiveNavBar";

const ViewCourse = (props:any) => {
    return (
        <>
            <ResponsiveNavBar></ResponsiveNavBar>
            <div
                style={{
                    backgroundColor: 'rgb(25, 25, 25)',
                    height: '300px'
                }}
            >
                
            </div>
        </>
    )
}

export default ViewCourse