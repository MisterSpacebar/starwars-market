import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';

function NavigationTabs() {
  const [ currentTab, setCurrentTab ] = useState('');

  const handleTabChange = (eventKey) => {
    const dataItem = eventKey.target.getAttribute("data-item");
    setCurrentTab(dataItem);
  };

  return (
    <Nav justify variant="tabs" defaultActiveKey={currentTab} onSelect={handleTabChange}>
      <Nav.Item>
        <Nav.Link href="/table" data-item="/table">Commodity</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/new-planet" eventKey="/new-planet" data-item="/new-planet">Planet</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavigationTabs;