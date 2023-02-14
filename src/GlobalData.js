import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {  makeStyles } from '@mui/material/styles';

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
  return (
    <div className={classes.root}>
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
        <Paper elevation={3}>
          <Typography variant="h2" gutterBottom >
            10000
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Global Data as of today
          </Typography>
        </Paper >
        <Paper elevation={3} style={{color:'orage'}}>
          <Typography variant="h2" gutterBottom>
            10000
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Active Data as of today
          </Typography>
        </Paper>
        <Paper elevation={3}>
          <Typography variant="h2" gutterBottom>
            10000
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Recovered Data as of today
          </Typography>
        </Paper>
        <Paper elevation={3}>
          <Typography variant="h2" gutterBottom>
            10000
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Fetalities Data as of today
          </Typography>
        </Paper>
      </Box>
    </div>
  );
}
export default GlobalData