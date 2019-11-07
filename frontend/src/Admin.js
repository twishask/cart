import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './App.css';

class Admin extends Component {
  constructor() {
    super()
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

  render() {
    return (
        <div className="App">
        <header className="App-header">
        <input type="text" placeholder="Item name" onChange={this.handleNameInput} />
        <input type="text" placeholder="Item description" onChange={this.handleDescriptionInput} />
        <input type="number" placeholder="Item Price" onChange={this.handlePriceInput} />
        <input type="button" value ="Add item" onClick={this.addItem} />
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

export default Admin;

/*
<input type="button" className="App-button" onClick={this.openPopupbox} value ="Login/Register" />
<PopupboxContainer />

*/
