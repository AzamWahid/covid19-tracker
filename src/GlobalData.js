import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NumericFormat } from 'react-number-format';

// const theme = createMuiTheme();

// const useStyles = makeStyles((theme) => {
//   root: {
//     width: '100%',
//     maxWidth: 500,
//   }
// });


const useStyleTypography = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },

});

const GlobalData = () => {
  const classes = useStyleTypography();
  const [globalData, setGlobalData] = useState();
  const [loadData, setloadData] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setloadData(true)
        const response = await fetch('https://api.covid19api.com/summary');
        const data = await response.json();
        setGlobalData(data.Global);
        setloadData(false)
      } catch (error) {
      }
    }
    fetchData();
  }, [])

  const loadmessage = "loading...."
  if (loadData) {
    return (
      <div className={classes.root}>
        {(
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
                  {loadmessage}
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                  Confirmed Data as of today
                </Typography>
              </Paper >
              <Paper elevation={3} style={{ color: 'orange' }}>
                <Typography variant="h4" gutterBottom >
                  {loadmessage}

                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                  New Confirmed Data as of today
                </Typography>
              </Paper>
              <Paper elevation={3} style={{ color: 'green' }}>
                <Typography variant="h4" gutterBottom>
                  {loadmessage}
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                  Recovered Data as of today
                </Typography>
              </Paper>
              <Paper elevation={3} style={{ color: 'red' }}>
                <Typography variant="h4" gutterBottom>
                  {loadmessage}
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                  Death Data as of today
                </Typography>
              </Paper>
            </Box>
          </div>)}
      </div >
    );
  }

  return (
    <div className={classes.root}>
      {globalData && (
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
                <NumericFormat value={globalData && globalData.TotalConfirmed} displayType={'text'} thousandSeparator="," />
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                Confirmed Data as of today
              </Typography>
            </Paper >

            <Paper elevation={3} style={{ color: 'orange' }}>
              <Typography variant="h4" gutterBottom >
                <NumericFormat value={globalData && globalData.NewConfirmed} displayType={'text'} thousandSeparator="," />
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                New Confirmed Data as of today
              </Typography>
            </Paper>

            <Paper elevation={3} style={{ color: 'green' }}>
              <Typography variant="h4" gutterBottom>
                <NumericFormat value={globalData && globalData.TotalRecovered} displayType={'text'} thousandSeparator="," />
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                Recovered Data as of today
              </Typography>
            </Paper>
            
            <Paper elevation={3} style={{ color: 'red' }}>
              <Typography variant="h4" gutterBottom>
                <NumericFormat value={globalData && globalData.TotalDeaths} displayType={'text'} thousandSeparator="," />
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                Death Data as of today
              </Typography>
            </Paper>
          </Box>
        </div>)}
    </div >
  );
}
export default GlobalData