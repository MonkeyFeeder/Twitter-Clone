import React from 'react';

import './tweet-bar.styles.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import TitleBar from '../title-bar/title-bar.component';
import WhiteButton from '../white-button/white-button.component';

// import StarIcon from '../../assets/star.png';
// import ImageIcon from '../../assets/image.png';
import UserIcon from '../../assets/user.png';

const TweetBar = () => {
  return (
    <div className="tweet-bar">
      <TitleBar title="Home" />
      <Row className="image-and-input">
          <Col sm={2} className="image">
            <img src={UserIcon} alt="That's me"/>
          </Col>
          <Col sm={10}>
            <InputGroup>
              <FormControl as="textarea" className="input" maxLength={140} placeholder="What's happening ?" />
            </InputGroup>
            <WhiteButton type="submit">Tweet</WhiteButton>
          </Col>
      </Row>
    </div>
  );
}

export default TweetBar;