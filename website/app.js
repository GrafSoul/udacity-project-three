'use strict';
/**
 * Define Global Variables
 * 
*/
const apiKey = '903348d02d96029952e7e627ef03dcde';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?id=';

const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

const entriesList = document.getElementById('entriesList');
const countList = document.getElementById('count-list');

const entryDate = document.getElementById('date');
const entryContent = document.getElementById('content');
const entryTemp = document.getElementById('temp');

const emptyEntry = document.querySelector('.entry-empty');
const emptyOneEntry = document.querySelector('.entry-one-empty');
const lastEntry = document.querySelector('.last-entry');

const localData = JSON.parse(localStorage.getItem('weather'));
let dataEntries = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description Reate a new date instance dynamically with JS.
*/
let timeData = new Date();
let date = timeData.getMonth() + '.' + timeData.getDate() + '.' + timeData.getFullYear();
let time = timeData.getHours() + ':' + timeData.getMinutes();

/**
* @description Helper for create new html element.
* @param {string} tag - the name of the tag of the new element.
* @param {string} className - the class name of the new element (optional).
* @returns {Node} - new HTML element
*/
const createNewElement = (tag, className = '') => {
    let newElement = document.createElement(tag);
    className !== '' ? newElement.classList.add(className) : null;
    return newElement;
};

/**
* @description Helper for сonverts degrees from Kelvins to Celsius.
* @param {number} deg - degree in Kelvin.
* @returns {number} - degree in Celsius.
*/
const kelvinToCelsius = deg => (deg - 273.15).toFixed(1);

/**
* @description Helper for сonverts degrees from Kelvins to Fahrenheit.
* @param {number} deg - degree in Kelvin.
* @returns {number} - degree in Fahrenheit.
*/
const kelvinToFahrenheit = deg => ((deg - 273.15) * 1.8000 + 32.00).toFixed(1);

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
* @description Function for getting project data from the server or localStorage.
*/
const getProjectData = async () => {
    const res = await fetch('/get');

    if (dataEntries.length === 0 && localData !== null) {
        dataEntries = localData.reverse();
        // Adding all elements to the page.
        dataEntries.forEach(entry => {
            generateEntry(entry);
            generateOneEntry(entry);
        });
        setProjectData('/set', dataEntries.reverse());           
    } else {
        try {
            dataEntries = await res.json();
            // Adding all elements to the page.
            dataEntries.reverse().forEach(entry => {
                generateEntry(entry);
                generateOneEntry(entry);
            });
        } catch(error) {
            console.log('error', error);
        }
    }
    toggleOneEmptyEntry();
    toggleEmptyEntry();
    counterEntriesList();
};

/**
* @description Function for sending data to the server.
* @param {string} url - link for the server router.
* @param {object} data - data to send to the server.
* @returns {array} - array of objects to store on the server.
*/
const setProjectData = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log('error', error);
    }
};

/**
* @description Function POST Project Data.
* @param {string} baseURL - link to the Web API server.
* @param {string} zip - zip code of the city.
* @param {string} key - API secret key.
* @returns {object} - object with data from the API server.
*/
const getCurrentWeather = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL + zip + '&appid='+ key);
    try {  
        let data = await res.json();
        return data;
    }  catch(error) {
        console.log('error', error);
    }
};

/**
* @description Function for creating a new entry element on the page.
* @param {object} entry - object with data for creating a entry.
*/
const generateOneEntry = (entry) => {
    entryDate.innerHTML = '';
    entryContent.innerHTML = '';
    entryTemp.innerHTML = '';  

    let tempCelsius = kelvinToCelsius(entry.data.main.temp);
    let tempFahrenheit = kelvinToFahrenheit(entry.data.main.temp);

    let entryTempElement = `
        <div class="item-city">                
            <span class="city">${entry.data.name}, ${entry.data.sys.country}</span> |
            <span class="temperature">${tempFahrenheit}</span> °F /${' '}
            <span class="temperature">${tempCelsius}</span> °C<br>
            <span class="zip">zip: ${entry.zip}</span><br>
        </div>
        <div class="weather">Weather:
            <span class="item-value"> ${entry.data.weather[0].main}, ${entry.data.weather[0].description}</span>
        </div>
        <div class="wind">Wind:
            <span class="item-value"> ${entry.data.wind.speed} m/s, (${entry.data.wind.deg})</span>
        </div>
        <div class="pressure">Pressure:
            <span class="item-value"> ${entry.data.main.pressure} hpa</span>
        </div>
        <div class="humidity">Humidity:
            <span class="item-value"> ${entry.data.main.humidity} %</span>
        </div>
    `;
    entryDate.innerHTML = entry.date;
    entryContent.innerHTML = entry.feelings;
    entryTemp.innerHTML = entryTempElement;
};

/**
* @description Function for creating a new entry element for list entries on the page.
* @param {object} entry - object with data for creating a entry.
*/
const generateEntry = (entry) => {
    let itemEntry = createNewElement('section', 'item-entry');
    let tempCelsius = kelvinToCelsius(entry.data.main.temp);
    let tempFahrenheit = kelvinToFahrenheit(entry.data.main.temp);

    let entryElements = `
        <div class="item-info">
            <div class="item-date-del">
                <div class="item-date">${entry.date}</div>
                <span id="btn_${entry.id}" class='delete-entry'>delete entry</span>
            </div> 
            <p class="item-feeling">${entry.feelings}</p>
        </div>
        <div class="item-weather">
            <div class="item-city">                
                <span class="city">${entry.data.name}, ${entry.data.sys.country}</span> |
                <span class="temperature">${tempFahrenheit}</span> °F /${' '}
                <span class="temperature">${tempCelsius}</span> °C<br>
                <span class="zip">zip: ${entry.zip}</span><br>
            </div>
            <div class="weather">Weather:
                <span class="item-value"> ${entry.data.weather[0].main}, ${entry.data.weather[0].description}</span>
            </div>
            <div class="wind">Wind:
                <span class="item-value"> ${entry.data.wind.speed} m/s, (${entry.data.wind.deg})</span>
            </div>
            <div class="pressure">Pressure:
                <span class="item-value"> ${entry.data.main.pressure} hpa</span>
            </div>
            <div class="humidity">Humidity:
                <span class="item-value"> ${entry.data.main.humidity} %</span>
            </div>
        </div>
    `;
    itemEntry.id = `entry_${entry.id}`;
    itemEntry.innerHTML = entryElements;
    entriesList.prepend(itemEntry);
};

/**
* @description To hide or display the information bar about the availability of the entries.
*/
const toggleEmptyEntry = () => {
    if(dataEntries.length === 0) {
        emptyEntry.style.display = 'block';
    } else {
        emptyEntry.style.display = 'none';
    }
};

/**
* @description To hide or display the information bar about the availability of the entry.
*/
const toggleOneEmptyEntry = () => {
    if(dataEntries.length === 0) {
        emptyOneEntry.style.display = 'block';
        lastEntry.style.display = 'none';
    } else {
        emptyOneEntry.style.display = 'none';
        lastEntry.style.display = 'flex';
    }
};

/**
* @description Function for counting the number of entries.
*/
const counterEntriesList = () => {
    if(dataEntries.length === 0) {
        countList.innerText = 0;
    } else {
        countList.innerText = dataEntries.length;
    }   
};

/**
 * End Main Functions
 * Begin Event listener
 * 
*/

/**
* @description Function for getting data in load page.
*/
window.onload = () => getProjectData();
