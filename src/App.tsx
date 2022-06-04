import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Home} from "./pages/Home/Home";
import {Header} from "./components/Header";
import { CreateWarrior } from './pages/CreateWarrior/CreateWarrior';
import './App.css';
import { FightArena } from './pages/FightArena/FightArena';

export const App = () => (
    <div className="App overflow-auto">
        <div className="container-fluid container-md">
            <Header/>
            <div className="container container-md text-start">
                <Routes>
                    <Route path="/create-warrior" element={<CreateWarrior/>}/>
                    <Route path="/fight-arena" element={<FightArena/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </div>
        </div>
    </div>
);

export default App;
