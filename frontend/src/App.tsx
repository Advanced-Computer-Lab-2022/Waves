import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Inbox from './pages/Inbox';
import Exam from './pages/Exam';
import ViewCourse from './pages/ViewCourse';
import ExamsPage from './pages/ExamsPage';
import ExamSession from './pages/ExamSession';
import ViewRating from './pages/ViewRating';
import NewUser from './pages/NewUser';
import AddCourse from './pages/AddCourse';
import Account from './components/Account';
import Info from './pages/PersonalInfo';
import Results from './pages/results';
import InstructorTerms from './pages/InstructorTerms';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Homepage from './pages/Homepage';
import PurchaseCourse from "./pages/PurchaseCourse";
import PaymentInfo from "./pages/PaymentInfo";
import ViewCorporateTrainees from "./pages/ViewCorporateTrainees";
import CoursesPage from "./pages/CoursesPage";
import MyCourses from "./pages/MyCourses";
import ViewCourseUnPurchased from "./pages/ViewCourseUnPurchased";
import NewPassword from "./pages/newResetPassword";
import ViewReports from "./pages/ViewReports";
import AddCourseTemp from "./pages/AddCourseTemp";
import CircularProgressChildren from "./components/CircularProgression";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* {arr.map(str => <Alien adamsProp={str} customChild={<div>This is custom child div</div>} key={str}/>)} */}
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/personal-info" element={<Info />} />
        <Route path="/add-user" element={<NewUser />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-exam" element={<Exam />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/exam-session" element={<ExamSession />} />
        <Route path="/results" element={<Results />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/admin" element={<CoursesPage />} />
        <Route path="/instructor" element={<CoursesPage />} />
        <Route path="/coporateTrainee" element={<CoursesPage />} />
        <Route path="/individualTrainee" element={<CoursesPage />} />
        <Route path="/viewcourse" element={<ViewCourse />} />
        <Route path="/viewcourse-unpurchased" element={<ViewCourseUnPurchased />} />
        <Route path="/payment-information" element={<PaymentInfo />} />
        <Route path="/purchase-course" element={<PurchaseCourse />} />
        <Route path="/view-rating" element={<ViewRating />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/instructor-terms" element={<InstructorTerms />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/corporate-trainees" element={<ViewCorporateTrainees />} />
        <Route path="/courses" element={<CoursesPage/>} />
        <Route path="/all-courses" element={<CoursesPage/>} />
        <Route path="/my-courses" element={<MyCourses/>} />
        <Route path="/view-reports" element={<ViewReports/>} />
        <Route path="/zeyad" element={<AddCourseTemp/>} />
        <Route path="/Circular" element={<CircularProgressChildren/>} />
      </Routes>
    </Router>
  );
}

export default App;
