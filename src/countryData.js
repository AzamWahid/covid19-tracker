import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NumericFormat } from 'react-number-format';
// import { makeStyles } from '@material-ui/core/styles';

const useStyleTypography = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },

});
const CountryData = () => {

  const classes = useStyleTypography();
  const [countries, Setcountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({ Country: "Pakistan" });
  const [selectedCountrydata, setSelectedCountrydata] = useState(0);

  const handleCountryChange = (event, value) => {

    setSelectedCountry(value);

  };
  // const [loadData, setloadData] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.covid19api.com/countries');
        const data = await response.json();
        if (data && data.length) {
          Setcountries(data);
        } else {
          throw new Error('Invalid data returned from the API');
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    async function fetchSelectedData() {
      try {
        // setloadData(true)
        const response = await fetch('https://api.covid19api.com/summary');
        const data = await response.json();
        if (data && data.Countries) {
          const selCntryData = data.Countries.find(country => country.Country === selectedCountry.Country);
          setSelectedCountrydata(selCntryData);
          // setloadData(false)
        } else {
          throw new Error('Invalid data returned from the API');
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    fetchSelectedData();
  }, [selectedCountry])

  return (
    <div className={classes.root}>
      {countries.length > 0 && (
        <Autocomplete
          style={{ margin: 'auto' }}
          id="country-select-demo"
          sx={{ width: 300 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => (option ? option.Country : '')}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              {option.Country}
            </Box>
          )}
          value={selectedCountry}
          onChange={handleCountryChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />)}

      <div>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: '100%',
              height: 128,
            },
          }}
        >
          <Paper elevation={3} style={{ color: 'green' }}>
            <Typography variant="h4" gutterBottom >
              <NumericFormat value={selectedCountrydata ? selectedCountrydata.TotalConfirmed : 0} displayType={'text'} thousandSeparator="," />
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
              Confirmed Data as of today
            </Typography>
          </Paper >

          <Paper elevation={3} style={{ color: 'orange' }}>
            <Typography variant="h4" gutterBottom >
              <NumericFormat value={selectedCountrydata ?  selectedCountrydata.NewConfirmed : 0} displayType={'text'} thousandSeparator="," />
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
              New Confirmed Data as of today
            </Typography>
          </Paper>

          <Paper elevation={3} style={{ color: 'green' }}>
            <Typography variant="h4" gutterBottom>
              <NumericFormat value={selectedCountrydata ?  selectedCountrydata.TotalRecovered : 0} displayType={'text'} thousandSeparator="," />
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
              Recovered Data as of today
            </Typography>
          </Paper>

          <Paper elevation={3} style={{ color: 'red' }}>
            <Typography variant="h4" gutterBottom>
              <NumericFormat value={selectedCountrydata ?  selectedCountrydata.TotalDeaths : 0} displayType={'text'} thousandSeparator="," />
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
              Death Data as of today
            </Typography>
          </Paper>
        </Box>
      </div>
    </div >
  );
}



export default CountryData