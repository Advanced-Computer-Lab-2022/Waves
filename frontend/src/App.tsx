import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import CorporateTrainee from './pages/CorporateTrainee';
import IndividualTrainee from './pages/IndividualTrainee';
import Instructor from './pages/Instructor';
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
import EditPassword from './pages/EditPassword';
import Profile from './pages/Profile';
import Homepage from './pages/Homepage';
import PurchaseCourse from "./pages/PurchaseCourse";
import PaymentInfo from "./pages/PaymentInfo";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* {arr.map(str => <Alien adamsProp={str} customChild={<div>This is custom child div</div>} key={str}/>)} */}
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/personal-info" element={<Info />} />
        <Route path="/add-user" element={<NewUser />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-exam" element={<Exam />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/exam-session" element={<ExamSession />} />
        <Route path="/results" element={<Results />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/coporateTrainee" element={<CorporateTrainee />} />
        <Route path="/individualTrainee" element={<IndividualTrainee />} />
        <Route path="/viewcourse" element={<ViewCourse />} />
        <Route path="/payment-information" element={<PaymentInfo />} />
        <Route path="/purchase-course" element={<PurchaseCourse />} />
        <Route path="/view-rating" element={<ViewRating />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/instructor-terms" element={<InstructorTerms />} />
        <Route path="/personal-info/edit-password" element={<EditPassword />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
