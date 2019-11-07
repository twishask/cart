import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './Login.css';
import Signupform from './Signupform.js';
import { withRouter } from 'react-router';

class Loginform extends Component {

  constructor (props) {
  super(props);
  this.handleUsername = this.handleUsername.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  this.state = {
    username: '',
    password: '',
    signup: false
    }
  }

  handleUsername(e) {
    var username = e.target.value;
    this.setState({
      username,
    });
  }

  handlePassword(e) {
    var password = e.target.value;
    this.setState({
      password,
    });
  }

  loginUser = e => {
    console.log(this.state.username)
    console.log(this.state.password);
    fetch('http://localhost:5000/userinfo/'+this.state.username, {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       username: this.state.username,
       password: this.state.password,
      })
    }).then((response) =>{
        return response.text()
      .then((textResponse) =>{
        if (textResponse!='No such user' && textResponse!='Password incorrect') {
          console.log('Logged in')
          this.props.history.push({
            pathname: '/user/'+textResponse,
          })
        }
        else {
          console.log(textResponse);
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
       <div className="form-group">
         <label htmlFor="username">Username</label>
         <input type="username" className="form-control" name="username" onChange={this.handleUsername} />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input type="password" className="form-control" name="password" onChange={this.handlePassword} />
       </div>
       <br></br>
       <button type="submit" onClick={this.loginUser}>Login</button>
    </div>
    );
  }
}

export default withRouter(Loginform);
