import React from 'react';
import { useState, useEffect } from 'react';

import { database } from '../FirebaseConfig';
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

import '../styles/about.css';
import industries from '../templates/industries';

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


const generateRandomNumber = (upTo) => {
    return Math.floor(Math.random() * (upTo - 3 + 1)) + 3;
}

function generateRandomRatio() {
    return Math.random() * 0.19 + 0.905;
}

function generateGreaterRandomRatio() {
    return Math.random() * (1.35 - 0.65) + 0.65;
}

const About = ({ availablePlanets, setAvailablePlanets }) => {

    const [trade, setTrade] = useState(false);

    useEffect( () => {
        console.log('About');

        async function initiateTradeBetweenPlanets(planet1, planet2) {
            const industriesArr = [];
            const selectedIndustries = new Set();

            while (selectedIndustries.size < 5) {
                const randomIndex = Math.floor(Math.random() * industries.length);
                selectedIndustries.add(industries[randomIndex]);
            }
            industriesArr.push(...selectedIndustries);
            let randomIndustries = toCamelCaseArray(industriesArr);
            console.log('randomIndustries:', randomIndustries);

            let planet_one = planet1;
            let planet_two = planet2;
            console.log('planet 1:', planet_one);
            console.log('planet 2:', planet_two);

            console.log('planet 1 Commodities:', planet_one.commodities);
            console.log('planet 2 Commodities:', planet_two.commodities);

            for (let industry of randomIndustries) {
                console.log('industry:', industry);
                let commodity_names = [];

                for (let i = 0; i < planet_one.commodities.length; i++) {
                    let commodity = planet_one.commodities[i];
                    console.log('commodity:', commodity);
                    if (Object.keys(commodity)[0] == industry) {
                        // console.log('commodity:', commodity);
                        console.log('commodity[industry]:', commodity[industry]);
                        console.log('planet_two.commodities mirror:', planet_two.commodities[i][industry]);
                        
                        for (let item = 0; item < commodity[industry].length; item++) {
                            // if the supply of the commodity on planet one is greater than the demand on planet two
                            if (commodity[industry][item].supply >= planet_two.commodities[i][industry][item].demand) {
                                console.log('commodity[industry][item]:', commodity[industry][item].name);
                                console.log('mirror name: ',planet_two.commodities[i][industry][item].name)
                                commodity_names.push(commodity[industry][item].name);
                                console.log('planet one commodity data ', commodity[industry][item]);
                                console.log('planet two commodity data ', planet_two.commodities[i][industry][item]);

                                // generate a random number to determine the amount of the commodity to trade
                                let tradeAmount = generateRandomNumber(100) * 5;
                                if (tradeAmount >= commodity[industry][item].supply) {
                                    tradeAmount = generateRandomNumber(parseInt(commodity[industry][item].supply / 10)) * 5;
                                }

                                //update planet one
                                let exportingAmount = commodity[industry][item].supply - tradeAmount;
                                commodity[industry][item].supply = exportingAmount;
                                commodity[industry][item].exported_to = planet_two.planet_name;
                                console.log('updated planet one commodity data ', commodity[industry][item]);

                                //update planet two
                                let incomingAmount = planet_two.commodities[i][industry][item].supply + tradeAmount;
                                planet_two.commodities[i][industry][item].supply = incomingAmount;
                                planet_two.commodities[i][industry][item].imported_from = planet_one.planet_name;
                                console.log('updated planet two commodity data ', planet_two.commodities[i][industry][item]);

                                // adjust planet one prices
                                let planet_one_ratio = generateRandomRatio() * Math.pow(( 1.000 * commodity[industry][item].supply / (commodity[industry][item].supply - tradeAmount)),3);

                                if (planet_one_ratio < 0) {
                                  planet_one_ratio = planet_one_ratio * -1;
                                }
                                console.log('planet_one_ratio:', planet_one_ratio);

                                //update prices
                                let newBuyPrice = parseInt(commodity[industry][item].buy_price * planet_one_ratio);
                                let newSellPrice = parseInt(commodity[industry][item].sell_price * planet_one_ratio);
                                if (newBuyPrice < 0) {
                                  newBuyPrice = newBuyPrice * -1;
                                }
                                if (newSellPrice < 0) {
                                  newSellPrice = newSellPrice * -1;
                                }
                                commodity[industry][item].buy_price = newBuyPrice;
                                commodity[industry][item].sell_price = newSellPrice;
                                console.log('updated planet one pricing:', commodity[industry][item]);

                                //update supply and demand
                                
                                commodity[industry][item].supply = parseInt(commodity[industry][item].supply * generateRandomRatio());
                                commodity[industry][item].demand = parseInt(commodity[industry][item].demand * generateRandomRatio());

                                if (commodity[industry][item].supply < 0) {
                                  commodity[industry][item].supply = commodity[industry][item].supply * -1;
                                }
                                if (commodity[industry][item].demand < 0) {
                                  commodity[industry][item].demand = commodity[industry][item].demand * -1;
                                }

                                console.log('updated planet one pricing and supply/demand:', commodity[industry][item]);

                                // adjust planet two prices
                                let planet_two_ratio = generateRandomRatio() * Math.pow((1.000 * (planet_two.commodities[i][industry][item].supply - tradeAmount) / planet_two.commodities[i][industry][item].supply),3);

                                if (planet_two_ratio < 0) {
                                  planet_two_ratio = planet_two_ratio * -1;
                                }
                                console.log('planet_two_ratio:', planet_two_ratio);

                                //update prices
                                newBuyPrice = parseInt(planet_two.commodities[i][industry][item].buy_price * planet_two_ratio);
                                newSellPrice = parseInt(planet_two.commodities[i][industry][item].sell_price * planet_two_ratio);
                                if (newBuyPrice < 0) {
                                  newBuyPrice = newBuyPrice * -1;
                                }
                                if (newSellPrice < 0) {
                                  newSellPrice = newSellPrice * -1;
                                }
                                planet_two.commodities[i][industry][item].buy_price = newBuyPrice;
                                planet_two.commodities[i][industry][item].sell_price = newSellPrice;

                                //update supply and demand
                                if (planet_two.commodities[i][industry][item].supply < 0) {
                                  planet_two.commodities[i][industry][item].supply = planet_two.commodities[i][industry][item].supply * -1;
                                }
                                if (planet_two.commodities[i][industry][item].demand < 0) {
                                  planet_two.commodities[i][industry][item].demand = planet_two.commodities[i][industry][item].demand * -1;
                                }
                                planet_two.commodities[i][industry][item].supply = parseInt(planet_two.commodities[i][industry][item].supply * generateRandomRatio());
                                planet_two.commodities[i][industry][item].demand = parseInt(planet_two.commodities[i][industry][item].demand * generateRandomRatio());

                                console.log('updated planet two pricing and supply/demand:', planet_two.commodities[i][industry][item]);

                            } else {
                                //change/update other commodities in the category so it's not as stagnant
                                console.log('non-traded item:', commodity[industry][item]);
                                let newSupply = parseInt(commodity[industry][item].supply * generateRandomRatio());
                                let newDemand = parseInt(commodity[industry][item].demand * generateRandomRatio());
                                let newRatio = 1.000 * (newSupply + newDemand) / (commodity[industry][item].supply + commodity[industry][item].demand);
                                commodity[industry][item].buy_price = parseInt(commodity[industry][item].buy_price * newRatio);
                                commodity[industry][item].sell_price = parseInt(commodity[industry][item].sell_price * newRatio);
                                commodity[industry][item].supply = newSupply
                                commodity[industry][item].demand = newDemand;
                                console.log('updated planet one pricing and supply/demand:', commodity[industry][item]);
                            }
                        } // end of item for loop
                    } // end of if statement (commodities)
                } // end of child for loop (commodities)
            } // end of parent for loop (category)


            // sometimes the minerals get all out of whack, so we may need to reset them
            let averageMinerals = industries.minerals
            for(let i = 0; i < averageMinerals.length; i++) {
                if(planet_one.commodities[8].minerals[i].supply < 10 || planet_two.commodities[8].minerals[i].supply < 10 ||
                planet_one.commodities[8].minerals[i].demand < 10 || planet_two.commodities[8].minerals[i].demand < 10 ||
                planet_one.commodities[8].minerals[i].buy_price < 10 || planet_two.commodities[8].minerals[i].buy_price < 10 ||
                planet_one.commodities[8].minerals[i].buy_price > 5000000 || planet_two.commodities[8].minerals[i].buy_price > 5000000 ||
                planet_one.commodities[8].minerals[i].sell_price > 5000000 || planet_two.commodities[8].minerals[i].sell_price > 5000000 ||
                planet_one.commodities[8].minerals[i].sell_price < 10 || planet_two.commodities[8].minerals[i].sell_price < 10) {
                    // reset the minerals
                    planet_one.commodities[8].minerals[i].supply = parseInt(averageMinerals[i].supply * generateGreaterRandomRatio());
                    planet_two.commodities[8].minerals[i].supply = parseInt(averageMinerals[i].supply * generateGreaterRandomRatio());
                    planet_one.commodities[8].minerals[i].demand = parseInt(averageMinerals[i].demand * generateGreaterRandomRatio());
                    planet_two.commodities[8].minerals[i].demand = parseInt(averageMinerals[i].demand * generateGreaterRandomRatio());
                    planet_one.commodities[8].minerals[i].buy_price = parseInt(averageMinerals[i].buy_price * generateGreaterRandomRatio());
                    planet_two.commodities[8].minerals[i].buy_price = parseInt(averageMinerals[i].buy_price * generateGreaterRandomRatio());
                    planet_one.commodities[8].minerals[i].sell_price = parseInt(averageMinerals[i].sell_price * generateGreaterRandomRatio());
                    planet_two.commodities[8].minerals[i].sell_price = parseInt(averageMinerals[i].sell_price * generateGreaterRandomRatio());
                }
            }


            console.log('(updated)planet_one:', planet_one);
            console.log('(updated)planet_two:', planet_two);

            await setDoc(doc(database, "planets", planet_one.planet_name), planet_one);
            await setDoc(doc(database, "planets", planet_two.planet_name), planet_two);
        }

        async function updatePlanets() {
            const querySnapshot = await getDocs(collection(database, "planets"));
            let planets = [];
            querySnapshot.forEach((document) => {
                console.log(document.id);  // Log each document's ID
                planets.push(document.id);
            });
            setAvailablePlanets(planets);
            console.log('availablePlanets:', availablePlanets);
        }

        updatePlanets();

        async function tradeBetweenPlanets(planet1, planet2) {
            const planet1Ref = doc(database, "planets", planet1);
            const planet2Ref = doc(database, "planets", planet2);

            const planet1Doc = await getDoc(planet1Ref);
            const planet2Doc = await getDoc(planet2Ref);

            if (planet1Doc.exists() && planet2Doc.exists()) {
                console.log('planet1Doc.data():', planet1Doc.data());
                console.log('planet2Doc.data():', planet2Doc.data());
            } else {
                console.log("No such document!");
            }

            await initiateTradeBetweenPlanets(planet1Doc.data(), planet2Doc.data());
        }

        if (availablePlanets.length >= 2) {
            let randomIndex1 = Math.floor(Math.random() * availablePlanets.length);
            let randomIndex2 = Math.floor(Math.random() * availablePlanets.length);
            
            while (randomIndex2 === randomIndex1) {
                randomIndex2 = Math.floor(Math.random() * availablePlanets.length);
            }
            
            const planet1 = availablePlanets[randomIndex1];
            const planet2 = availablePlanets[randomIndex2];

            console.log('planet1:', planet1);
            console.log('planet2:', planet2);

            tradeBetweenPlanets(planet1, planet2);
            tradeBetweenPlanets(planet2, planet1);
        }

    });

    return (
        <div className='jumbotron'>
            <h2>About Star Wars Market</h2>
            <p>Welcome to the Star Wars Market app! This app is designed for fans of the Fantasy Flight Games Star Wars System, but can be adapted to any other Star Wars universe of your choice.</p>
            <p>A simple web app I made to simulate a commodities market in the fashion of space sim games such as Elite, but with Star Wars planets.</p>
            <p>It allows players to engage in interplanetary and interstellar trade. The new rules introduce the concept of trading commodities using Standard Transport Containers (STCs).</p>
            <p>The idea is to introduce a market in the Star Wars TTRPGs for my players to interact with, so those large transport vessels become a reasonable choice for the party throughout a campaign instead of always going for efficient combat or multipurpose ships, and also to incentivize upgrading from the default Firespray or YT-1300 suggested by the Edge of the Empire core rulebook (and also makes the Wayfarer-Class Medium Transport ship a likely option for groups playing EotE).</p>
            <p>This app refreshes trade data constantly while the user is on this page. This uses data, so please leave this page whenever you're done reading to save costs.</p>
            {/* <div>
                <button className='btn btn-primary' onClick={ () => setTrade(!trade) }>Trade Between Planets</button>
            </div> */}
        </div>
    );
};

export default About;