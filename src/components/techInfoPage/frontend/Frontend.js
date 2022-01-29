import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ReactModal from 'react-modal';

import reactLogo from './../../../resources/images/reactLogo.png';
import './Frontend.css';
export default function Frontend() {

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
      <p> FRONT END </p>  

      <ReactModal 
        isOpen={view1}
        style={{
          overlay: {
            backgroundColor: '#b2b2b2'
          },
          content: {
            color: 'red',
            border: '0',
            borderRadius: '4px',
            bottom: 'auto',
            minHeight: '25rem',
            left: '50%',
            padding: '2rem',
            position: 'fixed',
            right: 'auto',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            minWidth: '20rem',
            width: '80%',
            maxWidth: '60rem'
          }
        }}
      >
          <button onClick={toggleView}><p>X</p></button>
          <p>hello</p>
      </ReactModal>

      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {content.map((eachContent,index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <div>
              <div style={{float:'left'}}>
                <Button onClick={() => view(eachContent)} style={{backgroundColor:'transparent'}}>
                  <img src={eachContent[0]} alt='react logo' width={150} className="eachTechContent"/>
                </Button>
              </div>
              <div style={{}}>
                <p>{eachContent[1]} </p> <br/>
                <p>{eachContent[1]} </p> <br/>
                <Button onClick={() => view(eachContent)} style={{backgroundColor:'transparent'}}>
                  <p>Read More!!</p>
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

    </div>
  );
}

