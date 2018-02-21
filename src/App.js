import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: 'blue',
  width: "60%"
}
class Aggregate extends Component {
  render(){
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
        <h2>Number Text</h2>
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
    return (
      <div style={defaultStyle} className="App">
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
