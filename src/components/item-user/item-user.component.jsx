import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import './item-user.styles.scss';

import WhiteButton from '../white-button/white-button.component';

import { Person } from 'react-bootstrap-icons';

import CurrentUserContext from '../../context/current-user/current-user.context';
import { followUser, unfollowUser, doesUserFollow } from '../../firebase/firebase.utils';

const ItemUser = ({ id, userData }) => {
  const CurrentUser = useContext(CurrentUserContext);
  const [follows, setFollows] = useState('');
  const [followed, setFollowed] = useState(false);
  
  const checkIfFollows = async (id, CurrentUser) => {
    if(id && CurrentUser) {  
      const matchingUser = await doesUserFollow(CurrentUser.id, id);

      if(matchingUser) {
        setFollows(matchingUser);
      } else {
        return;
      }
    }
  }

  const redirectToFollow = async (currentUser, id) => {
    if(follows) {
      const result = await unfollowUser(CurrentUser.id, id);
      setFollowed(result);
      setFollows('');
    } else {
      const result = await followUser(CurrentUser.id, id);
      setFollowed(result);
    }
  }

  useEffect(() => {
    checkIfFollows(id, CurrentUser);
  });

  return(
    <div className="user-item" id={id}>
      <div className="user-image">
        <Person size={50} color="#1da1f2" />
      </div>
      <div className="user-info">
        <h3><Link to={`user/${id}`}>{userData.displayName}</Link> <br /> <span className="user-email">{userData.email}</span></h3>
        <WhiteButton 
          onClick={() => redirectToFollow(CurrentUser.id, id)}
          className={`white-button ${follows ? 'followed' : ''}`}
          >
          {
            follows ? 'unfollow' : 'follow'
          }
        </WhiteButton>
      </div>
    </div>
  )
}

export default ItemUser;