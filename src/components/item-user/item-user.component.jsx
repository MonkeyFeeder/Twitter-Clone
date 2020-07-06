import React, {useContext} from 'react';

import './item-user.styles.scss';

import WhiteButton from '../white-button/white-button.component';

import UserIcon from '../../assets/user.png';

import CurrentUserContext from '../../context/current-user/current-user.context';
import { followUser } from '../../firebase/firebase.utils';

const ItemUser = ({ id, userData }) => {
  const CurrentUser = useContext(CurrentUserContext);
  return(
    <div className="user-item" id={id}>
      <div className="user-image">
        <img src={UserIcon} alt="User profile" />
      </div>
      <div className="user-info">
        <h3>{userData.displayName} - {userData.email}</h3>
        <WhiteButton onClick={() => followUser(CurrentUser.id, id)} >
          Follow
        </WhiteButton>
      </div>
    </div>
  )
}

export default ItemUser;