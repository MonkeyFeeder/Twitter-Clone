import React from 'react';

import './tweet.styles.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UserIcon from '../../assets/user.png';
import MoreIcon from '../../assets/more.png';
import ChatIcon from '../../assets/chat.png';
import RetweetIcon from '../../assets/retweet.png';
import HeartIcon from '../../assets/heart.png';

const Tweet = () => {
  return(
    <Row className="tweet">
      <Col sm={2} className="image">
        <img src={UserIcon} alt="Itsa me Mario" />
      </Col>
      <Col sm={10} className="tweet--main">
        <div className="tweet-info">
          <p className="author">Dan James</p>
          <p className="at-author">@DanJamesJS - 12m</p>
          <img src={MoreIcon} alt="More for this tweet" />
        </div>
        <div className="tweet-content">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, possimus quisquam! Minima aliquid blanditiis pariatur nesciunt magni provident at. Rem reiciendis natus, velit optio vel nulla tenetur quo voluptate aspernatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique minima harum laudantium doloribus odit, repudiandae tempora hic officia delectus aut.</p>
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