import React, { useEffect, useState } from 'react';
import Alien from './Alien';
import './App.css';

const arr = ["String1", "String2", "String3", "String4", "String5"]

function App() {
  const [x, setX] = useState("Hello Pandemic");
  useEffect(() => { const y = "Aliens"; return () => { const z = "Alien Are Good!" } }, [])
  return (
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
        {arr.map(str => <Alien adamsProp={str} customChild={<div>This is custom child div</div>} key={str}/>)}
      </header>
    </div>
  );
}

export default App;
