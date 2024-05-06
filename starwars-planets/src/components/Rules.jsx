import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

import '../styles/rules.css';

function Rules() {
  return (
    <div className='jumbotron-rules'>
      <h1>New Rules</h1>
      <p>This app is designed for the Fantasy Flight Games (now Edge Studios) Star Wars Roleplaying Game system.</p>
      <p>It allows players to engage in interplanetary and interstellar trade. The new rules introduce the concept of trading commodities using Standard Transport Containers (STCs).</p>
      <p>Players are required to outfit their ships with cargo racks or containers to transport these commodities.</p>
      <p>Most major Starports should allow most players to retrofit most vessels with cargo racks at a going rate of 5 credits per STC mount.</p>
      <Table striped bordered className='encum-cargo-table'>
        <thead>
          <tr>
            <th>Encumbrance</th>
            <th>Cargo Conversion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>40 encum</td>
            <td>25 STC</td>
          </tr>
          <tr>
            <td>400 encum</td>
            <td>255 STC</td>
          </tr>
          <tr>
            <td>4000 encum</td>
            <td>2575 STC</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Rules;