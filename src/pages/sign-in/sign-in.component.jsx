import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Form from 'react-bootstrap/Form';

import WhiteButton from '../../components/white-button/white-button.component';

import {createUserWithEmailAndPasswordHandler, signInWithEmailAndPasswordHandler} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = (event) => {
    const { value, name } = event.target;

    if(name === 'email') {
      setEmail( value );
    } else if (name === 'password') {
      setPassword( value );
    }
  }

  const onSignUpHandler = (event) => {
    event.preventDefault();

    createUserWithEmailAndPasswordHandler(email, password);

    setEmail({email: ''});
    setPassword({password: ''});
    document.querySelector('form').reset();
  }

  const onSignInHandler = (event) => {
    event.preventDefault();

    signInWithEmailAndPasswordHandler(email, password);

    setEmail({email: ''});
    setPassword({password: ''});
    document.querySelector('form').reset();
    history.push('/');
  }

  return(
    <Container className="sign-in">
      <Row>
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