import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import '../styles/commodityForm.css'

const UpdateCommodity = ({ item, otherPlanets, setImportedFrom }) => {
  const [supply, setSupply] = useState(0);
  const [demand, setDemand] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState('');

  const handleSupplyDemandSubmit = (e) => {
    e.preventDefault();
    const newSupply = e.target.elements.formSupply.value;
    const newDemand = e.target.elements.formDemand.value;
    setSupply(newSupply);
    setDemand(newDemand);
  };

  useEffect(() => {
    setImportedFrom(selectedPlanet);
    console.log('supply:', supply);
    console.log('demand:', demand);
  }, [selectedPlanet]);

  return (
    <Form className='commodity-update-form'>
      <div>
        <h4 className='item-name'>{item.name}</h4>
      </div>
      <table className='update-form'>
        <tr className='update-row'>
          <td>
            <Form.Group controlId="formSupply">
              <Form.Label className="input-group">Buy: </Form.Label>
              <div className="input-group">
                <Button variant="outline-secondary" onClick={() => setSupply(supply - 5)}>-5</Button>
                <Button variant="outline-secondary" onClick={() => setSupply(supply - 1)}>-1</Button>
                <Form.Control type="number" placeholder="Enter supply" value={supply} onChange={(e) => setSupply(e.target.value)} />
                <Button variant="outline-secondary" onClick={() => setSupply(supply + 1)}>+1</Button>
                <Button variant="outline-secondary" onClick={() => setSupply(supply + 5)}>+5</Button>
              </div>
            </Form.Group>
          </td>
          <td>
            <Form.Group controlId="formDemand">
              <Form.Label className="input-group">Sell: </Form.Label>
              <div className="input-group">
                <Button variant="outline-secondary" onClick={() => setDemand(demand - 5)}>-5</Button>
                <Button variant="outline-secondary" onClick={() => setDemand(demand - 1)}>-1</Button>
                <Form.Control type="number" placeholder="Enter demand" value={demand} onChange={(e) => setDemand(e.target.value)} />
                <Button variant="outline-secondary" onClick={() => setDemand(demand + 1)}>+1</Button>
                <Button variant="outline-secondary" onClick={() => setDemand(demand + 5)}>+5</Button>
              </div>
            </Form.Group>
          </td>
        </tr>
        <tr className='update-row'>
          <td>
            <Form.Group controlId="formPlanet">
              <Form.Label className="input-group">From: </Form.Label>
              <Form.Control className="input-group import-planet" as="select" value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
                <option value="">Select a planet</option>
                {otherPlanets.map((planet) => (
                  <option key={planet} value={planet}>
                    {planet}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </td>
          <td>
            <div>
              <Button className='form-submit-button' variant="primary" type="submit" onClick={handleSupplyDemandSubmit}>
                Submit
              </Button>
            </div>
          </td>
        </tr>
      </table>
      <br></br>
      {/* Add other fields as needed */}
    </Form>
  );
};

export default UpdateCommodity;
