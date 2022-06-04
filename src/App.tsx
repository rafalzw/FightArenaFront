import React from 'react';
import {Route, Routes } from 'react-router-dom';
import {Home} from "./Home/Home";
import './App.css';
import {Header} from "./components/Header";

export const App = () => (
    <div className="App overflow-auto">
      <div className="container-fluid container-md">
        <Header/>
        <div className="container container-md text-start">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </div>
    </div>
);

export default App;
