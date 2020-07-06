import React, {useState, useContext} from 'react';

import './tweet-bar.styles.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import TitleBar from '../title-bar/title-bar.component';
import WhiteButton from '../white-button/white-button.component';

import { sendTweet } from '../../firebase/firebase.utils.js';

import CurrentUserContext from '../../context/current-user/current-user.context';

// import StarIcon from '../../assets/star.png';
// import ImageIcon from '../../assets/image.png';
import UserIcon from '../../assets/user.png';

const TweetBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const [tweet, setTweet] = useState({tweet: ''});

  const sendTweetHandle = async ({tweet}) => {
    await sendTweet(tweet, currentUser.id, currentUser.displayName);
    document.querySelector('textarea').value = "";
  }

  return (
    <div className="tweet-bar">
      <TitleBar title="Home" />
      <Row className="image-and-input">
          <Col sm={2} className="image">
            <img src={UserIcon} alt="That's me"/>
          </Col>
          <Col sm={10}>
            <InputGroup>
              <FormControl as="textarea" className="input" maxLength={140} placeholder="What's happening ?" onChange={(event) => setTweet({tweet: event.target.value})} />
            </InputGroup>
            <WhiteButton type="submit" onClick={() => sendTweetHandle(tweet)}>Tweet</WhiteButton>
          </Col>
      </Row>
    </div>
  );
}

export default TweetBar;