import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

import './Signup.css'

import axios from 'axios';

import { Redirect } from 'react-router-dom';






class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      password: '',
      redirect: false
    }
  };

  handleHandleChange = event => {
    this.setState({
      handle: event.target.value
    })
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  // signup 
  handleSignup = event => {
    event.preventDefault();
    axios.post('https://chitter-backend-api.herokuapp.com/users', {
      user: {
        handle: this.state.handle,
        password: this.state.password
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setRedirect()
  };

  // Login
  handleLogin = event => {
    event.preventDefault();
    axios.post('https://chitter-backend-api.herokuapp.com/sessions/', {
      session: {
        handle: this.state.handle,
        password: this.state.password
      }
    })
      .then(res => {
        sessionStorage.setItem('user_id', res.data.user_id)
        sessionStorage.setItem('session_key', res.data.session_key)
        this.setRedirect()
      })
      .catch(err => console.log(err));
  };

  //Redirect after Login to chitter

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/d-witter' />
    }
  };

  render() {
    return (
      <div className="background-signup">
        <div className="center">
          <form>
            {this.renderRedirect()}
            {/* Username */}
            <TextField
              variant="outlined"
              required
              // fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              onChange={this.handleHandleChange}
            /><br />

            {/* password  */}
            <TextField
              variant="outlined"
              required
              // fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handlePasswordChange}
            /><br />

            {/* signup button  */}
            <Button onClick={this.handleSignup.bind(this)}
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign Up
           </Button><br />

            {/* login button  */}
            <Button onClick={this.handleLogin.bind(this)}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
          </Button>
          </form>
        </div>
      </div>

    );
  }
}



export default SignUp;