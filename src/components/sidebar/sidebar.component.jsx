import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './sidebar.styles.scss';

import { auth } from '../../firebase/firebase.utils';

import HomeIcon from '../../assets/home.png';
import TwitterIcon from '../../assets/twitter.png';
import UserIcon from '../../assets/user.png';


const signInStyle = {
  backgroundImage: `url('${UserIcon}')`,
  backgroundSize: 'cover',
  width: 40,
  height: 40,
};

const Sidebar = ({ currentUser }) => {
  const [hidden, setHidden] = useState({hidden: true});

  return(
    <nav className="sidebar">
      <Link to="/">
        <img src={TwitterIcon} alt="Go home"/>
      </Link>
      <Link to="/">
        <img src={HomeIcon} alt="Go to the newsfeed"/>
      </Link>
      <div className="sign-in-sign-up" style={signInStyle} onClick={() => setHidden(!hidden)}>
        {
          !hidden ? (
            <div className="sub-menu">
              {
                currentUser ? (
                  <div className="option" onClick={() => auth.signOut()}>
                    SIGN OUT
                  </div>
                ) : (
                  <Link className="option" to="/sign-in">
                    SIGN IN
                  </Link>
                )
              }
            </div>
          ) : (
            null
          )
        }
        
      </div>
    </nav>
  );
}

export default Sidebar;