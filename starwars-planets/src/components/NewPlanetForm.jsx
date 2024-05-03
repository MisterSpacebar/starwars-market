import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import industries from '../templates/industries';

import '../styles/planetform.css';

import NewPlanetPopulate from './NewPlanetPopulate';

function toCamelCaseArray(arr) {
    return arr.map(str => 
        str 
            ? str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                return index === 0 ? match.toLowerCase() : match.toUpperCase();
            })
            : null
    );
}

const NewPlanetForm = ({ planetName, setPlanetName, imports, setImports, exports, setExports, handleSubmit, updatedPlanet }) => {
    let initialIndustries = industries
    const [availableIndustries, setAvailableIndustries] = useState(initialIndustries);
    const [selectedImports, setSelectedImports] = useState(Array(3).fill(null));
    const [selectedExports, setSelectedExports] = useState(Array(3).fill(null));

    const handlePlanetNameChange = (event) => {
        setPlanetName(event.target.value);
    };

    const handleImportChange = (event, index) => {
        const newImports = [...selectedImports];
        newImports[index] = event.target.value;
        setSelectedImports(newImports);
        setAvailableIndustries(initialIndustries.filter(industry => !newImports.includes(industry) && !selectedExports.includes(industry)))
        console.log(`newImports: ${newImports}`);
        console.log(`camel case imports: ${toCamelCaseArray(newImports)}`);
        setImports(toCamelCaseArray(newImports));
    };

    const handleExportChange = (event, index) => {
        const newExports = [...selectedExports];
        newExports[index] = event.target.value;
        setSelectedExports(newExports);
        setAvailableIndustries(initialIndustries.filter(industry => !selectedImports.includes(industry) && !newExports.includes(industry)));
        console.log(`newExports: ${newExports}`);
        console.log(`camel case exports: ${toCamelCaseArray(newExports)}`);
        setExports(toCamelCaseArray(newExports));
    };

    useEffect(() => {
        console.log(`selectedImports: ${selectedImports}`);
    }, [selectedImports]);
    
    useEffect(() => {
        console.log(`imports: ${imports}`);
    }, [imports]);

    useEffect(() => {
        console.log(`selectedImports: ${selectedExports}`);
    }, [selectedExports]);
    
    useEffect(() => {
        console.log(`imports: ${exports}`);
    }, [exports]);

    return (
        <Form onSubmit={handleSubmit}>
            <Table responsive>
                <tbody>
                    <tr>
                        <td className='new-planet-form'><Form.Label>Planet Name:</Form.Label></td>
                        <td className='new-planet-form new-planet-form-name'>
                            <Form.Control type="text" value={planetName} onChange={handlePlanetNameChange} />
                        </td>
                        <td className='new-planet-form new-planet-form-button'>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </td>
                    </tr>
                    <tr>
                    <td className='new-planet-form'><Form.Label>Imports:</Form.Label></td>
                        {selectedImports.map((importValue, index) => (
                        <>
                            <td className='new-planet-form new-planet-form-import'>
                                <Form.Select className='industry-select' aria-label="Default select example" value={importValue} onChange={(event) => handleImportChange(event, index)}>
                                    <option value="">{selectedImports[index] || "Select an import"}</option>
                                    {availableIndustries.map((industry) => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))}
                                </Form.Select>
                            </td>
                        </>
                        ))}
                    </tr>
                    <tr>
                    <td className='new-planet-form'><Form.Label>Exports:</Form.Label></td>
                    {selectedExports.map((exportValue, index) => (
                        <>
                            <td className='new-planet-form new-planet-form-export'>
                                <Form.Select className='industry-select' aria-label="Default select example" value={exportValue} onChange={(event) => handleExportChange(event, index)}>
                                    <option value="">{selectedExports[index] || "Select an export"}</option>
                                    {availableIndustries.map((industry) => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))}
                                </Form.Select>
                            </td>
                        </>
                    ))}
                    </tr>
                </tbody>
            </Table>
            <NewPlanetPopulate updatedPlanet={updatedPlanet} />
        </Form>
    );
};

export default NewPlanetForm;