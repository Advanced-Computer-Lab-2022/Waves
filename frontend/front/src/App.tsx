import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Alien from './Alien';
import './App.css';
import Navbar from './components/navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignUp from './SignUp';
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

const arr = ["String1", "String2", "String3", "String4", "String5"]

function App() {
  const [x, setX] = useState("Hello Pandemic");
  useEffect(() => { const y = "Aliens"; return () => { const z = "Alien Are Good!" } }, [])
  return (
      <Router>
        <Routes>
          <Route path="/" element = {<>
                    <Navbar/>
                    <div className="App">
                    <header className="App-header">
                      <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                      </p>
                      <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {x.slice(3)}
                      </a>
                      <button onClick={() => { console.log("Button Clicked"); setX("Hi Aliens"); }}>Button</button>
                      <Alien adamsProp='Was My Password'>
                        <div>This Is A Child Of Alien</div>
                      </Alien>
        
                      
                      <Link to="/">Home</Link>
                      {arr.map(str => <Alien adamsProp={str} customChild={<div>This is custom child div</div>} key={str}/>)}
                    </header>
                  </div>
                  </>
          }/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/add-user" element = {<NewUser/>}/>
        <Route path="/add-exam" element = {<Exam/>}/>
        <Route path="/exams" element = {<ExamsPage/>}/>
        <Route path="/exam-session" element = {<ExamSession/>}/>
        <Route path="/inbox" element = {<Inbox/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/admin" element = {<Admin/>}/>
        <Route path="/instructor" element = {<Instructor/>}/>
        <Route path="/coporateTrainee" element = {<CorporateTrainee/>}/>
        <Route path="/individualTrainee" element = {<IndividualTrainee/>}/>
        <Route path="/viewcourse" element = {<ViewCourse/>}/>
        <Route path="/view-rating" element = {<ViewRating/>}/>
        <Route path="/sign-up" element = {<SignUp/>}/>
        </Routes>
      </Router>
  );
}

export default App;
