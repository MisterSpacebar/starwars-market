import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationTabs from './components/navigation';
import Commodities from './components/Commodities';
import NewPlanet from './components/NewPlanet';
import About from './components/About';

import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { database } from './FirebaseConfig';
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

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


function App() {

  const [availablePlanets, setAvailablePlanets] = useState([]);
  const [ tabUpdate, setTabUpdate ] = useState(false);

  useEffect(() => {
    console.log('About');

    const timer = setTimeout(() => {
      async function initiateTradeBetweenPlanets(planet1, planet2) {
          const industriesArr = [];
          const selectedIndustries = new Set();

          while (selectedIndustries.size < 4) {
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
                          if (commodity[industry][item].supply > planet_two.commodities[i][industry][item].demand) {
                              console.log('commodity[industry][item]:', commodity[industry][item].name);
                              console.log('mirror name: ',planet_two.commodities[i][industry][item].name)
                              commodity_names.push(commodity[industry][item].name);
                              console.log('planet one commodity data ', commodity[industry][item]);
                              console.log('planet two commodity data ', planet_two.commodities[i][industry][item]);

                              // generate a random number to determine the amount of the commodity to trade
                              let tradeAmount = generateRandomNumber(100) * 5;
                              if (tradeAmount >= commodity[industry][item].supply) {
                                  tradeAmount = generateRandomNumber(parseInt(commodity[industry][item].supply / 5)) * 5;
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
                              let planet_one_ratio = generateRandomRatio() * Math.pow(( 1.000 * commodity[industry][item].supply / (commodity[industry][item].supply - tradeAmount)),5);

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
                              let planet_two_ratio = generateRandomRatio() * Math.pow((1.000 * (planet_two.commodities[i][industry][item].supply - tradeAmount) / planet_two.commodities[i][industry][item].supply),5);

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

                          }
                      } // end of item for loop
                  }
              } // end of child for loop (commodities)
          } // end of parent for loop (category)

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
      }
    }, 1000);

    return () => clearTimeout(timer);

  }, [tabUpdate]);

  console.log('App');
  return (
    <div className='main-window'>
      <Router>
        <header className='navigation-header nav nav-tabs'>
          <NavigationTabs tabUpdate={tabUpdate} setTabUpdate={setTabUpdate} />
        </header>
        <div className='main-jumbotron'>
          <div>
            <h1>Welcome to Star Wars Planets</h1>
            <p>Choose a tab to view commodities or add a new planet</p>
            <br></br>
          </div>
          <Routes>
            <Route path='/about' element={<About availablePlanets={availablePlanets} setAvailablePlanets={setAvailablePlanets} />} />
            <Route path='/table' element={<Commodities availablePlanets={availablePlanets} setAvailablePlanets={setAvailablePlanets} />} />
            <Route path='/new-planet' element={<NewPlanet />} />
          </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
