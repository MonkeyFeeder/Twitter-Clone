import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';

import './tweet.styles.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CurrentUserContext from '../../context/current-user/current-user.context';

import { Person, ThreeDots } from 'react-bootstrap-icons';
// import ChatIcon from '../../assets/chat.png';
// import RetweetIcon from '../../assets/retweet.png';
// import HeartIcon from '../../assets/heart.png';

const Tweet = ( tweet, userId ) => {
  const currentUser = useContext(CurrentUserContext);
  const { text, tweetedAt, authorDisplayName, author } = tweet;
  const [hidden, setHidden] = useState(true);




  // All the date processing
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
        <Person size={60} color="#1da1f2"/>
      </Col>
      <Col sm={10} className="tweet--main">
        <div className="tweet-info">
          <div className="tweet-name">
            <Link to={`user/${author}`}>
              <p className="author">{authorDisplayName}</p>
            </Link>
            <p className="at-author">@{authorDisplayName} - {displayedDate}</p>
          </div>
          <div className="tweet-menu">
            <ThreeDots size={30} color="#1da1f2" onClick={() => setHidden(!hidden)} />
            {
              !hidden ? (
                <div className="tweet-options">
                  {
                    author === currentUser.id ? (
                      <p>Delete tweet</p>
                    ) : null
                  }
                  <p><Link to={`user/${author}`}>Go to user profile</Link></p>
                </div>
              ) : null
            }
          </div>          
        </div>
        <div className="tweet-content">
          <p>{text}</p>
        </div>
        <div className="like-rt">
          {/* <img src={ChatIcon} alt="Comment"/> */}
          {/* <img src={RetweetIcon} alt="Retweet"/> */}
          {/* <img src={HeartIcon} alt="Like"/> */}
        </div>
      </Col>
    </Row>
  )
}

export default Tweet;