import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Sidebar from './components/sidebar/sidebar.component';
import Homepage from './pages/homepage/homepage.component';
import AllUsers from './pages/all-users/all-users.component';
import SignIn from './pages/sign-in/sign-in.component';
import UserProfile from './pages/user-profile/user-profile.component';

import { auth, generateUserDocument } from './firebase/firebase.utils';

import CurrentUserContext from './context/current-user/current-user.context';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      isLoggedIn: false
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await generateUserDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: userAuth.uid,
              ...snapShot.data()
            },
            isLoggedIn: true,
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.setState({isLoggedIn: false});
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div>
          <Router>
            <Container>
              <Sidebar />
              <Switch>
                <Route exact path="/">
                  {
                    this.state.isLoggedIn ? (
                      <Homepage />
                    ) : (
                      <SignIn />
                    )
                  }
                </Route>
                <Route exact path="/sign-in">
                  <SignIn />
                </Route>
                <Route exact path="/all-users">
                  <AllUsers />
                </Route>
                <Route exact path="/user/:id">
                  <UserProfile />
                </Route>
              </Switch>
            </Container>
          </Router>
        </div>
      </CurrentUserContext.Provider>
    )
  }
}

export default App;
