import React, { useState } from 'react';
import './properties.css';

// import {fetchJsonWrapper} from '../utils';

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };
const PROPERTY_API = 'http://localhost:5000/api/properties';

export const fetchJsonWrapper = ({
    endpoint,
    method,
    headers = DEFAULT_HEADERS,
    body
}, resultFunc) => {
    return fetch(endpoint, { method, headers, body: JSON.stringify(body) })
        .then(res => res.json())
        .then(resultFunc)
        .catch(console.error);
}

const findProperty = (address, setData) => {
    if (address.length === 0) {
        return alert('No input!');
    }
    return fetchJsonWrapper({
        endpoint: PROPERTY_API,
        method: "POST",
        body: { lookup: address.toString().toLowerCase() }
    }, setData);
}

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const Address = (props) => {
    const { ADDRESS, PRICE, BEDS, BATHS, } = props.property;
    return (
        <div >
          <div className="card-header">
            <p>Price: {formatter.format(PRICE)} </p>
          </div>
        <div className="card-body">
          {ADDRESS}
          <br/>
          Beds: {BEDS}
          <br/>
          Baths: {BATHS}
          <br/>
          Square Feet: {props.property['SQUARE FEET']}
        </div>
     </div>
    );
}


function Properties() {
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState('');

    return (
        <div className="container">
            <div className="search-header">
              <input className="search-bar" type="text" placeholder="Enter an address or zip code" onChange={event => {setSearch(event.target.value)}}/>
              <button className="search-button" onClick={() => findProperty(search, setProperties)}>Search</button>
            </div> 
            <div className="card-list">
              {properties.map((property, idx) => <Address property={property}/>)}
            </div>  
        </div>
    );
}




export default Properties;