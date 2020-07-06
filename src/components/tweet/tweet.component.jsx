import React from 'react';

import './tweet.styles.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



import UserIcon from '../../assets/user.png';
import MoreIcon from '../../assets/more.png';
import ChatIcon from '../../assets/chat.png';
import RetweetIcon from '../../assets/retweet.png';
import HeartIcon from '../../assets/heart.png';

const Tweet = ( tweet ) => {
  const { text, tweetedAt, authorDisplayName } = tweet;
  const currentDate = new Date().getTime() / 1000;
  const differenceTime = currentDate - tweetedAt.seconds
  let displayedDate = '';
  if(differenceTime < 60) {
    const seconds = Math.round(differenceTime);
    displayedDate = `${seconds}s ago`;
  } else if (differenceTime > 60 && differenceTime < 3600) {
    const minutes = Math.round(differenceTime / 60);
    displayedDate = `${minutes}min ago`;
  } else if (differenceTime > 3600 && differenceTime < 86400) {
    const hours = Math.round(differenceTime / 3600);
    displayedDate = `${hours}h ago`;
  } else {
    const days = Math.round(differenceTime / 86400);
    displayedDate = `${days}d ago`;
  }
  return(
    <Row className="tweet">
      <Col sm={2} className="image">
        <img src={UserIcon} alt="Itsa me Mario" />
      </Col>
      <Col sm={10} className="tweet--main">
        <div className="tweet-info">
          <p className="author">{authorDisplayName}</p>
          <p className="at-author">@{authorDisplayName} - {displayedDate}</p>
          <img src={MoreIcon} alt="More for this tweet" />
        </div>
        <div className="tweet-content">
          <p>{text}</p>
        </div>
        <div className="like-rt">
          <img src={ChatIcon} alt="Comment"/>
          <img src={RetweetIcon} alt="Retweet"/>
          <img src={HeartIcon} alt="Like"/>
        </div>
      </Col>
    </Row>
  )
}

export default Tweet