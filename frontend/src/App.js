import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import './App.css';
import Loginform from './Loginform.js';
import Signupform from './Signupform.js';
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';
import { withRouter } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props)
    this.updatePopupbox = this.updatePopupbox.bind(this);
    this.openPopupbox = this.openPopupbox.bind(this);
    this.adminLogin = this.adminLogin.bind(this);
    this.state = {
      items: [],
      name: '',
      description: '',
      price: '',
    }
  }
  componentDidMount() {
    fetch('http://localhost:5000/items')
    .then((result) => {
      return result.json()
    .then((jsonResult) => {
      this.setState ({
        items: jsonResult,
      })
    })
    })
  }

  updatePopupbox() {
      const content = (
        <div>
          <Signupform />
          <button className="App-button" onClick={PopupboxManager.close}>Close</button>
        </div>
      );

      PopupboxManager.update({
        content,
        config: {
          titleBar: {
            text: 'Sign Up'
          }
        }
      })
    };

  openPopupbox() {
        const content = (
          <div>
            <Loginform />
            <br></br>
            <button className="App-button" onClick={this.updatePopupbox}>New User? Create an account</button>
          </div>
        )
        PopupboxManager.open({
        content,
        config: {
          titleBar: {
            enable: true,
            text: 'Login'
          },
          fadeIn: true,
          fadeInSpeed: 500
        }
      })
    };

    adminLogin() {
      console.log('admin login');
      this.props.history.push({
        pathname: '/admin',
      })
    }

  render() {
    return (
      <div className="App">
      <header className="App-header">
      <input type="button" className="App-button" onClick={this.openPopupbox} value ="Login/Register" />
      <input type="button" className="App-button" onClick={this.adminLogin} value ="Admin Login" />
      <PopupboxContainer />
      {this.state.items.map(item => {
        const path = "./pictures/"+item.itemImage
        return <div>
        <img src={path} />
        {item["name"]} &nbsp; {item["price"]}
        </div>
      })}
      </header>
      </div>
    );
  }
}

export default withRouter(App);

/*

handleNameInput = e => {
  this.setState ({
    name: e.target.value,
  })
}
handleDescriptionInput = e => {
  this.setState ({
    description: e.target.value,
  })
}
handlePriceInput = e => {
  this.setState ({
    price: e.target.value,
  })
}
addItem = e => {
  e.preventDefault()
  fetch('http://localhost:5000/items', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     name: this.state.name,
     description: this.state.description,
     price: this.state.price,
    })
  })
}

<input type="text" placeholder="Item name" onChange={this.handleNameInput} />
<input type="text" placeholder="Item description" onChange={this.handleDescriptionInput} />
<input type="number" placeholder="Item Price" onChange={this.handlePriceInput} />
<input type="button" value ="Add item" onClick={this.addItem} />
*/
