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
import { addDoc, collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";

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
  const [commentCount, setCommentCount] = React.useState();
  React.useEffect(() => {}, [commentCount]);

  function checkComment() {          //commenting in a query 
    if (commentDescription === "") {        //checking if the comment is valid 
      alert("Please enter a comment");    //alerting user to enter a comment 
    }
    else {
      submitComment();                  //updating the database with new comment 
      setCommentDescription('');        //resetting the values after submitting the comment 
    }
  }

  const submitComment = async () => {
    const subRef = collection(database, "Forum/" + docClicked + "/comment");    //documnet reference to add the comment 
    await addDoc(subRef, {
      name: commentAuthName, // name: authName
      desc: commentDescription
    });
    toggleViewCommentQuery();   //closing the add comment view modal 
    updateComment(docClicked,commentCount);
  };

  const updateComment = async (id, com) => {
    const docs = doc(database, "Forum", id);
    const re = { com: com + 1 };
    await updateDoc(docs, re);
  };

  const [newQueryName, setNewQueryName] = React.useState("");     //the new query name 
  const [newQueryDesc, setNewQueryDesc] = React.useState("");     //the new query description 

  function checkQuery() {
    if (newQueryName === "") {        //checking valid query 
      alert("Please enter a topic name");
    }
    else if (newQueryDesc === "") {    //check valid query description 
      alert("Please enter a description");
    }
    else {
      submitQuery();        //updating the database with the new query 
      setNewQueryDesc('');  //reseting values 
      setNewQueryName('');  //reseting values 
    }
  }
  const submitQuery = async () => {
    await addDoc(ref, {
      topicname: newQueryName,
      topicdesc: newQueryDesc
    });
  };

  function addComment() {
    toggleViewCommentQuery();   //switch the view to add comment 
  }

  
  
  const updateLike = async (id, likes, userLiked) => {
    const docs = doc(database, "Forum", id);
    if (!userLiked) {
      const re = { likes: likes + 1 , currentuserliked: true };
      await updateDoc(docs, re);
    } else if (userLiked) {
      const re = { likes: likes - 1 , currentuserliked: false };
      await updateDoc(docs, re);
    }
  };

  const style = {       //style setting for query comments modal
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'scroll',
    height: 500,
    p: 4,
  };

  const style2 = {    //style setting for add comment for query modal 
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
      <div className="commonOppBg" />
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
              <h3 style={{ marginLeft: 50, wordWrap: 'break-word' }} > {eachContent.topicname} </h3>
              <br />
              <p style={{ wordWrap: 'break-word' }}> {eachContent.topicdesc} </p>
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
              <h3 style={{ marginLeft: 50, wordWrap: 'break-word' }}> {clickedQuery.topicname} </h3>
              <br />
              <p style={{ wordWrap: 'break-word' }}> {clickedQuery.topicdesc} </p>
              <div>
                <Button
                  onClick={() => {
                    updateLike(docClicked, clickedQuery.likes, clickedQuery.currentuserliked);
                  }}
                >
                  {clickedQuery.currentuserliked ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                  {clickedQuery.likes}
                </Button>
                <Button 
                  onClick={() => {
                    addComment();
                    setCommentCount(clickedQuery.com);
                  }}
                > <CommentIcon /> {clickedQuery.com} </Button>
              </div>
              {eachQueryComments.allQueryArray && eachQueryComments.allQueryArray.map((eachQuery, index) =>
              (
                <div key={index}>
                  {/* <img src={eachComment.profilePicture} width={30}  alt="profile figure" style={{float:'left'}}/> */}
                  <h6 style={{ marginLeft: 50, wordWrap: 'break-word' }}> {eachQuery.name} </h6>
                  <p style={{ marginLeft: 50, wordWrap: 'break-word' }}> {eachQuery.desc} </p>
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
                onClick={() => { checkComment() }}
              >
                SUBMIT
              </Button>
            </Box>
          </Modal>
        )}
      </div>
      <div className='createPost'>
        <h4 style={{ marginBottom: 20 }}>Create a post</h4>
        <h5 style={{ marginBottom: 20 }}>
          Enter a name
        </h5>
        <TextField
          label="Topic"
          variant="filled"
          fullWidth
          style={{ marginBottom: 20 }}
          value={newQueryName}
          onChange={e => setNewQueryName(e.target.value)}
        />
        <br />
        <h5 style={{ marginBottom: 20 }}>
          Enter a description
        </h5>
        <TextField
          label="Description"
          multiline
          maxRows={5}
          variant="filled"
          fullWidth
          style={{ marginBottom: 20 }}
          value={newQueryDesc}
          onChange={e => setNewQueryDesc(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ float: 'right' }}
          onClick={() => {
            checkQuery();
          }}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}