import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

interface props {
    CourseName: string;
    CourseDescription: string;
    CourseRating: string;
    CoursePreview: string;
    CourseInstructor: string;
    children?: React.ReactNode;
    customChild?: React.ReactNode;
}

const Course = () => {
    return (
        <>
            
        </>
    )
}

export default Course