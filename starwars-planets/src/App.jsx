import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// Components
import Table from './components/Table';
import NewPlanet from './components/NewPlanet';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import './FirebaseConfig'

// import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
// import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';

// initializeApp();
// const firestore_database = getFirestore();

function NavigationTabs() {
  const navigate = useNavigate();

  const handleSelect = (selectedTab) => {
    switch (selectedTab) {
      case 'table':
        navigate('/table');
        break;
      case 'new-planet':
        navigate('/new-planet');
        break;
      case 'about':
        navigate('/about');
        break;
      default:
        break;
    }
  };

  return (
    <Tabs defaultActiveKey="table" className="mb-3 tab-select-header" onSelect={handleSelect}>
      <Tab className='tab-select-table tab-select-header' eventKey="table" title="Table" />
      <Tab className='tab-select-new-planet tab-select-header' eventKey="new-planet" title="New Planet" />
      {/* <Tab className='tab-select-about' eventKey="about" title="About" /> */}
    </Tabs>
  );
}

function App() {
  console.log('App');
  return (
    <Router>
      <NavigationTabs />
      <Routes>
        <Route path='/table' component={<Table />} />
        <Route path='/new-planet' element={<NewPlanet />} />
        {/* <Route path='/about' component={About} /> */}
      </Routes>
    </Router>
  );
}

export default App;
