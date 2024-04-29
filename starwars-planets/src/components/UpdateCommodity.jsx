import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import '../styles/commodityForm.css'

const UpdateCommodity = ({ item }) => {
  const [supply, setSupply] = useState(0);
  const [demand, setDemand] = useState(0);

  const handleSupplyDemandSubmit = (e) => {
    e.preventDefault();
    const newSupply = e.target.elements.formSupply.value;
    const newDemand = e.target.elements.formDemand.value;
    setSupply(newSupply);
    setDemand(newDemand);
  };

  return (
    <Form className='commodity-update-form'>
      <div>
        <h4>{item.name}</h4>
      </div>
      <Form.Group controlId="formSupply">
        <Form.Label>Buy: </Form.Label>
        <div className="input-group">
          <Button variant="outline-secondary" onClick={() => setSupply(supply - 5)}>-5</Button>
          <Button variant="outline-secondary" onClick={() => setSupply(supply - 1)}>-1</Button>
          <Form.Control type="number" placeholder="Enter supply" value={supply} onChange={(e) => setSupply(e.target.value)} />
          <Button variant="outline-secondary" onClick={() => setSupply(supply + 1)}>+1</Button>
          <Button variant="outline-secondary" onClick={() => setSupply(supply + 5)}>+5</Button>
        </div>
      </Form.Group>
      <Form.Group controlId="formDemand">
        <Form.Label>Sell: </Form.Label>
        <div className="input-group">
          <Button variant="outline-secondary" onClick={() => setDemand(demand - 5)}>-5</Button>
          <Button variant="outline-secondary" onClick={() => setDemand(demand - 1)}>-1</Button>
          <Form.Control type="number" placeholder="Enter demand" value={demand} onChange={(e) => setDemand(e.target.value)} />
          <Button variant="outline-secondary" onClick={() => setDemand(demand + 1)}>+1</Button>
          <Button variant="outline-secondary" onClick={() => setDemand(demand + 5)}>+5</Button>
        </div>
      </Form.Group>
      <br></br>
      <div>
        <Button className='form-submit-button' variant="primary" type="submit" onClick={handleSupplyDemandSubmit}>
          Submit
        </Button>
      </div>
      {/* Add other fields as needed */}
    </Form>
  );
};

export default UpdateCommodity;
