import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';

import './sidebar.styles.scss';

import { auth } from '../../firebase/firebase.utils';

import TwitterIcon from '../../assets/twitter.png';
import { Person, Globe } from 'react-bootstrap-icons';

import CurrentUserContext from '../../context/current-user/current-user.context';


const Sidebar = () => {
  const currentUser = useContext(CurrentUserContext);
  const [hidden, setHidden] = useState({hidden: true});

  return(
    <nav className="sidebar">
      <Link to="/">
        <img src={TwitterIcon} alt="Go home"/>
      </Link>
      <Link to="/all-users">
        <Globe className="globe-icon" size={40} color="#1da1f2" />
      </Link>
      <div className="sign-in-sign-up" onClick={() => setHidden(!hidden)}>
        <Person size={40} color="#1da1f2" />
          {
            !hidden ? (
              <div className="sub-menu">
                {
                  currentUser ? (
                    <div>
                      <div className="option" onClick={() => auth.signOut()}>
                        SIGN OUT
                      </div>
                      <Link to={`/user/${currentUser.id}`}>
                        Profile
                      </Link>
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