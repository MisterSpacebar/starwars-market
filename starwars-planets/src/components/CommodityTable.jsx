import React, { useEffect, useState } from 'react';
import { Table, Collapse } from 'react-bootstrap';
import UpdateCommodity from './UpdateCommodity'; // Make sure to import the new component

import '../styles/commodityTabTables.css';

const CommodityTable = ({ commodity, unCamelCase, planetCommodities, setPlanetCommodities, currentPlanet, otherPlanets}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [importedFrom, setImportedFrom] = useState('');
  const [formUpdate, setFormUpdate] = useState(false);

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
        if (category[selectedCommodity]) {
          for (let category_item of category[selectedCommodity]) {
            if (category_item.name == item.name) {
              console.log('()category_item:', category_item);
              category_item.imported_from = importedFrom;
              category_item.supply = category_item.supply - buy + sell;
              console.log('()category_item.imported_from:', category_item.imported_from);
              console.log('()category_item.supply:', category_item.supply);
            }
          }
        }
      }
      console.log('(updated)updatedCommodities:', updatedCommodities);

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
                      <UpdateCommodity commodity={commodity} item={item} otherPlanets={otherPlanets} setImportedFrom={setImportedFrom} buy={buy} setBuy={setBuy} sell={sell} setSell={setSell} currentPlanet={currentPlanet} formUpdate={formUpdate} setFormUpdate={setFormUpdate} />
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
