// components/NewPlanet.jsx:
import { useState } from 'react';
import commodities from '../templates/commodities';

import NewPlanetForm from './NewPlanetForm';

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
                    sell_price: parseInt(c.sell_price * generatePercentageLower()),
                    buy_price: parseInt(c.buy_price * generatePercentageHigher()),
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
        }

        let newPlanet = {
            imports: imports,
            exports: exports,
            commodities: planetCommodity
        };

        console.log(newPlanet);

    };

  return (
    <div>
        <NewPlanetForm 
        planetName={planetName} 
        setPlanetName={setPlanetName} 
        imports={imports} 
        setImports={setImports} 
        exports={exports} 
        setExports={setExports} 
        handleSubmit={handleSubmit}
        />
        <div>
            <h3>Planet Commodity</h3>
            <ul>
                {planetCommodity.map((commodity, index) => (
                    <li key={index}>{JSON.stringify(commodity)  }</li>
                ))}
            </ul>
        </div>
    </div>
  );
}

export default NewPlanet;