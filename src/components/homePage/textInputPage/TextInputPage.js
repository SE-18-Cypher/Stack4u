import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';
import "./TextInputPage.css";
import MenuItem from '@mui/material/MenuItem';

export default function TextInputPage() {
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();

    React.useEffect(() => {
        if (user === null) {
            navigate('/access_error')
        }
    },)
    const [userinput, setuserinput] = React.useState("")

    const currencies = [
      {
        value: 'USD',
        label: '$',
      },
      {
        value: 'EUR',
        label: '€',
      },
      {
        value: 'BTC',
        label: '฿',
      },
      {
        value: 'JPY',
        label: '¥',
      },
    ];
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };    
  return (
    <div className='textinput'>
      <TextField
          id="filled-multiline-static"
          label="Please Enter The Requirement Specification"
          fullWidth 
          multiline
          rows={10}
          defaultValue={userinput} onChange = {(e)=>e.target.value}
          variant="filled"
        />

        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div> 
  )
}
