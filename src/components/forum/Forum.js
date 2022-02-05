import React from 'react';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

import './Forum.css';

import img from './../../resources/images/logo.jpg';

export default function Forum() {
  
  const [view, setView] = React.useState(false);
  const toggleView = () => setView((view) => !view);
  const [docClicked, setDocClicked] = React.useState(0);

  const content = [
    {
      id:1001,
      topic:'This is the Topic',
      desc: 'This is the description',
      likes:10,
      comments:20,
      profilePicture: img,
      currentUserLiked: true
    },
    {
      id:2002,
      topic:'This is the Topic 2 ',
      desc: 'This is the description 2 ',
      likes:20,
      comments:15,
      profilePicture:img,
      currentUserLiked: false
    }
  ]
  
  function openDocument(id){
    toggleView();
    setDocClicked(id);
  } 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Forum</h1>
        {content.map( (eachContent,index)=>
        (
          <div className="eachQuery" key={index}>
            <Paper elevation={1} onClick={() => openDocument(eachContent)}>
                <img src={eachContent.profilePicture} width={40} style={{float:'left'}}/>
                <h3 style={{marginLeft:50}}> {eachContent.topic} </h3>
                <br/>
                <p> {eachContent.topic} </p>

                <div style={{marginLeft:550}}>
                  { eachContent.currentUserLiked ? (
                    <Button> <FavoriteIcon/> {eachContent.likes} </Button>
                  ) : (
                    <Button> <FavoriteBorderIcon/> {eachContent.likes} </Button>
                  )}
                  <Button> <CommentIcon/> {eachContent.comments} </Button> 
                </div>
      
            </Paper>        
        </div>
        ))}
        <Modal open={view} onClose={toggleView}>
          <Box sx={style}>
            {docClicked.topic}
          </Box>
        </Modal>
    </div>
  );
}