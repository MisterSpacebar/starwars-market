import React from 'react';
import { useState, useEffect } from 'react';

import { database } from '../FirebaseConfig';
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

import '../styles/about.css';

const About = ({ availablePlanets, setAvailablePlanets }) => {

    const [trade, setTrade] = useState(false);

    useEffect( () => {
        console.log('About');

        async function initiateTradeBetweenPlanets(planet1, planet2) {
            const planets = [planet1, planet2];
          
            for (let i = 0; i < planets.length; i++) {
              const otherPlanet = planets[(i + 1) % 2]; // Get the other planet
          
              const docRef = doc(database, "planets", planets[i]);
              const docSnap = await getDoc(docRef);
          
                if (docSnap.exists()) {
                    let planetData = docSnap.data();
            
                    console.log(`Processing planet ${planets[i]}`);
            
                    for (let category of planetData.commodities) {
                        console.log(`Processing category ${category.key}`);
                      
                        if (category.hasOwnProperty(selectedCommodity)) {
                            for (let commodity of category[selectedCommodity]) {
                                console.log(`Processing commodity ${commodity.name}`);
                        
                                // Check if the buy price at this planet is lower than the sell price at the other planet
                                const otherPlanetDocRef = doc(database, "planets", otherPlanet);
                                const otherPlanetDocSnap = await getDoc(otherPlanetDocRef);
                                const otherPlanetData = otherPlanetDocSnap.data();
                                const otherCommodity = otherPlanetData.commodities[category.key][commodity.name];

                                console.log(`commodity.buy_price: ${commodity.buy_price}`);
                                console.log(`otherCommodity.sell_price: ${otherCommodity.sell_price}`);
                                
                        
                                if (commodity.buy_price < otherCommodity.sell_price) {
                                    // Update the imported_from and exported_to fields
                                    commodity.imported_from = otherPlanet;
                                    otherCommodity.exported_to = planets[i];
                            
                                    // Update the supply
                                    let newSupply = parseInt(commodity.supply) - parseInt(buy) + parseInt(sell);
                                    commodity.supply = newSupply;
                                    otherCommodity.supply = parseInt(otherCommodity.supply) + parseInt(buy) - parseInt(sell);
                            
                                    // Update the buy and sell prices
                                    let ratio = 1.000 * (commodity.demand / commodity.supply);
                                    let SDratio = ratio > 1 ? 1 - (ratio - 1) * 0.00125 : 1 + (1 - ratio) * 0.00125;
                            
                                    commodity.buy_price = parseInt(commodity.buy_price * SDratio);
                                    commodity.sell_price = parseInt(commodity.sell_price * SDratio);
                            
                                    console.log(`Updated commodity ${commodity.name}`);
                                }
                            }
                        }
                    }
            
                    await setDoc(doc(database, "planets", planets[i]), planetData);
                    console.log(`Updated planet ${planets[i]}`);
                } else {
                    console.log("No such document!");
                }
            }
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

            await initiateTradeBetweenPlanets(planet1, planet2);
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

    }, [trade]);

    return (
        <div className='jumbotron'>
            <h2>About Star Wars Market</h2>
            <p>Welcome to the Star Wars Market app! This app allows you to explore and trade various commodities from the Star Wars universe.</p>
            <p>Whether you're a Jedi, Sith, or just a fan of the franchise, you'll find a wide range of items to buy and sell.</p>
            <p>May the Force be with you!</p>
            <button onClick={() => setTrade(!trade)}>Trade</button>
        </div>
    );
};

export default About;