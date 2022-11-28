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
    CourseImgPreview: string;
    CourseInstructor: string;
    CourseTotalHours: string;
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