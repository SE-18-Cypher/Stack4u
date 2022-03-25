import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';
import "./TextInputPage.css";
import MenuItem from '@mui/material/MenuItem';
export default function BasicButtons() {
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
    <div className='textinput'>
      <div className='description'>
        <TextField
          id="filled-multiline-static"
          label="Please Enter The Requirement Specification"
          fullWidth
          multiline
          rows={10}
          defaultValue={userinput} onChange={(e) => e.target.value}
          variant="filled"
        />
      </div>

      <div className='select'>
        <TextField 
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your platform"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        import Button from '@mui/material/Button';


  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
      </div>
    </div>
  )
}
