// components/NewPlanet.jsx:
import { useState } from 'react';
import commodities from '../templates/commodities';

import NewPlanetForm from './NewPlanetForm';

import { database } from '../FirebaseConfig'
import { setDoc, doc } from 'firebase/firestore';

function generatePercentageLower() {
    return Math.random() * 0.900 + 0.850;
}

function generatePercentageHigher() {
    return Math.random() * 0.700 + 0.450;
}

function generateRandomPercentage() {
    return Math.random() * 0.500 + 0.750;
}

function NewPlanet() {
    const [planetName, setPlanetName] = useState('');
    const [imports, setImports] = useState([]);
    const [exports, setExports] = useState([]);
    const [planetCommodity, setPlanetCommodity] = useState([]);
    const [test, setTest] = useState(false);
    const [ updatedPlanet, setUpdatedPlanet ] = useState('');
    let commodityList = [];

    const handleSubmit = async (event) => {
        event.preventDefault();

        //let planetCommodities = Object.keys(commodities);

        for (let key in commodities) {
            // Access each commodity in the commodityList object
            let commodity = commodities[key];
            // Do something with the commodityasdasdasdasd
            if (imports.includes(key)) {
                // Do something with the matching key
                console.log('export commodities',commodity);
                let updatedCommodity = commodity.map(c => ({
                    ...c,
                    sell_price: parseInt(c.sell_price * generatePercentageHigher()),
                    buy_price: parseInt(c.buy_price * generatePercentageLower()),
                    supply: parseInt(c.supply * generatePercentageHigher()),
                    demand: parseInt(c.demand * generatePercentageLower()),
                }));
                console.log('imports:', updatedCommodity);
                console.log(`key: ${key}`);
                commodityList.push({[key]: updatedCommodity});

            } else if (exports.includes(key)) {
                // Do something with the matching key
                console.log('import commodities',commodity);
                let updatedCommodity = commodity.map(c => ({
                    ...c,
                    sell_price: parseInt(c.sell_price * generatePercentageHigher()),
                    buy_price: parseInt(c.buy_price * generatePercentageLower()),
                    supply: parseInt(c.supply * generatePercentageLower()),
                    demand: parseInt(c.demand * generatePercentageHigher()),
                }));
                console.log('exports:', updatedCommodity);
                console.log(`key: ${key}`);
                commodityList.push({[key]: updatedCommodity});
            } else {
                // Do something with the non-matching key
                console.log('other commodities',commodity);
                let updatedCommodity = commodity.map(c => ({
                    ...c,
                    sell_price: parseInt(c.sell_price * generateRandomPercentage()),
                    buy_price: parseInt(c.buy_price * generateRandomPercentage()),
                    supply: parseInt(c.supply * generateRandomPercentage()),
                    demand: parseInt(c.demand * generateRandomPercentage()),
                }));
                console.log('neither:', updatedCommodity);
                console.log(`key: ${key}`);
                commodityList.push({[key]: updatedCommodity});
            }
            console.log(`final array`);
            console.log(commodityList);
            setPlanetCommodity(commodityList);
            setTest(true);
        }

        let newPlanet = {
            planet_name: planetName,
            imports: imports,
            exports: exports,
            commodities: commodityList
        };

        console.log(newPlanet);
        await setDoc(doc(database, "planets", planetName), newPlanet);
        console.log('Planet added to database?');
        setUpdatedPlanet(planetName);

    };

  return (
    <div className="jumbotron jumbotron-fluid main-jumbo">
        <NewPlanetForm 
        planetName={planetName} 
        setPlanetName={setPlanetName} 
        imports={imports} 
        setImports={setImports} 
        exports={exports} 
        setExports={setExports} 
        handleSubmit={handleSubmit}
        updatedPlanet={updatedPlanet}
        />
        <div>
            <h3>Planet Commodity</h3>
            {/* <ul>
                {planetCommodity.map((commodity, index) => (
                    <li key={index}>{JSON.stringify(commodity)  }</li>
                ))}
            </ul> */}
            { test ? <> <p>${planetName} has been added</p><br></br>
                        <p>Imports: ${imports}</p><br></br>
                        <p>Exports: ${exports}</p><br></br></>
                         : <p></p>}
        </div>
    </div>
  );
}

export default NewPlanet;