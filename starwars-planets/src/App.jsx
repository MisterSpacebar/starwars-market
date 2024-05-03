import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationTabs from './components/navigation';
import Commodities from './components/Commodities';
import NewPlanet from './components/NewPlanet';
import About from './components/About';
import Rules from './components/Rules';

import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [availablePlanets, setAvailablePlanets] = useState([]);
  const [ tabUpdate, setTabUpdate ] = useState(false);

  return (
    <div className='main-window'>
      <Router>
        <header className='navigation-header nav nav-tabs'>
          <NavigationTabs tabUpdate={tabUpdate} setTabUpdate={setTabUpdate} />
        </header>
        <div className='main-jumbotron'>
          <div className='page-title-header'>
            <h1>Welcome to Star Wars Planets</h1>
            <p>Choose a tab to view commodities or add a new planet</p>
            <br></br>
          </div>
          <Routes>
            <Route path='/' element={<About availablePlanets={availablePlanets} setAvailablePlanets={setAvailablePlanets} />} />
            <Route path='/rules' element={<Rules />} />
            <Route path='/table' element={<Commodities availablePlanets={availablePlanets} setAvailablePlanets={setAvailablePlanets} />} />
            <Route path='/new-planet' element={<NewPlanet />} />
          </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
