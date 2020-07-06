import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Form from 'react-bootstrap/Form';

import WhiteButton from '../../components/white-button/white-button.component';

import {auth, generateUserDocument} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
  const history = useHistory();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = (event) => {
    const { value, name } = event.target;

    if(name === 'email') {
      setEmail( value );
    } else if (name === 'password') {
      setPassword( value );
    } else if (name === 'display') {
      setDisplayName( value );
    }
  }

  const onSignUpHandler = async event => {
    event.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email, 
        password
      );

      await generateUserDocument(user, { displayName });

    } catch (error) {
      console.log(error);
    }

    setDisplayName({displayName: ''});
    setEmail({email: ''});
    setPassword({password: ''});
    document.querySelector('form').reset();
  }

  const onSignInHandler = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail({email: ''});
      setPassword({password: ''});
      document.querySelector('form').reset();

      history.push('/');
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <Container className="sign-in">
      <Row>
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" name="display" placeholder="Enter displayed name" onChange={(event) => onChangeHandler(event)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={(event) => onChangeHandler(event)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={(event) => onChangeHandler(event)} />
            </Form.Group>
            <WhiteButton type="submit" onClick={(event) => onSignUpHandler(event)}>
              Sign up
            </WhiteButton>
          </Form>
        </Col>
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={(event) => onChangeHandler(event)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={(event) => onChangeHandler(event)} />
            </Form.Group>
            <WhiteButton type="submit" onClick={(event) => onSignInHandler(event)}>
              Sign in
            </WhiteButton>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignIn;