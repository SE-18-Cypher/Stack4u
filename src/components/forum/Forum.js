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
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from './../navBar/NavBar';

import './Forum.css';
import app from './../../Firebase-config';
import { getFirestore } from "@firebase/firestore";
import { addDoc, collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router';

export default function Forum() {
  //getting the user id value from the session storage 
  const user = sessionStorage.getItem("user");
  //navigate hook
  const navigate = useNavigate();
  //if the id value is null redirectss to the error page 
  React.useEffect(() => {
    if (user === null) {
      navigate('/access_error')
    }
  })

  //database from fiirestore 
  const database = getFirestore(app);

  const docRef = doc(database, "Users", user);
  const getUserDetails = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCommentAuthName(docSnap.data().firstName);
      setCommentAuthName(() => docSnap.data().firstName);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  React.useEffect(() => {
    getUserDetails()
  }, [user])

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
  }, []);

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
    getUserDetails()
  };

  const [viewCommentQuery, setViewCommentQuery] = React.useState(false);                                //hook to add comment in a query
  const toggleViewCommentQuery = () => setViewCommentQuery((viewCommentQuery) => !viewCommentQuery);    //switch the view 

  const [commentAuthName, setCommentAuthName] = React.useState("");
  const [commentDescription, setCommentDescription] = React.useState("");
  const [commentCount, setCommentCount] = React.useState();
  React.useEffect(() => { }, [commentCount]);

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
    updateComment(docClicked, commentCount);
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
      topicdesc: newQueryDesc,
      likes: 0,
      com: 0
    });
  };

  function addComment() {
    toggleViewCommentQuery();   //switch the view to add comment 
  }

  // const [loadingView, setLoadingView] = React.useState(false);
  // const [allLikesInQuery, setAllLikesInQuery] = React.useState("");

  function content() {
    getContent();
  }

  const getContent = async () => {
    const subRef = doc(database, "Forum/w1zHChbBOTW1rWYfazos/like/QfjWhTpj3Cap9vzmH5qq");
    const docS = await getDoc(subRef);
    console.log(docS.data());
  }

  const updateLike = async (id, likes, userLiked) => {
    const docs = doc(database, "Forum", id);
    if (!userLiked) {
      const re = { likes: likes + 1, currentuserliked: true };
      await updateDoc(docs, re);
    } else if (userLiked) {
      const re = { likes: likes - 1, currentuserliked: false };
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
    // border: '2px solid #000',
    // boxShadow: 24 ,
    overflow: 'scroll',
    height: 500,
    p: 4,
  };

  const style2 = {    //style setting for add comment for query modal 
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,

  };

  return (

    <div>
      <div>
        <NavBar uidValue={user} />
        <div className="commonOppBg" />
        <div style={{ position: 'relative' }}>
          <h1 style={{ textAlign: 'center', paddingTop: '2%', fontSize: '30px', }}>FORUM </h1>
          <div className='allForumContent'>
            {allForumQueries.forumData && allForumQueries.forumData.map((eachContent, index) =>
            (
              <div className="eachQuery" key={index}>
                <Paper elevation={1}
                  onClick={() => {
                    setDocClicked(eachContent.id);
                    expandView(eachContent.id);
                    content(eachContent);
                    toggleView();
                  }}
                >
                  {/* <img src={eachContent.profilePicture} width={40} alt="profile figure" style={{float:'left'}}/> */}
                  <h5 style={{ marginLeft: '2.5%', paddingTop: '1.7%', wordWrap: 'break-word' }} > {eachContent.topicname} </h5>
                  <br />
                  <p style={{ wordWrap: 'break-word', marginLeft: '2.5%', marginTop: '-1.7%' }}> {eachContent.topicdesc} </p>
                  <div className='button2'>
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
          </div>
          {!viewCommentQuery && (
            <Modal open={view} onClose={toggleView}>
              <Box sx={style}>
                <CloseIcon onClick={toggleView} style={{ float: 'right' }} />
                {/* <img src={docClicked.profilePicture} width={40}  alt="profile figure" style={{float:'left'}}/> */}
                <h4 style={{ wordWrap: 'break-word' }}> {clickedQuery.topicname} </h4>
                <p style={{ wordWrap: 'break-word' }}> {clickedQuery.topicdesc} </p>
                <div className='buttonsinside'>
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
                    <br />
                  </Button>
                  <Button
                    onClick={() => {
                      addComment();
                      setCommentCount(clickedQuery.com);
                    }}
                  > <CommentIcon /> {clickedQuery.com} </Button>
                </div>
                <br />
                {eachQueryComments.allQueryArray && eachQueryComments.allQueryArray.map((eachQuery, index) =>
                (
                  <div key={index}>
                    {/* <img src={eachComment.profilePicture} width={30}  alt="profile figure" style={{float:'left'}}/> */}
                    <h6 style={{ wordWrap: 'break-word' }}> {eachQuery.name} </h6>
                    <p style={{ wordWrap: 'break-word' }}> {eachQuery.desc} </p>
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
          <h4 style={{ marginBottom: '3%', marginTop:'30%' }}>Create a post</h4>
          <h5 style={{ marginBottom: '3%', color:'white' }}>
            Enter a Topic

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

          <h5 style={{ marginBottom: 20, color:'white' }}>
            Enter a Description

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
      {/* <div className='loadingCircle'>
        {loadingView && (
          <CircularProgress />
        )}
      </div> */}
    </div>
  );
}