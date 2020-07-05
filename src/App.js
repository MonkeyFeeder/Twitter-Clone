import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Sidebar from './components/sidebar/sidebar.component';
import Homepage from './pages/homepage/homepage.component';
import SignIn from './pages/sign-in/sign-in.component';

import { auth, generateUserDocument } from './firebase/firebase.utils';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await generateUserDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({currentUser: {

            ...snapShot.data()
          }});
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Container>
            <Sidebar currentUser={this.state.currentUser} />
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
            </Switch>
          </Container>
        </Router>
      </div>
    )
  }
}

export default App;
