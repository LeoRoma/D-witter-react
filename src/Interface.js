import React, { Component } from 'react';
import Posts from './components/Posts';
import PostPeep from './components/PostPeep'
import SignUp from './components/Signup';
import axios from 'axios';

class Interface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      handle: '',
      password: '',
      user_id: '',
      session_key: '',
      isLoaded: false,
    }
  }

  // get peeps
  componentDidMount() {
    axios.get('https://chitter-backend-api.herokuapp.com/peeps')
      .then((res) => this.setState({ posts: res.data }))
      .catch(err => console.log(err))
  }

  // Sign Up
  signUp = (newUser) => {
    axios.post('https://chitter-backend-api.herokuapp.com/users', {
      user: {
        handle: newUser.handle,
        password: newUser.password
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  // Login
  login = (currentUser) => {
    axios.post('https://chitter-backend-api.herokuapp.com/sessions/', {
      session: {
        handle: currentUser.handle,
        password: currentUser.password
      }
    })
      .then(res => this.setState({
        user_id: res.data.user_id,
        session_key: res.data.session_key
      }))
      .catch(err => console.log(err));
    console.log(this.state.user_id, this.state.session_key)
  }

  // Post peep 
  sendPeep = (peep) => {
    console.log(peep)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token token=' + this.state.session_key
    }
    axios.post('https://chitter-backend-api.herokuapp.com/peeps', {
      peep: {
        user_id: this.state.user_id,
        body: peep.peep
      }
    }, {
      headers: headers
    }).then((res) => this.componentDidMount())
  }

  render() {
    return (
      <div>
        {/* Signup and Login  */}
        <SignUp
          signUp={this.signUp.bind(this)}
          login={this.login.bind(this)}
        />

        {/* Send a new peep  */}
        <PostPeep 
        sendPeep={this.sendPeep.bind(this)}/>

        {/* get peeps  */}
        <Posts posts={this.state.posts} />
      </div>
    )
  }
}
export default Interface;