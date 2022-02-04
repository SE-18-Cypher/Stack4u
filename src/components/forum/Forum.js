import React from 'react';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './Forum.css';

export default function Forum() {
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Forum</h1>
        <div className="eachQuery">
            <Paper elevation={24}>
                <Avatar src="/broken-image.jpg" />
                <br/>

                Content
            </Paper>        
        </div>
    </div>
  );
}