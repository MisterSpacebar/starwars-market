import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationTabs from './components/navigation';
import Commodities from './components/Commodities';
import NewPlanet from './components/NewPlanet';
import About from './components/About';

import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [availablePlanets, setAvailablePlanets] = useState([]);

  console.log('App');
  return (
    <div className='main-window'>
      <Router>
        <header className='navigation-header nav nav-tabs'>
          <NavigationTabs />
        </header>
        <div className='main-jumbotron'>
          <div>
            <h1>Welcome to Star Wars Planets</h1>
            <p>Choose a tab to view commodities or add a new planet</p>
            <br></br>
          </div>
          <Routes>
            <Route path='/about' element={<About availablePlanets={availablePlanets} setAvailablePlanets={setAvailablePlanets} />} />
            <Route path='/table' element={<Commodities availablePlanets={availablePlanets} setAvailablePlanets={setAvailablePlanets} />} />
            <Route path='/new-planet' element={<NewPlanet />} />
          </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
