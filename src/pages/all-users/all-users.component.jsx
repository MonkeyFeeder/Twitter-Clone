import React from 'react';

import './all-users.styles.scss';

import ItemUser from '../../components/item-user/item-user.component';

import {listAllUsers} from '../../firebase/firebase.utils';
import CurrentUserContext from '../../context/current-user/current-user.context';

class AllUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
    }
  }

  
  async componentDidMount() {
    const users = await listAllUsers();
    this.setState({users: users.docs});

    // const followedUsers = getFollowedUsers(currentUser.id);
  }

  render() {
    return(
      <div className="user-list">
        {
          this.state.users ? (
            this.state.users.map((user, index) => (
                <ItemUser key={index} id={user.id} userData={user.data()} />
              )
            )
          ) : null
        }
      </div>
    )
  }
}

AllUsers.contextType = CurrentUserContext;

export default AllUsers;