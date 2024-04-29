import { database } from '../FirebaseConfig';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';

import '../styles/commodityTable.css';

import CommodityTable from './CommodityTable';

function unCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + str.slice(1).replace(/([a-zA-Z])([A-Z])/g, '$1 $2');
}

const Commodities = () => {
  const [currentPlanet, setCurrentPlanet] = useState('');
  const [currentExports, setCurrentExports] = useState([]);
  const [currentImports, setCurrentImports] = useState([]);
  const [planetCommodities, setPlanetCommodities] = useState([]);
  const [availablePlanets, setAvailablePlanets] = useState([]);
  const [otherPlanets, setOtherPlanets] = useState([]);

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
          let others = availablePlanets.filter(planet => planet !== currentPlanet);
          setOtherPlanets(others);
          console.log('others:', others);
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
            <Tabs defaultActiveKey="0" id="commodity-tabs">
              {planetCommodities.map((commodity, index) => (
                <Tab eventKey={index.toString()} title={unCamelCase(Object.keys(commodity)[0])} key={index}>
                  <CommodityTable commodity={commodity} unCamelCase={unCamelCase} planetCommodities={planetCommodities} setPlanetCommodities={setPlanetCommodities} currentPlanet={currentPlanet} otherPlanets={otherPlanets} />
                </Tab>
              ))}
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default Commodities;
