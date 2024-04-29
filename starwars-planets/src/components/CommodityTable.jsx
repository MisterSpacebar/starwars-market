import React, { useEffect, useState } from 'react';
import { Table, Collapse } from 'react-bootstrap';
import UpdateCommodity from './UpdateCommodity'; // Make sure to import the new component

import '../styles/commodityTabTables.css';

const CommodityTable = ({ commodity, unCamelCase, planetCommodities, setPlanetCommodities, currentPlanet, otherPlanets}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [importedFrom, setImportedFrom] = useState('');
  const [updatedCommodities, setUpdatedCommodities] = useState([]);

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
    console.log('importedFrom:', importedFrom);
    console.log(planetCommodities)
  }, [importedFrom]);

  return (
    <div className='tabbed-form-tables'>
      <h2>{unCamelCase(category)}</h2>
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
                      <UpdateCommodity commodity={commodity} item={item} otherPlanets={otherPlanets} setImportedFrom={setImportedFrom} buy={buy} setBuy={setBuy} sell={sell} setSell={setSell} currentPlanet={currentPlanet} />
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
