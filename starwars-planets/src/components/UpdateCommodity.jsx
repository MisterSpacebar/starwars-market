import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import { database } from '../FirebaseConfig';
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

import '../styles/commodityForm.css'

const UpdateCommodity = ({ commodity, item, otherPlanets, setImportedFrom, buy, setBuy, sell, setSell, currentPlanet, formUpdate, setFormUpdate, setSelectedItem }) => {
  // const [supply, setSupply] = useState(0);
  // const [demand, setDemand] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState('');
  const [update, setUpdate] = useState(false);

  // const handleSupplyDemandSubmit = (e) => {
  //   e.preventDefault();
  //   const newSupply = e.target.elements.formSupply.value;
  //   const newDemand = e.target.elements.formDemand.value;
  //   setBuy(newSupply);
  //   setSell(newDemand);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSupply = e.target.elements.formSupply.value;
    const newDemand = e.target.elements.formDemand.value;
    setSelectedItem(item.name);
    setBuy(newSupply);
    setSell(newDemand);
    setUpdate(!update);
    setFormUpdate(!formUpdate);
    console.log('update:', update);
  };

  useEffect(() => {
    setImportedFrom(selectedPlanet);
    console.log('()supply:', buy);
    console.log('()demand:', sell);
  }, [selectedPlanet]);

  useEffect(() => {
    console.log('commodity:', commodity);
    console.log('item:', item);
    let updatedCommodities;
    const selectedCommodity = Object.keys(commodity)[0];
    console.log('selectedCommodity:', selectedCommodity);
    async function updateImportPlanet() {
      try {
        // Update the document in the "planets" collection
        const docRef = doc(database, "planets", selectedPlanet);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let exportPlanetData = docSnap.data();
          console.log("Document data:", exportPlanetData);

          for (let category of exportPlanetData.commodities) {
            if (category[selectedCommodity]) {
              for (let category_item of category[selectedCommodity]) {
                if (category_item.name === item.name) {
                  console.log('category_item:', category_item);
                  category_item.exported_to = currentPlanet;
                  console.log('category_item.exported_to:', category_item.exported_to);

                  let ratio = 1.000 * (category_item.demand/category_item.supply);
                  let SDratio = 1;
                  if (ratio > 1) {
                    SDratio = 1 - (ratio - 1) * 0.00125;
                  } else if (ratio < 1) {
                    SDratio = 1 + (1 - ratio) * 0.00125;
                  }
                  console.log('(import planet)SDratio:'+item.name, SDratio);
                  let newBuyPrice = category_item.buy_price * SDratio;
                  let newSellPrice = category_item.sell_price * SDratio;

                  category_item.buy_price = parseInt(newBuyPrice);
                  category_item.sell_price = parseInt(newSellPrice);
                }
              }
            }
          }
          console.log('exportPlanetData:', exportPlanetData);
          await setDoc(doc(database, "planets", selectedPlanet), exportPlanetData);

        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }

    updateImportPlanet();
  }, [update]);

  return (
    <Form className='commodity-update-form' onSubmit={handleSubmit}>
      <div>
        <h4 className='item-name'>{item.name}</h4>
      </div>
      <table className='update-form'>
        <tr className='update-row'>
          <td>
            <Form.Group controlId="formSupply">
              <Form.Label className="input-group">Buy: </Form.Label>
              <div className="input-group">
                <Button variant="outline-secondary" onClick={() => setBuy(buy - 5)}>-5</Button>
                <Button variant="outline-secondary" onClick={() => setBuy(buy - 1)}>-1</Button>
                <Form.Control type="number" placeholder="Enter supply" value={buy} onChange={(e) => setBuy(parseInt(e.target.value))} />
                <Button variant="outline-secondary" onClick={() => setBuy(buy + 1)}>+1</Button>
                <Button variant="outline-secondary" onClick={() => setBuy(buy + 5)}>+5</Button>
              </div>
            </Form.Group>
          </td>
          <td>
            <Form.Group controlId="formDemand">
              <Form.Label className="input-group">Sell: </Form.Label>
              <div className="input-group">
                <Button variant="outline-secondary" onClick={() => setSell(sell - 5)}>-5</Button>
                <Button variant="outline-secondary" onClick={() => setSell(sell - 1)}>-1</Button>
                <Form.Control type="number" placeholder="Enter demand" value={sell} onChange={(e) => setSell(parseInt(e.target.value))} />
                <Button variant="outline-secondary" onClick={() => setSell(sell + 1)}>+1</Button>
                <Button variant="outline-secondary" onClick={() => setSell(sell + 5)}>+5</Button>
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
              <Button className='form-submit-button' variant="primary" type="submit">
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
