import React from 'react';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';

import './Forum.css';
import app from './../../Firebase-config';
import { getFirestore } from "@firebase/firestore";
import { addDoc, collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";

export default function Forum() {

  const database = getFirestore(app);

  const [view, setView] = React.useState(false);                                  //hook to view the comments on each query
  const toggleView = () => setView((view) => !view);                              //switch the view
 
  const [allForumQueries, setAllForumQueries] = React.useState([]);               //hook to hold the forum content

  const ref = collection(database, "Forum");    //reference to the firestore 
  React.useEffect(() => {                       //reading forum from the firestore and updating the hook
    const q = query(ref);
    onSnapshot(q, (querySnapshot) => {
      const forumContent = [];
      const documentId = [];
      var forumData = [];
      querySnapshot.forEach((doc) => {
        forumContent.push(doc.data());
        documentId.push(doc.id);
      });
      var index = 0;
      forumContent.forEach((doc) => {
        const final = { ...doc, id: documentId[index] };
        forumData.push(final);
        index++;
      });
      setAllForumQueries({ forumData });
    });
  });

  const [docClicked, setDocClicked] = React.useState('');                         //hook to hold the id of the document clicked 

  const [eachQueryComments, setEachQueryComments] = React.useState([]);   //hook to hold all the comments in the clicked query
  const [clickedQuery, setClickedQuery] = React.useState([]);             //hook to hold clicked query 
  const expandView = async (val) => {
    const docRef = doc(database, "Forum", val);
    const docSnap = await getDoc(docRef);
    setClickedQuery(docSnap.data());

    const subRef = collection(database, "Forum/" + val + "/comment");
    const q = query(subRef);
    onSnapshot(q, (querySnapshot) => {
      const allQueryArray = [];
      querySnapshot.forEach((doc) => {
        allQueryArray.push(doc.data());
      });
      setEachQueryComments({ allQueryArray });
    });
  };

  const [viewCommentQuery, setViewCommentQuery] = React.useState(false);                                //hook to add comment in a query
  const toggleViewCommentQuery = () => setViewCommentQuery((viewCommentQuery) => !viewCommentQuery);    //switch the view 

  const [commentAuthName, setCommentAuthName] = React.useState("Default");
  const [commentDescription, setCommentDescription] = React.useState("");

  const submitComment = async () => {
    const subRef = collection(database, "Forum/" + docClicked + "/comment");
    await addDoc(subRef, {
      name: commentAuthName , // name: authName
      desc: commentDescription
    });
    setCommentDescription('');
    toggleViewCommentQuery();
  };

  const [newQueryName, setNewQueryName] = React.useState("");
  const [newQueryDesc, setNewQueryDesc] = React.useState("");

  const submitQuery = async () => {
    await addDoc(ref, {
      topicname: newQueryName, 
      topicdesc: newQueryDesc
    });
    setNewQueryDesc('');
    setNewQueryName('');
  };

  function addComment() {
    toggleViewCommentQuery();
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
    overflow:'scroll',
    height:500,
    p: 4,
  };

  const style2 = {
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
      <div className="commonBg"/>
      <div style={{ position: 'relative' }}>
        <h1 style={{ textAlign: 'center' }}>Forum</h1>
        {allForumQueries.forumData && allForumQueries.forumData.map((eachContent, index) =>
        (
          <div className="eachQuery" key={index}>
            <Paper elevation={1} 
              onClick={() => {
                setDocClicked(eachContent.id);
                expandView(eachContent.id);
                toggleView();
              }}
            >
              {/* <img src={eachContent.profilePicture} width={40} alt="profile figure" style={{float:'left'}}/> */}
              <h3 style={{ marginLeft: 50 }}> {eachContent.topicname} </h3>
              <br />
              <p> {eachContent.topicdesc} </p>
              <div>
                {eachContent.currentuserliked ? (
                  <Button> <FavoriteIcon /> {eachContent.likes} </Button>
                ) : (
                  <Button> <FavoriteBorderIcon /> {eachContent.likes} </Button>
                )}
                <Button> <CommentIcon /> {eachContent.com} </Button>
              </div>
            </Paper>
          </div>
        ))}
        {!viewCommentQuery && (
          <Modal open={view} onClose={toggleView}>
            <Box sx={style}>
            <CloseIcon onClick={toggleView} style={{ float: 'right' }} />
              {/* <img src={docClicked.profilePicture} width={40}  alt="profile figure" style={{float:'left'}}/> */}
              <h3 style={{ marginLeft: 50 }}> {clickedQuery.topicname} </h3>
              <br />
              <p> {clickedQuery.topicdesc} </p>
              <div>
                {clickedQuery.currentuserliked ? (
                  <Button> <FavoriteIcon /> {clickedQuery.likes} </Button>
                ) : (
                  <Button> <FavoriteBorderIcon /> {clickedQuery.likes} </Button>
                )}
                <Button onClick={addComment}> <CommentIcon /> {clickedQuery.com} </Button>
              </div>
              {eachQueryComments.allQueryArray && eachQueryComments.allQueryArray.map((eachQuery, index) =>
              (
                <div key={index}>
                  {/* <img src={eachComment.profilePicture} width={30}  alt="profile figure" style={{float:'left'}}/> */}
                  <h6 style={{ marginLeft: 50 }}> {eachQuery.name} </h6>
                  <p style={{ marginLeft: 50 }}> {eachQuery.desc} </p>
                  <hr />
                </div>
              ))}
            </Box>
          </Modal>
        )}
        {viewCommentQuery && (
          <Modal open={viewCommentQuery} onClose={toggleViewCommentQuery}>
            <Box sx={style2}>
              <CloseIcon onClick={toggleViewCommentQuery} style={{ float: 'right' }} />
              <h4>Add Comment</h4>
              <br />
              <TextField
                label="Description"
                multiline
                maxRows={5}
                value={commentDescription}
                onChange={e => setCommentDescription(e.target.value)}
                variant="filled"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ float: 'right' }}
                onClick={() => { submitComment() }}
              >
                SUBMIT
              </Button>
            </Box>
          </Modal>
        )} 
      </div>
      <div style={{ top: 100, marginLeft:900, width:400,position:'fixed' }}>
          <h4 style={{marginBottom:20}}>Create a post</h4>
          <h5 style={{marginBottom:20}}>
            Enter a name
          </h5>
          <TextField
            label="Topic"
            variant="filled"
            fullWidth
            style={{marginBottom:20}}
            value={newQueryName}
            onChange={e => setNewQueryName(e.target.value)}
          />
          <br/>
          <h5 style={{marginBottom:20}}>
            Enter a description
          </h5>
          <TextField
            label="Description"
            multiline
            maxRows={5}
            variant="filled"
            fullWidth
            style={{marginBottom:20}}
            value={newQueryDesc}
            onChange={e => setNewQueryDesc(e.target.value)}
          />
          <br/>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ float: 'right' }}
            onClick={() => { submitQuery() }}
          >
            SUBMIT
          </Button>
        </div>
    </div>
  );
}