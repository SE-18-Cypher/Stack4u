import { Modal, TextField } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';
import "./TextInputPage.css";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import Box from '@mui/material/Box';
import AccuracyBar from './../../accuracyBar/AccuracyBar';

export default function TextInputPage() {
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user === null) {
      navigate('/access_error')
    }
  })

  const currencies = [
    {
      value: 'USD',
      label: 'Mobile application',
    },
    {
      value: 'EUR',
      label: 'Web application',
    },
    {
      value: 'BTC',
      label: 'Both',
    },

  ];
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [userinput, setuserinput] = React.useState("")
  const [submitButton, setSubmitButton] = React.useState(false);

  const [lessAccuracyBox, setLessAccuracyBox] = React.useState(false);
  const [accuracyValue, setAccuracyValue] = React.useState(0);

  const [accuracyValueWF, setAccuracyValueWF] = React.useState(0);
  const [accuracyValueMF, setAccuracyValueMF] = React.useState(0);
  const [accuracyValueB, setAccuracyValueB] = React.useState(0);
  const [accuracyValueD, setAccuracyValueD] = React.useState(0);
  React.useEffect(() => {
    let words = userinput.split(' ')
    if (words.length > 140) {
      setSubmitButton(true)
    }
  }, [userinput])

  function sendData(event) {
    event.preventDefault()
    axios.post('/input', {
      userInput: userinput,
    })
      .then(function (response) {
        console.log(response)
        console.log(parseInt(response.data));
        setAccuracyValue(() => parseInt(response.data["1"]));
        setAccuracyValueWF(() => parseInt(response.data["2"]));
        setAccuracyValueMF(() => parseInt(response.data["3"]));
        setAccuracyValueB(() => parseInt(response.data["4"]));
        setAccuracyValueD(() => parseInt(response.data["5"]));
        console.log(accuracyValue)
        if (parseInt(response.data["1"]) > 6) {
          getTechStack()
        }
        else if (parseInt(response.data["1"]) < 6) {
          setLessAccuracyBox(true);
          // navigate('/questionnaire')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getTechStack() {
    axios.post('/finalStack')
      .then(function (response) {
        sessionStorage.setItem("finalTechStackWF", response.data["1"]);
        sessionStorage.setItem("finalTechStackMF", response.data["2"]);
        sessionStorage.setItem("finalTechStackB", response.data["3"]);
        sessionStorage.setItem("finalTechStackD", response.data["4"]);
        navigate('/output')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '50%',
    bgcolor: 'background.paper',
    borderRadius: '50px'
  };

  return (
    <div className="textInputBg">
      <Modal
        open={lessAccuracyBox}
        onClose={() => setLessAccuracyBox(false)}
      >
        <Box sx={style}>
          <div style={{ textAlign: 'center', marginTop: '5%' }} >
            <p> The Accuracy is Low </p>
            <p> {accuracyValue} % </p>
            <div style={{ marginLeft: '34%' }} > <AccuracyBar value={accuracyValue} /> </div>
            <br />
            <div style={{ textAlign: 'left', marginLeft: '34%' }}>
              <p> Web Frontend    : {accuracyValueWF} % </p>
              <p> Mobile Frontend : {accuracyValueMF} % </p>
              <p> Backend         : {accuracyValueB}  % </p>
              <p> Database        : {accuracyValueD}  % </p>
            </div>
          </div>
        </Box>
      </Modal>
      <div className='textinput'>
        <form name='manual_input'>
          <div className='description'>

            <TextField
              id="filled-multiline-static"
              name="input"
              label="Please Enter The Requirement Specification"
              fullWidth
              multiline
              rows={25}
              value={userinput}
              onChange={(e) => setuserinput(e.target.value)}
              variant="filled"
            />
          </div>

          <div className='select'>
            <TextField
              className='opotions'
              id="outlined-select-currency"
              select
              label="Select"
              value={currency}
              onChange={handleChange}
              helperText="Please select the application you want"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className='button'>
            <Button type="submit" variant="contained" size="small" onClick={(e) => sendData(e)} disabled={!submitButton}>
              Submit
            </Button></div>
        </form>
      </div>
    </div>
  )
}
