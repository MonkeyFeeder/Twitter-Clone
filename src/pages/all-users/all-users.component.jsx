import React, {useEffect, useState} from 'react';

import './all-users.styles.scss';

import ItemUser from '../../components/item-user/item-user.component';
import TitleBar from '../../components/title-bar/title-bar.component';

import {listAllUsers} from '../../firebase/firebase.utils';

const AllUsers = () => {  
  const [users, setUsers] = useState([]);

  const listUsers = async () => {
    const allUsersUnformat = await listAllUsers();
    if(allUsersUnformat.docs) {
      allUsersUnformat.docs.forEach(doc => {
        setUsers(oldUsers => [
          ...oldUsers,
          {
            data: doc.data(),
            id: doc.id
          }
        ])
      })
    }
  }

  useEffect(() => {
    listUsers();
  }, [setUsers])

  return(
    <div className="user-list">
      <TitleBar title="All users" />
      {
        users ? (
          users.map((user) => (
              <ItemUser key={user.id} id={user.id} userData={user.data} />
            )
          )
        ) : null
      }
    </div>
  )
}

export default AllUsers;