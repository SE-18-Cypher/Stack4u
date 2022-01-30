import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import reactLogo from './../../../resources/images/reactLogo.png';
import ReactModal from 'react-modal';
import './Database.css';
export default function Database() {

  function c(){
    alert("W");
  }

  const content = [
    [reactLogo,'ReactJs'], 
    [reactLogo,5], 
    [reactLogo,4], 
    [reactLogo,3], 
    [reactLogo,2],
    [reactLogo,1],
    [reactLogo,3], 
    [reactLogo,2],
    [reactLogo,1],
    [reactLogo,3], 
    [reactLogo,2],
    [reactLogo,1],
  ];
  
  function view(data){
    console.log(data[0]);
    toggleView();
  }

  const [view1, setView] = React.useState(false);
  const toggleView = () => setView((view1) => !view1);
  return (
      <div>   
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {content.map((eachContent,index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <div>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 1,
                    width: 400,
                    height: 180,
                  },
                }}
              >
                <Paper elevation={24} onClick={c} className="eachTechContent"> 
                  <div style={{float:'left',marginTop:10}}>
                      <img src={eachContent[0]} alt='react logo' width={150} />
                  </div>
                  <div style={{float:'left'}}>
                    <p style={{marginTop:20}}> Name : {eachContent[1]} </p> 
                    <p style={{marginTop:0}}> Description: {eachContent[1]} </p> 
                    <p>Click to view</p>
                  </div>
                </Paper>
              </Box>
            </div>
          </Grid>
        ))}
        </Grid>
      </div>
    );
}

 
