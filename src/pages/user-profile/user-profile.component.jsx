import React, {useState, useEffect} from 'react';
import {
  useParams
} from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tweet from '../../components/tweet/tweet.component';

import './user-profile.styles.scss';
import { getUserProfile, getTweetsByUser } from '../../firebase/firebase.utils';

const UserProfile = () => {
  let {id} = useParams();

  const [userProfile, setUserProfile] = useState({});
  const [userTweets, setUserTweets] = useState([]);

  const loadUserProfile = async (id) => {
    const dataProfile = await getUserProfile(id);
    const unformatTweets = await getTweetsByUser(id);
    
    console.log(unformatTweets);

    setUserProfile(dataProfile);
    if(unformatTweets.docs) {
      unformatTweets.docs.map(unformatTweet => {
        const tweetText = unformatTweet.data();
        setUserTweets(prevTweets => [
          ...prevTweets, 
          tweetText
        ])
      })
    } else {

    }

  }

  useEffect(() => {
    loadUserProfile(id);
  }, [id]);

  return(
    <Row className="user-profile">
      <Col xs={12} md={4} className="profile-info-col">
        <div className="profile-info">
          <h2>{userProfile.displayName ? userProfile.displayName : null}</h2>
          <p>{userProfile.email ? userProfile.email : null}</p>
          <p>{userProfile.bio ? userProfile.bio : null}</p>
        </div>
      </Col>
      <Col xs={12} md={8}>
        <div className="container profile-tweets">
          {
            userTweets.length !== 0 ? (
              userTweets.map(tweet => (
                <Tweet {...tweet} />
              ))
            ) : (
              <div className="no-tweets">
                <p>It seems like this user hasn't tweeted yet...</p>
              </div>
            )
          }
        </div>
      </Col>
    </Row>
  )
}

export default UserProfile;