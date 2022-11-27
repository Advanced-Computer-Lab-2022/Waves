import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Alien from './Alien';
import './App.css';
import Navbar from './navbar';
import Login from './Login';
import Signup from './Signup';
import Admin from './Admin';
import CorporateTrainee from './CorporateTrainee';
import IndividualTrainee from './IndividualTrainee';
import Instructor from './Instructor';

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

        <Route path="/signup" element = {<Signup/>}/>

        <Route path="/admin" element = {<Admin/>}/>
        <Route path="/instructor" element = {<Instructor/>}/>
        <Route path="/coporateTrainee" element = {<CorporateTrainee/>}/>
        <Route path="/individualTrainee" element = {<IndividualTrainee/>}/>
        </Routes>
      </Router>
  );
}

export default App;
