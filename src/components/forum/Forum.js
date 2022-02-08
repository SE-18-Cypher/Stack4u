import React from 'react';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

import './Forum.css';
import app from './../../Firebase-config';
import { getFirestore } from "@firebase/firestore";
import { addDoc, collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";

import img from './../../resources/images/logo.jpg';


export default function Forum() {

  const database = getFirestore(app);

  const [view, setView] = React.useState(false);
  const toggleView = () => setView((view) => !view);
  const [docClicked, setDocClicked] = React.useState('w1zHChbBOTW1rWYfazos');

  const [allForumQueries, setAllForumQueries] = React.useState([]);
  const ref = collection(database, "Forum");
  React.useEffect(() => {
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

  const [eachQueryComments, setEachQueryComments] = React.useState([]);
  const [clickedQuery, setClickedQuery] = React.useState([]);
  const expandView = async () => {
    const docRef = doc(database, "Forum", docClicked);
    const docSnap = await getDoc(docRef);
    setClickedQuery(docSnap.data());

    const subRef = collection(database, "Forum/" + docClicked + "/comment");
    const q = query(subRef);
    onSnapshot(q, (querySnapshot) => {
      const allQueryArray = [];
      querySnapshot.forEach((doc) => {
        allQueryArray.push(doc.data());
      });
      setEachQueryComments({ allQueryArray });
    });
  };

  function openDocument(id) {
    setDocClicked(id);
    expandView();
    toggleView();
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
      <div className="commonBg"/>
      <div style={{ position: 'relative' }}>
        <h1 style={{ textAlign: 'center' }}>Forum</h1>
        {allForumQueries.forumData && allForumQueries.forumData.map((eachContent, index) =>
        (
          <div className="eachQuery" key={index}>
            <Paper elevation={1} onClick={() => openDocument(eachContent.id)}>
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
        <Modal open={view} onClose={toggleView}>
          <Box sx={style}>
            {/* <img src={docClicked.profilePicture} width={40}  alt="profile figure" style={{float:'left'}}/> */}
            <h3 style={{ marginLeft: 50 }}> {clickedQuery.topicname} </h3>
            <br />
            <p> {clickedQuery.topicdesc} </p>
            <hr />
            {eachQueryComments.allQueryArray && eachQueryComments.allQueryArray.map((eachQuery, index) =>
            (
              <div key={index}>
                {/* <img src={eachComment.profilePicture} width={30}  alt="profile figure" style={{float:'left'}}/> */}
                <h6 style={{ marginLeft: 50 }}> {eachQuery.name} </h6>
                <p style={{ marginLeft: 50 }}> {eachQuery.desc} </p>
              </div>
            ))}
          </Box>
        </Modal>
      </div>
    </div>
  );
}