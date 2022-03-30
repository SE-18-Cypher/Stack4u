import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';
import "./TextInputPage.css";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import bg from "./../../../resources/images/computerImage.png";
import axios from "axios";

export default function TextInputPage() {
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user === null) {
      navigate('/access_error')
    }
  })
  const [userinput, setuserinput] = React.useState("")

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



  function getInput() {
    axios({
      method: "POST",
      url: "/input",
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  return (
    <div className="bground" style={{ backgroundImage: `url(${bg})` }}>
      <div className='textinput'>
        <form action = "/input" method="POST">
          <div className='description'>

            <TextField
              id="filled-multiline-static"
              name="input"
              label="Please Enter The Requirement Specification"
              fullWidth
              multiline
              rows={30}
              defaultValue={userinput} onChange={(e) => e.target.value}
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
            <Button type="submit" variant="contained" size="small">
              Submit
            </Button></div>
        </form>
      </div>
    </div>
  )
}
