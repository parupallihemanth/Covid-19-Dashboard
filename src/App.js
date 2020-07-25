import React, { useState, useEffect} from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import Infobox from './Infoboxes';
import Map from './Map';
import Table from './Table';
import { sortData} from './util';
import LineGraph from './LineGraph'
import './App.css';

function App() {

  const [ countries, setCountries] = useState([])
  const [ country, setCountry] = useState('worldwide')
  const [ countryInfo, setCountryInfo] = useState({});
  const [ tableData, setTableData ] = useState([])

  useEffect( () =>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then( (data) => {
      setCountryInfo(data)
    })
  })

  useEffect( () => {

    const getCountries = async() =>{
     await  fetch('https://disease.sh/v3/covid-19/countries')
            .then( response => response.json())
            .then((data) =>{
                const countries = data.map( (country) =>(
                  {
                  name : country.country,
                  value : country.countryInfo.iso2
                  }
                ))

                const sortedData = sortData(data)  
                setTableData(sortedData)
                setCountries(countries)
            } )
    }

    getCountries()

  }, [])

  const changeCountry =  async( event ) =>{

        const countryCode = event.target.value
        setCountry(countryCode);

        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
                                    `https://disease.sh/v3/covid-19/countries/${countryCode}`
        
        await fetch(url) 
          .then( response => response.json())
          .then ( data => {
              setCountry(countryCode);
              setCountryInfo(data);
          })
        
  }

  // console.log('country Info >>>>', countryInfo);

  return (
    <div className="app">
      <div className="app__left">

      <div className="app__header">

<h1>Covid-19 tracker</h1>
<FormControl className="app__dropdown">
  <Select contained="variant" value={country} onChange={changeCountry}>
  <MenuItem value="worldwide">Worldwide</MenuItem>

    {
      countries.map( (country, index) =>(
      <MenuItem key={index} value={country.value}  >{ country.name}</MenuItem>
      ))
    }

  </Select>
</FormControl>

</div>


<div className="app__stats">
  <Infobox title="Caronavirus" cases={countryInfo.todayCases} total={countryInfo.cases}/>
  <Infobox title="Recovery" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
  <Infobox  title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>

</div>






{/* map */}
<Map />

      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide live cases</h3>

        </CardContent>

        

        {/* Graph */}
        <LineGraph />

      </Card>
      

    </div>
  );
}

export default App;
