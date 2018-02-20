import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = 'blue'
let defaultStyle = {
  color: defaultTextColor,
  width: "20%"
}
class Aggregate extends Component {
  render(){
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
        <h2 style={{color: defaultTextColor}}>Number Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
    <div>
      <img/>
      <input type="text"/>
    </div>
    )
  };
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}
class App extends Component {
  render() {
    let name = 'Mark Tiahrt and Tiffany Tiahrt'
    let styleHeader = {color: defaultTextColor, 'font-size': '15px'}
    return (
      <div style={styleHeader} className="App">
        <h1>Title</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
