import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';
import "./TextInputPage.css";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import bg from "./../../../resources/images/computerImage.png";
    
    

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
  return (
    <div className="bground" style={{ backgroundImage: `url(${bg})` }}>
    <div className='textinput'>
      <div className='description'>
        <TextField
          id="filled-multiline-static"
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
        <Button variant="outlined" size="small">
          Small
        </Button></div>
      
    </div>
    </div>
  )
}
