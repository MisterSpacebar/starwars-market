import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect } from 'react';

function NavigationTabs( { tabUpdate, setTabUpdate }) {
  const [ currentTab, setCurrentTab ] = useState('');

  const handleTabChange = (eventKey) => {
    const dataItem = eventKey.target.getAttribute("data-item");
    setCurrentTab(dataItem);
    setTabUpdate(!tabUpdate);
  };

  return (
    <Nav justify variant="tabs" defaultActiveKey={currentTab} onSelect={handleTabChange}>
      <Nav.Item>
        <Nav.Link href="/" data-item="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/rules" eventKey="/rules" data-item="/rules">Rules</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/table" eventKey="/table" data-item="/table">Commodities</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/new-planet" eventKey="/new-planet" data-item="/new-planet">Planet</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavigationTabs;