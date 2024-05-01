import React, { useEffect, useState } from 'react';
import { Table, Collapse } from 'react-bootstrap';
import UpdateCommodity from './UpdateCommodity'; // Make sure to import the new component

import '../styles/commodityTabTables.css';

import { database } from '../FirebaseConfig';
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

function generateRandomRatio() {
  return Math.random() * 0.19 + 0.905;
}

const CommodityTable = ({ commodity, unCamelCase, planetCommodities, currentExports, currentImports, setPlanetCommodities, currentPlanet, otherPlanets}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [importedFrom, setImportedFrom] = useState('');
  const [formUpdate, setFormUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  const toggleRow = (itemIndex) => {
    setExpandedRow(expandedRow === itemIndex ? null : itemIndex);
  };

  const category = Object.keys(commodity)[0];
  const items = Object.values(commodity)[0];

  useEffect(() => {
    console.log('currentPlanet:', currentPlanet);
    console.log('otherPlanets:', otherPlanets);
  }, [expandedRow]);

  useEffect(() => {
    console.log('()importedFrom:', importedFrom);
    console.log('()planetCommodities',planetCommodities);
    console.log('()formUpdate:', formUpdate);
    async function updatePlanet() {
      const selectedCommodity = category;
      let updatedCommodities = planetCommodities;
      console.log('()selectedCommodity:', selectedCommodity);
      console.log('()updatedCommodities:', updatedCommodities);

      for (let category of updatedCommodities) {
        console.log('()category:', category);
        console.log('()category.key:', category.key);
        if (category.hasOwnProperty(selectedCommodity)) {
          console.log('()category[selectedCommodity]:', category[selectedCommodity]);
          for (let category_item of category[selectedCommodity]) {
            console.log('()category_item:', category_item);
            console.log('()category_item.name:', category_item.name);
            console.log('()item.name:', selectedItem);
            if (category_item.name === selectedItem) {
              console.log('*****testy-test*****', selectedItem);
              if (importedFrom) {
                category_item.imported_from = importedFrom;
              }
              console.log('()category_item.supply:', category_item.supply);

              if (isNaN(buy) || buy === 0) {
                setBuy(0);
              }
              if (isNaN(sell) || sell === 0) {
                setSell(0);
              }

              let newSupply = parseInt(category_item.supply) - parseInt(buy) + parseInt(sell);
              category_item.supply = newSupply;
              
              console.log('()category_item.imported_from:', category_item.imported_from);
              console.log('(updated)category_item.supply:', category_item.supply);

              let ratio = 1.000 * (category_item.demand/category_item.supply);
              let SDratio = generateRandomRatio();
              if (ratio > 1) {
                SDratio = 1 - (ratio - 1) * 0.125;
              } else if (ratio < 1) {
                SDratio = 1 + (1 - ratio) * 0.125;
              }
              if (sell > buy) {
                SDratio = 1 / SDratio;
              } else if (sell < buy) {
                SDratio = SDratio * 1.0525;
              }
              if (SDratio < 0.80) {
                SDratio = SDRatio * 1.125;
              }

              console.log('(current planet)SDratio:'+category_item.name, SDratio);
              let newBuyPrice = category_item.buy_price * SDratio;
              let newSellPrice = category_item.sell_price * SDratio;

              category_item.buy_price = parseInt(newBuyPrice);
              category_item.sell_price = parseInt(newSellPrice);
            }
          }
        }
      }

      console.log('(updated)updatedCommodities:', updatedCommodities);
      let updatedData = {
        commodities: updatedCommodities,
        imports: currentImports,
        exports: currentExports,
        planet_name: currentPlanet
      };

      await setDoc(doc(database, "planets", currentPlanet), updatedData);
    }

    updatePlanet();

  }, [formUpdate]);

  return (
    <div className='tabbed-form-tables'>
      <h2 className='commodity-category'>{unCamelCase(category)}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purchase Price</th>
            <th>Sale Price</th>
            <th>Supply</th>
            <th>Demand</th>
            <th>Last Delivery</th>
            <th>Recent Arrival</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              <tr onClick={() => toggleRow(itemIndex)} style={{ cursor: 'pointer' }}>
                <td>{item.name}</td>
                <td>{item.buy_price}</td>
                <td>{item.sell_price}</td>
                <td>{item.supply}</td>
                <td>{item.demand}</td>
                <td>{item.exported_to}</td>
                <td>{item.imported_from}</td>
              </tr>
              <tr>
                <td colSpan="7">
                  <Collapse in={expandedRow === itemIndex}>
                    <div>
                      <UpdateCommodity commodity={commodity} item={item} otherPlanets={otherPlanets} setImportedFrom={setImportedFrom} buy={buy} setBuy={setBuy} sell={sell} setSell={setSell} currentPlanet={currentPlanet} formUpdate={formUpdate} setFormUpdate={setFormUpdate} setSelectedItem={setSelectedItem} />
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CommodityTable;
