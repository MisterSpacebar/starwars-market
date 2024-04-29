import React, { useState } from 'react';
import { Table, Collapse } from 'react-bootstrap';
import UpdateCommodity from './UpdateCommodity'; // Make sure to import the new component

import '../styles/commodityTabTables.css';

const CommodityTable = ({ commodity, unCamelCase }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const toggleRow = (itemIndex) => {
    setExpandedRow(expandedRow === itemIndex ? null : itemIndex);
  };

  const category = Object.keys(commodity)[0];
  const items = Object.values(commodity)[0];

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
            <th>Exported To</th>
            <th>Imported From</th>
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
                      <UpdateCommodity item={item} />
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
