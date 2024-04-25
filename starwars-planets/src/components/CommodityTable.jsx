import { database } from '../FirebaseConfig';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';

import '../styles/commodityTable.css';

function unCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + str.slice(1).replace(/([a-zA-Z])([A-Z])/g, '$1 $2');
}

const CommodityTable = () => {
  const [currentPlanet, setCurrentPlanet] = useState('');
  const [currentExports, setCurrentExports] = useState([]);
  const [currentImports, setCurrentImports] = useState([]);
  const [planetCommodities, setPlanetCommodities] = useState([]);
  const [availablePlanets, setAvailablePlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all documents from the "planets" collection
        const querySnapshot = await getDocs(collection(database, "planets"));
        let planets = [];
        querySnapshot.forEach((document) => {
          console.log(document.id);  // Log each document's ID
          planets.push(document.id);
        });
        setAvailablePlanets(planets);
        console.log('availablePlanets:', availablePlanets);

        // Fetch a specific document from the "planets" collection
        const docRef = doc(database, "planets", currentPlanet);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const data = docSnap.data();
          setCurrentExports(data.exports);
          setCurrentImports(data.imports);
          setPlanetCommodities(data.commodities || []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPlanet]);

  useEffect(() => {
    console.log('planetCommodities:', planetCommodities);
  }, [planetCommodities]);

  return (
    <div className='table-page'>
      <h1>Table</h1>
      <div className='planet-selector'>
        <Form.Select onChange={(event) => setCurrentPlanet(event.target.value)}>
          <option value=''>Select a planet</option>
          {availablePlanets.map((planet) => (
            <option key={planet} value={planet}>{unCamelCase(planet)}</option>
          ))}
        </Form.Select>
        <br></br>
      </div>
      {currentPlanet !== '' && (
        <>
          <h3>{currentPlanet}</h3>
          <p>Current Exports: {currentExports.filter(Boolean).map((exportItem) => unCamelCase(exportItem)).join(', ')}</p>
          <p>Current Imports: {currentImports.filter(Boolean).map((importItem) => unCamelCase(importItem)).join(', ')}</p>
          <div className='planets-table-div'>
            {planetCommodities.map((commodity, index) => (
              <>
              {console.log(Object.keys(commodity))}
              <div key={index}>
                <h2>{unCamelCase(Object.keys(commodity)[0])}</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Buy Price</th>
                      <th>Sell Price</th>
                      <th>Supply</th>
                      <th>Demand</th>
                      <th>Exported To</th>
                      <th>Imported From</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(commodity)[0].map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td>{item.name}</td>
                        <td>{item.buy_price}</td>
                        <td>{item.sell_price}</td>
                        <td>{item.supply}</td>
                        <td>{item.demand}</td>
                        <td>{item.exported_to}</td>
                        <td>{item.imported_from}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommodityTable;
